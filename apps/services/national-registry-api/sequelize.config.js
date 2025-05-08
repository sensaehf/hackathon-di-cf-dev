/* eslint-env node */
module.exports = {
  development: {
    username: 'dev_db',
    password: 'dev_db',
    database: 'national_reg',
    host: 'host.docker.internal',
    dialect: 'postgres',
  },
  test: {
    username: 'test_db',
    password: 'test_db',
    database: 'national_reg',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
}
