const Sequelize = require('sequelize');
const mysqlUrl = require('./config').dbsMysql
const sequelize = new Sequelize(mysqlUrl, {
    // 日志记录参数
    logging: console.log
})

module.exports = sequelize

// 闭包形式
// (async ()=>{
//     await sequelize.sync({force: true});
// })()

