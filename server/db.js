const Pool = require('pg').Pool

const pool = new Pool({
    user: "postgres",
    password: "postgrespass",
    host: "localhost",
    port: 5432,
    database: "perndb"
})

module.exports = pool