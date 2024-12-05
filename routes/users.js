/**************************************/
/*** Import des modules nécessaires ***/
const express = require('express')
const bcrypt = require('bcrypt')

const User = require('../models/user')

const checkTokenMiddleware = require('../jsonwebtoken/check')

/*****************************************/
/*** Récupération du routeur d'express ***/
let router = express.Router()

/************************************/
/*** Routage de la ressource User ***/

router.get('', (req, res) => {
    User.findAll()
        .then(user => res.json({ data: user }))
        .catch(err => res.status(500).json({ message: "Database Error", error: err }))// ne pas laisser pour la version final 
})

router.get('/:id', (req, res) => {
    let userId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!userId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    // Récupération de l'utilisateur
    User.findOne({ where: { id: userId }, raw: true })
        .then(user => {
            if ((user === null)) {
                return res.status(400).json({ message: 'This user does not exist !' })
            }



            // User trouvé
            return res.json({ data: user })
        })
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
})

router.put('', (req, res) => {
    const { email, password } = req.body

    //Validation des données recus
    if (!email || !password) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    User.findOne({ where: { email: email }, raw: true })
        .then(user => {
            //vérification si l'user existe déjà
            if (user !== null) {
                return res.status(409).json({ message: `The user ${user} already exists` })
            }

            //hashage du mdp
            bcrypt.hash(password, 10)
                .then(hash => {
                    req.body.password = hash
                    User.create(req.body)
                        .then(user => res.json({ message: 'User Created', data: user }))
                        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
                })
                .catch(err => res.status(500))


        })
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
})

router.patch('/:id', checkTokenMiddleware, (req, res) => {
    let userId = parseInt(req.params.id)

    //vérification si le champ id est présent et cohérent
    if (!userId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // recherche de la user
    User.findOne({ where: { id: userId }, raw: true })
        .then(user => {
            //vérifier si l'utilisateur existe
            if (user === null) {
                return res.status(404).json({ message: 'This user does not exist' })
            }

            //mise à jour de la user
            User.update(req.body, { where: { id: userId } })
                .then(user => res.json({ message: 'User Updated' }))
                .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
        })
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
})

router.delete('/:id', (req, res) => {
    let userId = parseInt(req.params.id)

    //vérification si le champ id est présent et cohérent
    if (!userId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    //suppression de l'utlisateur
    User.destroy({ where: { id: userId }, force: true })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))

})

module.exports = router;