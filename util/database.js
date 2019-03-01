const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'foo',
    database: 'shortfilmfest',
    password: 'bar'
});

module.exports = pool.promise();