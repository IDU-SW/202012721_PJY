const mysql = require('mysql2');

const dbConfig = {
   host: 'localhost',
   user: 'root',
   password: 'cometrue',
   port: 3306,
   database: 'hellojs',
   multipleStatements: true,
};

const pool = mysql.createPool(dbConfig).promise();
module.exports = pool;