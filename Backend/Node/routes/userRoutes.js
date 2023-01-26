const express = require('express')

const router = express.Router()

const {loginUser, 
    registerUser,
    checkStatus} 
= require('../controllers/userControllers')
// const { appCheckVerification } = require('../middleware/protect')

router.post('/login',
    // appCheckVerification, 
    loginUser)
router.post('/register', registerUser, loginUser)
router.get('/', checkStatus)

module.exports = router