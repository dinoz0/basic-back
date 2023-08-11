/*************************/
/*** Import used modules */
const express = require('express')
const userCtrl = require('../controllers/user')

/***************************/
/*** Get Expresss's router */
let router = express.Router()

/*********************************************/
/*** Middleware to log date for each request */
router.use( (req, res, next) => {
    const event = new Date()
    console.log('User Time:', event.toString())
    next()
})


/************************************/
/*** Routes for user resource */

router.get('/', userCtrl.getAllUsers)

router.get('/:id', userCtrl.getUser)

router.put('', userCtrl.addUser)

router.patch('/:id', userCtrl.updateUser)
    
router.delete('/:id', userCtrl.deleteUser)

module.exports = router