const { DataTypes } = require('sequelize')
const bd = require('../db/conn')

const Obra = bd.define('obra', {
    codObra: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    cnpj: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'obras'
})

module.exports = Obra