/**************************************/
/*** Import des modules nécessaires ***/
const { DataTypes } = require('sequelize')
const DB = require('../db.config')

/*********************************/
/*** Définition du modèle User ***/
const  User = DB.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email:{
        type: DataTypes.STRING(255),
        validate:{
            isEmail: true
        },
        allowNull: false
    },
    service:{
        type: DataTypes.STRING(15),
        defaultValue: '',
        allowNull: false
    },    
    roles:{
        type: DataTypes.STRING(50),
        defaultValue: '',
        allowNull: false
    }
})


module.exports = User