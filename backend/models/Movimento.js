const { DataTypes } = require('sequelize')
const bd = require('../db/conn')

const Movimento = bd.define('movimento', {
    codMovimento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idMaterial: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            models: 'materiais',
            key: 'codMaterial'
        }
    },
    tipo: {
        type: DataTypes.ENUM("ENTRADA","SAIDA"),
        allowNull: false
    },
    qunatMovimento: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'movimentos'
})

module.exports = Movimento