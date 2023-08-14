/**************************************/
/*** Import des modules nécessaires ***/
const express = require('express')

const Session = require('../models/session')

const checkTokenMiddleware = require('../jsonwebtoken/check')

/*****************************************/
/*** Récupération du routeur d'express ***/
let router = express.Router()

/***************************************/
/*** Routage de la ressource Session ***/

router.get('', (req, res) => {
    Session.findAll()
        .then(  session => res.json({ data: session}))
        .catch( err => res.status(500).json({message: "Database Error", error: err}))// ne pas laisser pour la version final 
})

router.get('/:id', checkTokenMiddleware, (req, res) => {
    let sessionId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if(!sessionId){
        return res.json(400).json({ message:'Missing Parameter'})
    }

    // Récupération de la session
    Session.findOne({ where: {id: sessionId}, raw : true})
        .then(session => {
            if((session === null)){
                return res.status(400).json({ message: 'This session does not exist !'})
            }

            // Session trouvé
            return res.json({data: session})
        })
        .catch(err =>res.status(500).json({ message: 'Database Error', error: err}))
})

router.put('' , checkTokenMiddleware, (req, res) =>{
    const {date, city, precision, timetable, reminde, pdf_link} = req.body

    //Validation des données recus
    if( !date || !city || !precision || !timetable || !reminde || !pdf_link ){
        return res.status(400).json({message: 'Missing Data'})
    }

    // Expression régulière pour vérifier le format "jj/mm/yy"
  const dateRegex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  const timeRangeRegex = /^(0[0-9]|1[0-9]|2[0-3])h[0-5][0-9] - (0[0-9]|1[0-9]|2[0-3])h[0-5][0-9]$/;

  if (!dateRegex.test(date)) {
    return res.status(400).json({ message: 'Invalid Date Format' });
  }

  if (!timeRangeRegex.test(timetable)) {
    return res.status(400).json({ message: 'Invalid Time Range Format' });
  }

    Session.findOne({where: { date: date}, raw: true})
        .then(session =>{
            //vérification si la session existe déjà
            if( session !== null){
                return res.status(409).json({ message: `The session ${session} already exists`})
            }

            Session.create(req.body)
                .then(session => res.json({ message: 'Session Created', data : session}))
                .catch(err =>res.status(500).json({ message: 'Database Error', error: err}))
        })
        .catch(err =>res.status(500).json({ message: 'Database Error', error: err}))
})

router.patch('/:id' , checkTokenMiddleware, (req, res) =>{
    let sessionId = parseInt(req.params.id)

    //vérification si le champ id est présent et cohérent
    if(!sessionId){
        return res.status(400).json({message: 'Missing parameter'})
    }

    // recherche de la session
    Session.findOne({where: {id: sessionId}, raw: true })
        .then(session => {
            //vérifier si l'utilisateur existe
            if(session === null){
                return res.status(404).json({ message: 'This session does not exist'})
            }

            //mise à jour de la session
            Session.update(req.body, { where: {id: sessionId}})
                .then(session => res.json({ message: 'Session Updated'}))
                .catch(err =>res.status(500).json({ message: 'Database Error', error: err}))
        })
        .catch(err =>res.status(500).json({ message: 'Database Error', error: err}))
})

router.delete('/:id', checkTokenMiddleware, (req, res) =>{
    let sessionId = parseInt(req.params.id)

    //vérification si le champ id est présent et cohérent
    if(!sessionId){
        return res.status(400).json({message: 'Missing parameter'})
    }

    //suppression de la session
    Session.destroy({ where: {id: sessionId}, force : true})
        .then(() => res.status(204).json({}))
        .catch(err =>res.status(500).json({ message: 'Database Error', error: err})) 

})

module.exports = router;