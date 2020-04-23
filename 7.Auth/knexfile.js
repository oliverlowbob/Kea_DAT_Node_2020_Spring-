// Update with your config settings.
const credentials = require('./config/mysqlCredentials.js')

console.log(credentials)

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: 'my_db',
      user: "username",
      password: "password"
    }
  }

};
