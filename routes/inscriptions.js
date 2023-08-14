/**************************************/
/*** Import des modules nécessaires ***/
const express = require('express')

const Inscription = require('../models/inscription')

const checkTokenMiddleware = require('../jsonwebtoken/check')

/*****************************************/
/*** Récupération du routeur d'express ***/
let router =express.Router()

/*******************************************/
/*** Routage de la ressource Inscription ***/

router.get('',  (req, res) => {
    Inscription.findAll()
        .then(  inscription => res.json({ data: inscription}))
        .catch( err => res.status(500).json({message: "Database Error", error: err}))// ne pas laisser pour la version final 
})

router.get('/:id', checkTokenMiddleware, (req, res) => {
    let inscriptionId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if(!inscriptionId){
        return res.json(400).json({ message:'Missing Parameter'})
    }

    // Récupération de l'inscription
    Inscription.findOne({ where: {id: inscriptionId}, raw : true})
        .then(inscription => {
            if((inscription === null)){
                return res.status(400).json({ message: 'This inscription does not exist !'})
            }

            // Inscription trouvé
            return res.json({data: inscription})
        })
        .catch(err =>res.status(500).json({ message: 'Database Error', error: err}))
})

router.put('' , (req, res) =>{
    const {company, activity, civility, name, first_name, job, address, postal_code, city, phone_number, email, session_id, invited_by, one_to_one, one_to_one_company, present, inscription_date, comment, agreement} = req.body
    const one_to_one_companyArray = Array.isArray(one_to_one_company) ? one_to_one_company : [one_to_one_company]; //converti one_to_one_company en array
    //Validation des données recus
    if( !company || !activity || !civility || !name || !first_name || !job || !address || !postal_code|| !city || !phone_number || !email || !session_id || !invited_by || !one_to_one  || !agreement ){
        return res.status(400).json({message: 'Missing Data'})
    }

    Inscription.findOne({where: {  session_id: session_id, email: email}, raw: true})
        .then(inscription =>{
            //vérification si la inscription existe déjà
            if( inscription !== null){
                return res.status(409).json({ message: `The inscription ${inscription} already exists`})
            }
            req.body.one_to_one_company = one_to_one_companyArray;

            Inscription.create(req.body)
                .then(inscription => res.json({ message: 'Inscription Created', data : inscription}))
                .catch(err =>res.status(500).json({ message: 'Database Error', error: err}))
        })
        .catch(err =>res.status(500).json({ message: 'Database Error', error: err}))
})

router.patch('/:id' , checkTokenMiddleware, (req, res) =>{
    let inscriptionId = parseInt(req.params.id)

    //vérification si le champ id est présent et cohérent
    if(!inscriptionId){
        return res.status(400).json({message: 'Missing parameter'})
    }

    // recherche de l'inscription
    Inscription.findOne({where: {id: inscriptionId}, raw: true })
        .then(inscription => {
            //vérifier si l'utilisateur existe
            if(inscription === null){
                return res.status(404).json({ message: 'This inscription does not exist'})
            }

            //mise à jour de l'inscription
            Inscription.update(req.body, { where: {id: inscriptionId}})
                .then(inscription => res.json({ message: 'Inscription Updated'}))
                .catch(err =>res.status(500).json({ message: 'Database Error', error: err}))
        })
        .catch(err =>res.status(500).json({ message: 'Database Error', error: err}))
})

router.delete('/:id', checkTokenMiddleware, (req, res) =>{
    let inscriptionId = parseInt(req.params.id)

    //vérification si le champ id est présent et cohérent
    if(!inscriptionId){
        return res.status(400).json({message: 'Missing parameter'})
    }

    //suppression de l'inscription
    Inscription.destroy({ where: {id: inscriptionId}, force : true})
        .then(() => res.status(204).json({}))
        .catch(err =>res.status(500).json({ message: 'Database Error', error: err})) 

})

module.exports = router;