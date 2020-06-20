const mysql = require('mysql2');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('hellojs', 'root', 'cometrue', {
   dialect: 'mysql', host: 'localhost',
   pool: {
   max: 10, // 커넥션 최대 개수
   min: 0, // 풀에 유지하는 커넥션 최소 개수
   acquire: 60000, // 커넥션 풀에서 커넥션 얻기 최대 대기 시간(기본 60초)
   idle: 10000, // 커넥션이 해제되기 전 idle 상태 대기 시간(msec, 기본 10초)
   evict: 1000, // 커넥션 풀에서 사용하지 않는 커넥션 해제 검사 간격(interval)
   validate: {} // 커넥션 검사 함수
   }
});

sequelize.sync().then( () =>{
   console.log("DB연결 성공");
});

module.exports = sequelize;

/*
const dbConfig = {
   host: 'localhost',
   user: 'root',
   password: 'cometrue',
   port: 3306,
   database: 'hellojs',
   multipleStatements: true,
};

const pool = mysql.createPool(dbConfig).promise();
*/

