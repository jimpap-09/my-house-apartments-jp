require('./env')

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: process.env.DB_DIALECT || 'postgres',
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
  },
  test: {
    use_env_variable: 'DATABASE_URL',
    dialect: process.env.DB_DIALECT || 'postgres',
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: process.env.DB_DIALECT || 'postgres',
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
  }
};
