const {Sequelize} = require('sequelize')

const bd = new Sequelize('db_buildcorp', 'root', 'senai',{
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
})

module.exports = bd