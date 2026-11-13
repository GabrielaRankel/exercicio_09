const { DataTypes } = require('sequelize')
const bd = require('../db/conn')

const Material = bd.define('material', {
    codMaterial: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idObra: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            models: 'obras',
            key: 'codObra'
        }
    },
    descricao: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    quantEstoque: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    codLote: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'materiais'
})

module.exports = Material