const fs = require('fs')
const path = require('path')

const apiSchema = require('./api-schema.json')
const dbSchema = require('@backend/scripts/db/db-schema.json')

const SCRIPT_DIR = __dirname
const ROOT_DIR = path.resolve(SCRIPT_DIR, '../../..')

const apiDir = path.join(ROOT_DIR, 'frontend/src/api')
const configDir = path.join(apiDir, 'config')
const routesDir = path.join(apiDir, 'routes')
const servicesDir = path.join(apiDir, 'services')
const typesDir = path.join(apiDir, 'types')

fs.mkdirSync(configDir, { recursive: true })
fs.mkdirSync(routesDir, { recursive: true })
fs.mkdirSync(servicesDir, { recursive: true })
fs.mkdirSync(typesDir, { recursive: true })

const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1)

const tsTypeMap = {
  string: 'string',
  text: 'string',
  integer: 'number',
  float: 'number',
  boolean: 'boolean',
  date: 'string',
}

const modelMap = new Map(dbSchema.models.map((model) => [model.name, model]))

const writeAxiosConfig = () => {
  fs.writeFileSync(
    path.join(configDir, 'axios.ts'),
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
}

const buildInterface = (model) => {
  const fields = Object.entries(model.attributes)
    .map(([name, attr]) => {
      const optional = attr.allowNull === true ? '?' : ''
      const type = tsTypeMap[attr.type] || 'unknown'
      return `  ${name}${optional}: ${type}`
    })
    .join('\n')

  return `export interface ${model.name} {
${fields}
  createdAt: string
  updatedAt: string
}

export type Create${model.name}Input = Omit<${model.name}, 'id' | 'createdAt' | 'updatedAt'>

export type Update${model.name}Input = Partial<Create${model.name}Input>
`
}

const writeTypes = () => {
  for (const model of dbSchema.models) {
    fs.writeFileSync(
      path.join(typesDir, `${model.name}.ts`),
      buildInterface(model)
    )
  }

  fs.writeFileSync(
    path.join(typesDir, 'common.ts'),
    `export interface DeleteResult {
  deleted: boolean
}
`
  )
}

const routeConstName = (resource) => `${resource.plural.toUpperCase()}_ROUTES`

const buildRoutePath = (resource, route) => {
  const fullPath = `/api${resource.basePath}${route.path === '/' ? '' : route.path}`

  if (!route.params || route.params.length === 0) {
    return `'${fullPath}'`
  }

  const args = route.params.map((param) => `${param}: number | string`).join(', ')
  const template = fullPath.replace(/:([a-zA-Z0-9_]+)/g, '${$1}')

  return `(${args}) => \`${template}\``
}

const writeRoutes = () => {
  for (const resource of apiSchema.resources) {
    const lines = resource.routes
      .map((route) => {
        const key = route.name
          .replace(/([a-z])([A-Z])/g, '$1_$2')
          .toUpperCase()

        return `  ${key}: ${buildRoutePath(resource, route)},`
      })
      .join('\n')

    fs.writeFileSync(
      path.join(routesDir, `${resource.name}Routes.ts`),
      `export const ${routeConstName(resource)} = {
${lines}
}
`
    )
  }
}

const getTypeImports = (resource) => {
  const models = new Set()

  resource.routes.forEach((route) => {
    const response = route.response || resource.model

    response
      .replace('[]', '')
      .split('|')
      .map((type) => type.trim())
      .forEach((type) => {
        if (modelMap.has(type)) models.add(type)
      })

    if (route.body && route.action === 'create') models.add(`Create${resource.model}Input`)
    if (route.body && route.action === 'update') models.add(`Update${resource.model}Input`)
  })

  const imports = []

  const modelTypes = Array.from(models).filter((type) => !type.endsWith('Input'))
  if (modelTypes.length) {
    imports.push(`import type { ${modelTypes.join(', ')}${models.has(`Create${resource.model}Input`) ? `, Create${resource.model}Input` : ''}${models.has(`Update${resource.model}Input`) ? `, Update${resource.model}Input` : ''} } from '../types/${resource.model}'`)
  }

  if (resource.routes.some((route) => route.response === 'DeleteResult')) {
    imports.push(`import type { DeleteResult } from '../types/common'`)
  }

  return imports.join('\n')
}

const responseType = (route, fallbackModel) => route.response || fallbackModel

const callRoute = (resource, route) => {
  const routeKey = route.name
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .toUpperCase()

  if (route.params && route.params.length) {
    return `${routeConstName(resource)}.${routeKey}(${route.params.join(', ')})`
  }

  return `${routeConstName(resource)}.${routeKey}`
}

const buildServiceFunction = (resource, route) => {
  const type = responseType(route, resource.model)
  const params = []

  ;(route.params || []).forEach((param) => {
    params.push(`${param}: number | string`)
  })

  if (route.body && route.action === 'create') {
    params.push(`body: Create${resource.model}Input`)
  }

  if (route.body && route.action === 'update') {
    params.push(`body: Update${resource.model}Input`)
  }

  const args = params.join(', ')
  const url = callRoute(resource, route)

  if (route.method === 'get' || route.method === 'delete') {
    return `export const ${route.name} = async (${args}): Promise<${type}> => {
  const response = await api.${route.method}<${type}>(${url})
  return response.data
}`
  }

  return `export const ${route.name} = async (${args}): Promise<${type}> => {
  const response = await api.${route.method}<${type}>(${url}, body)
  return response.data
}`
}

const writeServices = () => {
  for (const resource of apiSchema.resources) {
    const imports = [
      `import api from '../config/axios'`,
      `import { ${routeConstName(resource)} } from '../routes/${resource.name}Routes'`,
      getTypeImports(resource),
    ]
      .filter(Boolean)
      .join('\n')

    const functions = resource.routes
      .map((route) => buildServiceFunction(resource, route))
      .join('\n\n')

    fs.writeFileSync(
      path.join(servicesDir, `${resource.name}Service.ts`),
      `${imports}

${functions}
`
    )
  }
}

writeAxiosConfig()
writeTypes()
writeRoutes()
writeServices()

console.log('✅ Frontend API generated successfully.')