/**************************************/
/*** Import des modules nécessaires ***/
const { DataTypes } = require('sequelize')
const DB = require('../db.config')

/****************************************/
/*** Définition du modèle Inscription ***/
const  Inscription = DB.define('Inscription', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    company:{
        type: DataTypes.STRING(50),
        defaultValue: '',
        allowNull: false
    },
    activity:{
        type: DataTypes.STRING(50),
        defaultValue: '',
        allowNull: false
    },    
    civility:{
        type: DataTypes.STRING(3),
        defaultValue: '',
        allowNull: false
    },
    name:{
        type: DataTypes.STRING(50),
        defaultValue: '',
        allowNull: false
    },
    first_name:{
        type: DataTypes.STRING(50),
        defaultValue: '',
        allowNull: false
    },
    job:{
        type: DataTypes.STRING(50),
        defaultValue: '',
        allowNull: false
    },
    address:{
        type: DataTypes.STRING(255),
        defaultValue: '',
        allowNull: false
    },
    postal_code:{
        type: DataTypes.STRING(10),
        defaultValue: '',
        allowNull: false
    },
    city:{
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false
    },
    phone_number:{
        type: DataTypes.STRING(15),
        defaultValue: '',
        allowNull: false
    },
    fax:{
        type: DataTypes.STRING(15),
        defaultValue: '',
        allowNull: true
    },
    email:{
        type: DataTypes.STRING(255),
        validate:{
            isEmail: true
        },
        allowNull: false
    },
    session_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    invited_by:{
        type: DataTypes.ENUM('Citel','Météorage','Indelec'),
        allowNull: false
    },
    one_to_one:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    one_to_one_company:{
        type: DataTypes.ARRAY(DataTypes.ENUM('Citel','Météorage','Indelec')),
        defaultValue: [],
        allowNull: true
    },
    validate:{
        type: DataTypes.INTEGER,
        defaultValue: '0',
        allowNull: false
    },
    present:{
        type: DataTypes.INTEGER,
        defaultValue: '0',
        allowNull: false
    },
    // inscription_date:{
    //     type: DataTypes.DATE,
    //     allowNull: false
    // },
    comment:{
        type: DataTypes.STRING(255),
        defaultValue: '',
        allowNull: false
    },
    agreement:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    }

})

/****************************************/
/*** Synchronisation du modèle */
// Inscription.sync()
// Inscription.sync({force: true})
// Inscription.sync({alter: true})

module.exports = Inscription