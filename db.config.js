/**************************************/
/*** Import des modules nécessaires ***/
const { Sequelize } = require('sequelize')

/**************************************/
/*** Import des modules nécessaires ***/
let sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS,{
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
        logging: false
    }
)

/***********************************/
/*** Synchronisation des modèles ***/
sequelize.sync(err =>{
   console.log('Database Sync Error', err) 
})

module.exports = sequelize