const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  password: 'w123',
  host: "localhost",
  port: 5432,
  database: 'users1'
})

module.exports = pool