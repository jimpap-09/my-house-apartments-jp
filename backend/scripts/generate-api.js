const fs = require('fs')
const path = require('path')

const config = require('./routes-config.json')

const root = path.resolve(__dirname, '../..')

const backendRoutesDir = path.join(root, 'backend/routes')
const backendControllersDir = path.join(root, 'backend/controllers')
const backendScriptsDir = path.join(root, 'backend/scripts')
const backendMigrationsDir = path.join(root, 'backend/migrations')

const frontendApiDir = path.join(root, 'frontend/src/api')
const frontendConfigDir = path.join(frontendApiDir, 'config')
const frontendRoutesDir = path.join(frontendApiDir, 'routes')
const frontendServicesDir = path.join(frontendApiDir, 'services')
const frontendTypesDir = path.join(frontendApiDir, 'types')

fs.mkdirSync(backendRoutesDir, { recursive: true })
fs.mkdirSync(backendControllersDir, { recursive: true })
fs.mkdirSync(backendScriptsDir, { recursive: true })

fs.mkdirSync(frontendConfigDir, { recursive: true })
fs.mkdirSync(frontendRoutesDir, { recursive: true })
fs.mkdirSync(frontendServicesDir, { recursive: true })
fs.mkdirSync(frontendTypesDir, { recursive: true })

const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1)

const pluralizeModel = (modelName) => `${modelName}s`

const sequelizeToTs = (sequelizeType) => {
  const type = sequelizeType.toUpperCase()

  if (
    type.includes('STRING') ||
    type.includes('TEXT') ||
    type.includes('UUID') ||
    type.includes('DATEONLY')
  ) {
    return 'string'
  }

  if (
    type.includes('INTEGER') ||
    type.includes('BIGINT') ||
    type.includes('FLOAT') ||
    type.includes('DOUBLE') ||
    type.includes('DECIMAL')
  ) {
    return 'number'
  }

  if (type.includes('BOOLEAN')) return 'boolean'
  if (type.includes('DATE')) return 'string'

  return 'unknown'
}

const getCreateTableMigrationContent = (tableName) => {
  const files = fs
    .readdirSync(backendMigrationsDir)
    .filter((file) => file.endsWith('.js'))

  const file = files.find((migrationFile) => {
    const content = fs.readFileSync(
      path.join(backendMigrationsDir, migrationFile),
      'utf8'
    )

    return (
      content.includes(`createTable('${tableName}'`) ||
      content.includes(`createTable("${tableName}"`)
    )
  })

  if (!file) return null

  return fs.readFileSync(path.join(backendMigrationsDir, file), 'utf8')
}

const extractColumnBlock = (content, columnName) => {
  const startToken = `${columnName}: {`
  const start = content.indexOf(startToken)

  if (start === -1) return null

  let index = start + startToken.length
  let depth = 1

  while (index < content.length) {
    const char = content[index]

    if (char === '{') depth += 1
    if (char === '}') depth -= 1

    if (depth === 0) {
      return content.slice(start, index + 1)
    }

    index += 1
  }

  return null
}

const parseMigrationColumns = (content) => {
  const columnRegex = /^\s{6,}([a-zA-Z0-9_]+):\s*\{/gm
  const columns = []
  let match

  while ((match = columnRegex.exec(content)) !== null) {
    const columnName = match[1]
    const block = extractColumnBlock(content, columnName)

    if (!block) continue

    const typeMatch = block.match(/type:\s*Sequelize\.([A-Z0-9_]+)/)
    const allowNullFalse = block.includes('allowNull: false')
    const allowNullTrue = block.includes('allowNull: true')

    const isRequired =
      allowNullFalse ||
      columnName === 'id' ||
      columnName === 'createdAt' ||
      columnName === 'updatedAt'

    columns.push({
      name: columnName,
      tsType: sequelizeToTs(typeMatch?.[1] || 'unknown'),
      optional: allowNullTrue ? true : !isRequired,
    })
  }

  return columns
}

const migrationToInterface = (entity, interfaceName) => {
  const tableName = pluralizeModel(entity.model)
  const content = getCreateTableMigrationContent(tableName)

  if (!content) {
    return `export interface ${interfaceName} {
  id: number
  createdAt: string
  updatedAt: string
}
`
  }

  const columns = parseMigrationColumns(content)

  const fields = columns
    .map((column) => {
      const optional = column.optional ? '?' : ''
      return `  ${column.name}${optional}: ${column.tsType}`
    })
    .join('\n')

  return `export interface ${interfaceName} {
${fields}
}
`
}

fs.writeFileSync(
  path.join(frontendConfigDir, 'axios.ts'),
  `import axios from 'axios'

const api = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
`
)

let backendIndex = `const express = require('express')
const router = express.Router()

`

for (const entity of config.entities) {
  backendIndex += `const ${entity.name}Routes = require('./${entity.name}Routes.js')\n`
}

backendIndex += `
router.get('/', (req, res) => {
  res.json({
    message: 'API is running',
  })
})

`

for (const entity of config.entities) {
  backendIndex += `router.use('/${entity.plural}', ${entity.name}Routes)\n`
}

backendIndex += `
module.exports = router
`

fs.writeFileSync(path.join(backendRoutesDir, 'index.js'), backendIndex)

for (const entity of config.entities) {
  const Name = capitalize(entity.name)
  const PLURAL = entity.plural.toUpperCase()

  fs.writeFileSync(
    path.join(backendControllersDir, `${entity.name}Controller.js`),
    `const { ${entity.model} } = require('../models')

const getAll${Name}s = async (req, res) => {
  try {
    const data = await ${entity.model}.findAll()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const get${Name}ById = async (req, res) => {
  try {
    const data = await ${entity.model}.findByPk(req.params.id)

    if (!data) {
      return res.status(404).json({ error: '${Name} not found' })
    }

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  getAll${Name}s,
  get${Name}ById,
}
`
  )

  fs.writeFileSync(
    path.join(backendRoutesDir, `${entity.name}Routes.js`),
    `const express = require('express')
const router = express.Router()
const ${entity.name}Controller = require('../controllers/${entity.name}Controller.js')

router.get('/getAll${Name}s', ${entity.name}Controller.getAll${Name}s)
router.get('/get${Name}ById/:id', ${entity.name}Controller.get${Name}ById)

module.exports = router
`
  )

  fs.writeFileSync(
    path.join(frontendRoutesDir, `${entity.name}Routes.ts`),
    `export const ${PLURAL}_ROUTES = {
  GET_ALL: '/api/${entity.plural}/getAll${Name}s',
  GET_BY_ID: (id: number | string) => \`/api/${entity.plural}/get${Name}ById/\${id}\`,
}
`
  )

  fs.writeFileSync(
    path.join(frontendTypesDir, `${entity.name}.ts`),
    migrationToInterface(entity, Name)
  )

  fs.writeFileSync(
    path.join(frontendServicesDir, `${entity.name}Service.ts`),
    `import api from '../config/axios'
import { ${PLURAL}_ROUTES } from '../routes/${entity.name}Routes'
import type { ${Name} } from '../types/${entity.name}'

export const getAll${Name}s = async (): Promise<${Name}[]> => {
  const response = await api.get<${Name}[]>(${PLURAL}_ROUTES.GET_ALL)
  return response.data
}

export const get${Name}ById = async (
  id: number | string
): Promise<${Name}> => {
  const response = await api.get<${Name}>(
    ${PLURAL}_ROUTES.GET_BY_ID(id)
  )

  return response.data
}
`
  )
}

const apiTestCases = config.entities
  .map((entity) => {
    const Name = capitalize(entity.name)

    return `      case '${entity.plural}': {
        const response = await axios.get(
          \`\${BASE_URL}/api/${entity.plural}/getAll${Name}s\`
        )

        console.log(JSON.stringify(response.data, null, 2))
        break
      }

      case '${entity.name}': {
        if (!id) {
          console.error('Missing id')
          process.exit(1)
        }

        const response = await axios.get(
          \`\${BASE_URL}/api/${entity.plural}/get${Name}ById/\${id}\`
        )

        console.log(JSON.stringify(response.data, null, 2))
        break
      }`
  })
  .join('\n\n')

const apiTestUsage = config.entities
  .map(
    (entity) => `        console.log('  npm run test:api ${entity.plural}')
        console.log('  npm run test:api ${entity.name} 1')`
  )
  .join('\n')

const apiTestScript = `require('../config/env')

const axios = require('axios')

const BASE_URL =
  process.env.BASE_URL ||
  \`http://localhost:\${process.env.PORT || 5000}\`

const command = process.argv[2]
const id = process.argv[3]

const run = async () => {
  try {
    switch (command) {
      case 'api': {
        const response = await axios.get(\`\${BASE_URL}/api\`)

        console.log(JSON.stringify(response.data, null, 2))
        break
      }

${apiTestCases}

      default:
        console.log('Usage:')
        console.log('  npm run test:api api')
${apiTestUsage}
        break
    }
  } catch (err) {
    if (err.response) {
      console.error(
        JSON.stringify(err.response.data, null, 2)
      )

      process.exit(err.response.status || 1)
    }

    console.error(err.message)
    process.exit(1)
  }
}

run()
`

fs.writeFileSync(
  path.join(backendScriptsDir, 'api-test.js'),
  apiTestScript
)

console.log('✅ API files generated successfully.')