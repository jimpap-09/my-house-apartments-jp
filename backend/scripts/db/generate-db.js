const fs = require('fs')
const path = require('path')

const SCRIPT_DIR = __dirname
const BACKEND_DIR = path.resolve(SCRIPT_DIR, '../..')

const schema = require('./db-schema.json')

const modelsDir = path.join(BACKEND_DIR, 'models')
const migrationsDir = path.join(BACKEND_DIR, 'migrations')
const configDir = path.join(BACKEND_DIR, 'config')

const typeMap = {
  string: 'Sequelize.STRING',
  text: 'Sequelize.TEXT',
  integer: 'Sequelize.INTEGER',
  float: 'Sequelize.FLOAT',
  boolean: 'Sequelize.BOOLEAN',
  date: 'Sequelize.DATE',
}

const dataTypeMap = {
  string: 'DataTypes.STRING',
  text: 'DataTypes.TEXT',
  integer: 'DataTypes.INTEGER',
  float: 'DataTypes.FLOAT',
  boolean: 'DataTypes.BOOLEAN',
  date: 'DataTypes.DATE',
}

const tableName = (modelName) => `${modelName}s`

const fileName = (name) =>
  name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

const modelFileName = (name) => name.toLowerCase()

const timestamp = (offset = 0) => {
  const date = new Date()
  date.setSeconds(date.getSeconds() + offset)
  return date.toISOString().replace(/[-:TZ.]/g, '').slice(0, 14)
}

const jsValue = (value) => {
  if (typeof value === 'string') return `'${value.replace(/'/g, "\\'")}'`
  if (value === null) return 'null'
  return String(value)
}

const ensureDirs = () => {
  fs.mkdirSync(modelsDir, { recursive: true })
  fs.mkdirSync(migrationsDir, { recursive: true })
  fs.mkdirSync(configDir, { recursive: true })
}

const writeConfig = () => {
  const content = `require('./env')

const useSSL =
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === 'production'

const sslOptions = {
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
}

const baseConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  dialect: process.env.DB_DIALECT || 'postgres',
}

module.exports = {
  local: {
    ...baseConfig,
    dialectOptions: {
      ssl: false,
    },
  },

  development: {
    ...baseConfig,
    use_env_variable: 'DATABASE_URL',
    dialectOptions: sslOptions,
  },

  test: {
    ...baseConfig,
    dialectOptions: {
      ssl: false,
    },
  },

  production: {
    ...baseConfig,
    use_env_variable: 'DATABASE_URL',
    dialectOptions: sslOptions,
  },
}
`

  fs.writeFileSync(path.join(configDir, 'config.js'), content)
}

const writeSequelizerc = () => {
  const content = `const path = require('path')

module.exports = {
  config: path.resolve('config', 'config.js'),
  'models-path': path.resolve('models'),
  'seeders-path': path.resolve('seeders'),
  'migrations-path': path.resolve('migrations'),
}
`

  fs.writeFileSync(path.join(BACKEND_DIR, '.sequelizerc'), content)
}

const writeModelsIndex = () => {
  const content = `'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const process = require('process')

require('../config/env')

const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(path.join(__dirname, '..', 'config', 'config.js'))[env]
const db = {}

let sequelize

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  )
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    )
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    )
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
`

  fs.writeFileSync(path.join(modelsDir, 'index.js'), content)
}

const buildColumn = (name, attr) => {
  const lines = [`      ${name}: {`]

  lines.push(`        type: ${typeMap[attr.type]},`)

  if (attr.primaryKey) lines.push('        primaryKey: true,')
  if (attr.autoIncrement) lines.push('        autoIncrement: true,')
  if (attr.allowNull !== undefined) {
    lines.push(`        allowNull: ${attr.allowNull},`)
  }
  if (attr.defaultValue !== undefined) {
    lines.push(`        defaultValue: ${jsValue(attr.defaultValue)},`)
  }
  if (attr.unique) lines.push('        unique: true,')

  lines.push('      },')

  return lines.join('\n')
}

const writeModel = (model) => {
  const fields = Object.entries(model.attributes)
    .filter(([name]) => name !== 'id')
    .map(([name, attr]) => `    ${name}: ${dataTypeMap[attr.type]}`)
    .join(',\n')

  const associations = schema.relations
    .filter((rel) => rel.source === model.name)
    .map(
      (rel) =>
        `      ${model.name}.${rel.type}(models.${rel.target}, { foreignKey: '${rel.foreignKey}' })`
    )
    .join('\n')

  const content = `'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class ${model.name} extends Model {
    static associate(models) {
${associations || '      // associations can be defined here'}
    }
  }

  ${model.name}.init({
${fields}
  }, {
    sequelize,
    modelName: '${model.name}',
  })

  return ${model.name}
}
`

  fs.writeFileSync(path.join(modelsDir, `${modelFileName(model.name)}.js`), content)
}

const buildUniqueConstraints = (model) => {
  const table = tableName(model.name)

  return (model.uniqueConstraints || [])
    .map((fields) => {
      const constraintName = `unique_${fileName(table)}_${fields.join('_')}`

      return `    await queryInterface.addConstraint('${table}', {
      fields: ${JSON.stringify(fields)},
      type: 'unique',
      name: '${constraintName}'
    })`
    })
    .join('\n\n')
}

const buildIndexes = (model) => {
  const table = tableName(model.name)

  return (model.indexes || [])
    .map((fields) => {
      const normalizedFields = Array.isArray(fields) ? fields : [fields]
      const indexName = `idx_${fileName(table)}_${normalizedFields.join('_')}`

      return `    await queryInterface.addIndex('${table}', ${JSON.stringify(
        normalizedFields
      )}, {
      name: '${indexName}'
    })`
    })
    .join('\n\n')
}

const writeCreateMigration = (model, index) => {
  const table = tableName(model.name)

  const columns = Object.entries(model.attributes)
    .map(([name, attr]) => buildColumn(name, attr))
    .join('\n')

  const extraUp = [buildUniqueConstraints(model), buildIndexes(model)]
    .filter(Boolean)
    .join('\n\n')

  const content = `'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('${table}', {
${columns}
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })

${extraUp || ''}
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('${table}')
  }
}
`

  const migrationName = `${timestamp(index)}-create-${fileName(table)}.js`
  fs.writeFileSync(path.join(migrationsDir, migrationName), content)
}

const writeRelationsMigration = () => {
  const constraints = []
  const removals = []

  for (const model of schema.models) {
    const table = tableName(model.name)

    for (const [fieldName, attr] of Object.entries(model.attributes)) {
      if (!attr.references) continue

      const targetTable = tableName(attr.references.model)
      const constraintName = `fkey_${fileName(table)}_${fieldName}`

      constraints.push(`    await queryInterface.addConstraint('${table}', {
      fields: ['${fieldName}'],
      type: 'foreign key',
      name: '${constraintName}',
      references: {
        table: '${targetTable}',
        field: '${attr.references.key}'
      },
      onUpdate: '${attr.onUpdate || 'CASCADE'}',
      onDelete: '${attr.onDelete || 'CASCADE'}'
    })`)

      removals.push(
        `    await queryInterface.removeConstraint('${table}', '${constraintName}')`
      )
    }
  }

  const content = `'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
${constraints.join('\n\n')}
  },

  async down(queryInterface, Sequelize) {
${removals.join('\n')}
  }
}
`

  fs.writeFileSync(
    path.join(migrationsDir, `${timestamp(99)}-add-database-relations.js`),
    content
  )
}

const main = () => {
  ensureDirs()
  writeConfig()
  writeSequelizerc()
  writeModelsIndex()

  schema.models.forEach((model, index) => {
    writeModel(model)
    writeCreateMigration(model, index)
  })

  writeRelationsMigration()

  console.log('✅ Database files generated from db-schema.json')
}

main()