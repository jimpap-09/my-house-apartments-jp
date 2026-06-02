const fs = require('fs')
const path = require('path')

// Έλεγχος αν υπάρχει το αρχείο api-schema.json
const schemaPath = path.resolve(__dirname, './api-schema.json')
if (!fs.existsSync(schemaPath)) {
  console.error('❌ Error: Το αρχείο api-schema.json δεν βρέθηκε στον ίδιο φάκελο με το script!')
  process.exit(1)
}

const apiSchema = require('./api-schema.json')

const SCRIPT_DIR = __dirname
const BACKEND_DIR = path.resolve(SCRIPT_DIR, '../..')

const routesDir = path.join(BACKEND_DIR, 'routes')
const controllersDir = path.join(BACKEND_DIR, 'controllers')

fs.mkdirSync(routesDir, { recursive: true })
fs.mkdirSync(controllersDir, { recursive: true })

const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1)

// Κατασκευή του WHERE block
const buildWhere = (where = {}) => {
  const entries = Object.entries(where)

  if (entries.length === 0) return 'undefined'

  const fields = entries
    .map(([key, value]) => {
      const [, sourceKey] = value.split('.')
      // Αν το key περιέχει τελεία (π.χ. Review.id), το βάζουμε σε εισαγωγικά για να είναι έγκυρο JS Object key
      const safeKey = key.includes('.') ? `'${key}'` : key
      return `      ${safeKey}: req.params.${sourceKey},`
    })
    .join('\n')

  return `{\n${fields}\n    }`
}

// Κατασκευή του INCLUDE (Relations) block
const buildInclude = (include = []) => {
  if (!include.length) return 'undefined'
  return `[${include.map((model) => model).join(', ')}]`
}

// Κατασκευή του BODY Φιλτραρίσματος για Security (στα Create/Update)
const buildBodySanitization = (bodyFields) => {
  if (!bodyFields || !bodyFields.length) return 'req.body'
  
  const fieldsMapped = bodyFields.map(field => `    ${field}: req.body.${field}`).join(',\n')
  return `{\n${fieldsMapped}\n  }`
}

// Κύρια συνάρτηση παραγωγής των Controllers
const buildControllerFunction = (route, defaultModel) => {
  const model = route.model || defaultModel
  const where = buildWhere(route.where)
  const include = buildInclude(route.include)
  const sanitizedBody = buildBodySanitization(route.body)

  // 1. Action: findAll
  if (route.action === 'findAll') {
    return `const ${route.name} = async (req, res) => {
  try {
    const data = await ${model}.findAll({
      ${where !== 'undefined' ? `where: ${where},` : ''}
      ${include !== 'undefined' ? `include: ${include},` : ''}
    })

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}`
  }

  // 2. Action: findByPk
  if (route.action === 'findByPk') {
    return `const ${route.name} = async (req, res) => {
  try {
    const data = await ${model}.findByPk(req.params.id)

    if (!data) {
      return res.status(404).json({ error: '${model} not found' })
    }

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}`
  }

  // 3. Action: findOne (Υποστήριξη dynamic queries)
  if (route.action === 'findOne') {
    return `const ${route.name} = async (req, res) => {
  try {
    const data = await ${model}.findOne({
      ${where !== 'undefined' ? `where: ${where},` : ''}
      ${include !== 'undefined' ? `include: ${include},` : ''}
    })

    if (!data) {
      return res.status(404).json({ error: '${model} not found' })
    }

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}`
  }

  // 4. Action: create
  if (route.action === 'create') {
    return `const ${route.name} = async (req, res) => {
  try {
    const payload = ${sanitizedBody};
    const data = await ${model}.create(payload)
    res.status(201).json(data)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}`
  }

  // 5. Action: update
  if (route.action === 'update') {
    return `const ${route.name} = async (req, res) => {
  try {
    const data = await ${model}.findByPk(req.params.id)

    if (!data) {
      return res.status(404).json({ error: '${model} not found' })
    }

    const payload = ${sanitizedBody};
    await data.update(payload)
    res.json(data)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}`
  }

  // 6. Action: delete
  if (route.action === 'delete') {
    return `const ${route.name} = async (req, res) => {
  try {
    const data = await ${model}.findByPk(req.params.id)

    if (!data) {
      return res.status(404).json({ error: '${model} not found' })
    }

    await data.destroy()
    res.json({ deleted: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}`
  }

  throw new Error(`Unsupported action: ${route.action}`)
}

// --- Παραγωγή Αρχείων (Controllers & Routes) ---

const allModels = new Set()

apiSchema.resources.forEach((resource) => {
  allModels.add(resource.model)
  resource.routes.forEach((route) => {
    if (route.model) allModels.add(route.model)
    if (route.include) route.include.forEach((model) => allModels.add(model))
  })
})

for (const resource of apiSchema.resources) {
  const routeModels = new Set([resource.model])

  resource.routes.forEach((route) => {
    if (route.model) routeModels.add(route.model)
    if (route.include) route.include.forEach((model) => routeModels.add(model))
  })

  const imports = `const { ${Array.from(routeModels).join(', ')} } = require('../models')`

  const functions = resource.routes
    .map((route) => buildControllerFunction(route, resource.model))
    .join('\n\n')

  const exportsBlock = resource.routes
    .map((route) => `  ${route.name},`)
    .join('\n')

  // Γράψιμο Controller
  fs.writeFileSync(
    path.join(controllersDir, `${resource.name}Controller.js`),
    `${imports}

${functions}

module.exports = {
${exportsBlock}
}
`
  )

  // Γράψιμο Routes
  const routeLines = resource.routes
    .map((route) => {
      return `router.${route.method}('${route.path}', ${resource.name}Controller.${route.name})`
    })
    .join('\n')

  fs.writeFileSync(
    path.join(routesDir, `${resource.name}Routes.js`),
    `const express = require('express')
const router = express.Router()
const ${resource.name}Controller = require('../controllers/${resource.name}Controller.js')

${routeLines}

module.exports = router
`
  )
}

// --- Δημιουργία Κεντρικού index.js στα Routes ---
let indexContent = `const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    message: 'API is running',
  })
})

`

apiSchema.resources.forEach((resource) => {
  indexContent += `const ${resource.name}Routes = require('./${resource.name}Routes.js')\n`
})

indexContent += '\n'

apiSchema.resources.forEach((resource) => {
  indexContent += `router.use('${resource.basePath}', ${resource.name}Routes)\n`
})

indexContent += `
module.exports = router
`

fs.writeFileSync(path.join(routesDir, 'index.js'), indexContent)

console.log('✅ Backend API generated successfully! Όλα τα αρχεία δημιουργήθηκαν με επιτυχία.')