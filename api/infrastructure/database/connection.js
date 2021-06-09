const mysql = require('mysql2');

const connection = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

// const connectionhbs = mysql.createConnection({
//   user: process.env.DBHBS_USER,
//   host: process.env.DBHBS_HOST,
//   database: process.env.DBHBS_NAME,
//   password: process.env.DBHBS_PASSWORD,
//   port: process.env.DBHBS_PORT
// })

module.exports = connection

