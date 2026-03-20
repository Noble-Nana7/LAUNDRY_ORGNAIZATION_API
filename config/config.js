require('dotenv').config()
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const host = process.env.DB_HOST;
const dialect = process.env.DB_DIALECT;


module.exports = {
  development: {
    "username": username,
    "password": password,
    "database": database,
    "host": host,
    "dialect": dialect
  },
  test: {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  production: {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
