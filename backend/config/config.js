require('./env')

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
