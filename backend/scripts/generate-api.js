const fs = require('fs')
const path = require('path')

const config = require('./routes-config.json')

const root = path.resolve(__dirname, '../..')

const backendRoutesDir = path.join(root, 'backend/routes')
const backendControllersDir = path.join(root, 'backend/controllers')

const frontendApiDir = path.join(root, 'frontend/src/api')
const frontendRoutesDir = path.join(frontendApiDir, 'routes')
const frontendServicesDir = path.join(frontendApiDir, 'services')
const frontendConfigDir = path.join(frontendApiDir, 'config')

fs.mkdirSync(backendRoutesDir, { recursive: true })
fs.mkdirSync(backendControllersDir, { recursive: true })
fs.mkdirSync(frontendRoutesDir, { recursive: true })
fs.mkdirSync(frontendServicesDir, { recursive: true })
fs.mkdirSync(frontendConfigDir, { recursive: true })

// axios config
fs.writeFileSync(
  path.join(frontendConfigDir, 'axios.js'),
  `import axios from 'axios'

    const api = axios.create({
        baseURL: 'http://localhost:3002',
        headers: {
        'Content-Type': 'application/json'
        }
    })

export default api
`
)

// backend routes/index.js
let backendIndex =
`
const express = require('express')
const router = express.Router()
`

for (const entity of config.entities) {
  const routeVar = `${entity.name}Routes`
  backendIndex += `const ${routeVar} = require('./${entity.name}Routes.js')\n`
}

backendIndex += '\n'

backendIndex += `
router.get('/', (req, res) => {
  res.json({
    message: 'API is running'
  })
})

`

for (const entity of config.entities) {
  backendIndex += `router.use('/${entity.plural}', ${entity.name}Routes)\n`
}

backendIndex += `module.exports = router`

fs.writeFileSync(path.join(backendRoutesDir, 'index.js'), backendIndex)

for (const entity of config.entities) {
  const Name = entity.name.charAt(0).toUpperCase() + entity.name.slice(1)
  const PLURAL = entity.plural.toUpperCase()
  const MODEL = entity.model

  // backend controller
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
  get${Name}ById
}
`
  )

  // backend routes
  fs.writeFileSync(
    path.join(backendRoutesDir, `${entity.name}Routes.js`),
    
   `const express = require('express')
    const router = express.Router()
    const ${entity.name}Controller = require('../controllers/${entity.name}Controller.js')

    router.get('/getAll${Name}s', ${entity.name}Controller.getAll${Name}s)
    router.get('/get${Name}ById/:id', ${entity.name}Controller.get${Name}ById)

    module.exports = router`
  )

  // frontend routes
  fs.writeFileSync(
    path.join(frontendRoutesDir, `${entity.name}Routes.js`),
    `export const ${PLURAL}_ROUTES = {
  GET_ALL: '/api/${entity.plural}/getAll${Name}s',
  GET_BY_ID: (id) => \`/api/${entity.plural}/get${Name}ById/\${id}\`
}
`
  )

  // frontend service
  fs.writeFileSync(
    path.join(frontendServicesDir, `${entity.name}Service.js`),
    `import api from '../config/axios'
import { ${PLURAL}_ROUTES } from '../routes/${entity.name}Routes'

export const getAll${Name}s = async () => {
  const response = await api.get(${PLURAL}_ROUTES.GET_ALL)
  return response.data
}

export const get${Name}ById = async (id) => {
  const response = await api.get(${PLURAL}_ROUTES.GET_BY_ID(id))
  return response.data
}
`
  )
}

console.log('✅ API files generated successfully.')