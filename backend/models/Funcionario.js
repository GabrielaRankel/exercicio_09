const { DataTypes } = require('sequelize')
const bd = require('../db/conn')

const Funcionario = bd.define('funcionario', {
    codFuncionario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'funcionarios'
})

module.exports = Funcionario