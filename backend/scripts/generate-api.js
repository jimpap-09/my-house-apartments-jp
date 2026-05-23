const fs = require('fs')
const path = require('path')

const config = require('./routes-config.json')

const root = path.resolve(__dirname, '../..')

const backendRoutesDir = path.join(root, 'backend/routes')
const backendControllersDir = path.join(root, 'backend/controllers')
const backendScriptsDir = path.join(root, 'backend/scripts')

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
  const MODEL = entity.model

  fs.writeFileSync(
    path.join(backendControllersDir, `${entity.name}Controller.js`),
    `const { ${MODEL} } = require('../models')

const getAll${Name}s = async (req, res) => {
  try {
    const data = await ${MODEL}.findAll()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const get${Name}ById = async (req, res) => {
  try {
    const data = await ${MODEL}.findByPk(req.params.id)

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
    `export interface ${Name} {
  id: number
  createdAt: string
  updatedAt: string
  [key: string]: unknown
}
`
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

export const get${Name}ById = async (id: number | string): Promise<${Name}> => {
  const response = await api.get<${Name}>(${PLURAL}_ROUTES.GET_BY_ID(id))
  return response.data
}
`
  )
}

const apiTestScript = `#!/bin/bash

BASE_URL="http://localhost:3002"

case "$1" in
  api)
    curl -s "$BASE_URL/api" | jq
    ;;

${config.entities
  .map((entity) => {
    const Name = capitalize(entity.name)

    return `  ${entity.plural})
    curl -s "$BASE_URL/api/${entity.plural}/getAll${Name}s" | jq
    ;;

  ${entity.name})
    curl -s "$BASE_URL/api/${entity.plural}/get${Name}ById/$2" | jq
    ;;`
  })
  .join('\n\n')}

  *)
    echo "Usage:"
    echo "  npm run test:api api"
${config.entities
  .map(
    (entity) => `    echo "  npm run test:api ${entity.plural}"
    echo "  npm run test:api ${entity.name} 1"`
  )
  .join('\n')}
    ;;
esac
`

fs.writeFileSync(path.join(backendScriptsDir, 'api-test.sh'), apiTestScript)

console.log('✅ API files generated successfully.')