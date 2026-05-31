const fs = require('fs')
const path = require('path')

const apiSchema = require('./api-schema.json')

const SCRIPT_DIR = __dirname
const BACKEND_DIR = path.resolve(SCRIPT_DIR, '../..')

const routesDir = path.join(BACKEND_DIR, 'routes')
const controllersDir = path.join(BACKEND_DIR, 'controllers')

fs.mkdirSync(routesDir, { recursive: true })
fs.mkdirSync(controllersDir, { recursive: true })

const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1)

const buildWhere = (where = {}) => {
  const entries = Object.entries(where)

  if (entries.length === 0) return 'undefined'

  const fields = entries
    .map(([key, value]) => {
      const [, sourceKey] = value.split('.')
      return `      ${key}: req.params.${sourceKey},`
    })
    .join('\n')

  return `{\n${fields}\n    }`
}

const buildInclude = (include = []) => {
  if (!include.length) return 'undefined'
  return `[${include.map((model) => model).join(', ')}]`
}

const buildControllerFunction = (route, defaultModel) => {
  const model = route.model || defaultModel
  const where = buildWhere(route.where)
  const include = buildInclude(route.include)

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

  if (route.action === 'create') {
    return `const ${route.name} = async (req, res) => {
  try {
    const data = await ${model}.create(req.body)
    res.status(201).json(data)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}`
  }

  if (route.action === 'update') {
    return `const ${route.name} = async (req, res) => {
  try {
    const data = await ${model}.findByPk(req.params.id)

    if (!data) {
      return res.status(404).json({ error: '${model} not found' })
    }

    await data.update(req.body)
    res.json(data)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}`
  }

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

const allModels = new Set()

apiSchema.resources.forEach((resource) => {
  allModels.add(resource.model)
  resource.routes.forEach((route) => {
    if (route.model) allModels.add(route.model)
    ;(route.include || []).forEach((model) => allModels.add(model))
  })
})

for (const resource of apiSchema.resources) {
  const routeModels = new Set([resource.model])

  resource.routes.forEach((route) => {
    if (route.model) routeModels.add(route.model)
    ;(route.include || []).forEach((model) => routeModels.add(model))
  })

  const imports = `const { ${Array.from(routeModels).join(', ')} } = require('../models')`

  const functions = resource.routes
    .map((route) => buildControllerFunction(route, resource.model))
    .join('\n\n')

  const exportsBlock = resource.routes
    .map((route) => `  ${route.name},`)
    .join('\n')

  fs.writeFileSync(
    path.join(controllersDir, `${resource.name}Controller.js`),
    `${imports}

${functions}

module.exports = {
${exportsBlock}
}
`
  )

  const Name = capitalize(resource.name)

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

console.log('✅ Backend API generated successfully.')