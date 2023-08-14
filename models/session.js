/**************************************/
/*** Import des modules nécessaires ***/
const { DataTypes } = require('sequelize')
const DB = require('../db.config')

/************************************/
/*** Définition du modèle Session ***/
const  Session = DB.define('Session', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date:{
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false
    },
    city:{
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false
    },    
    precision:{
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false
    },
    timetable:{
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false
    },
    reminde:{
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false
    },
    pdf_link:{
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: true
    }
})

/****************************************/
/*** Synchronisation du modèle */
// Session.sync()
// Session.sync({force: true})
// Session.sync({alter: true})

module.exports = Session