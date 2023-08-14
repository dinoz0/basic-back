/**************************/
/*** Import des modules ***/
const express = require('express')
const cors = require('cors')
const User = require('./models/user')
const jwt = require('jsonwebtoken')



/**************************************/
/*** Import de la connexiona  la DB ***/
let DB = require('./db.config')

/*******************************/
/*** Initialisation de l'API ***/
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))


/*************************************/
/*** Import des modules de routage ***/

const user_router = require('./routes/users')



// const auth_router = require('./routes/auth')


app.post("/login", async (req, res) => {
    const { token }  = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    const { email } = ticket.getPayload();    
    const user = await User.findOne({ where: { email: email }})
    if(user === null){   

        res.status(204)
        return res.json({message: "Database Error"})
        
    }else{

        const jwttoken = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING})

        return res.json({access_token: jwttoken})

    }         
})


/********************************/
/*** Mise en place du routage ***/
app.get('/', (req, res) => res.send(`API en ligne`) )

app.use('/user', user_router)

// app.use('/auth', auth_router)


app.get('*', (req,res) => res.status(501).send('Ressource inexistante'))


/*********************************/
/*** Start server avec test DB ***/
DB.authenticate()
.then(() =>  
    User.findAll()
    .then(user => {
        //vérifier si il n'y a pas d'utilisateur en base
        if(user == ""){
            User.create({ email: process.env.USER_EMAIL})
            .then(() => {console.log(`L'utilisateur ${process.env.USER_EMAIL} a bien été crée`)})
            .catch(err => console.log(`Database Error`, err))
        }
    })
)
.then(() => {
    appServer = app.listen(process.env.SERVER_PORT, () => {
        console.log(`This server is running on port ${process.env.SERVER_PORT}`)
    })
})
.catch(err => console.log(`Database Error`, err))

