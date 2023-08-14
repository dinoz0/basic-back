/**************************************/
/*** Import des modules nécessaires ***/
const express = require('express')

/*****************************************/
/*** Récupération du routeur d'express ***/
let router =express.Router()

const { OAuth2Client } = require('google-auth-library')

/***********************************/
/*** Routage de 'authentification***/

const client = new OAuth2Client("775629632797-v6clfh5oude9sr2fna2rag63acpm2lp6.apps.googleusercontent.com")


router.post("/api/v1/auth/google", async (req, res) => {
    const { token }  = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: "775629632797-v6clfh5oude9sr2fna2rag63acpm2lp6.apps.googleusercontent.com"
    });
    const { name, email, picture } = ticket.getPayload();    
    const user = await db.user.upsert({ 
        where: { email: email },
        update: { name, picture },
        create: { name, email, picture }
    })
    console.log(req)
    req.session.userId = user.id

    res.status(201)
    res.json(user)
})

module.exports = router;