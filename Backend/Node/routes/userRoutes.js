const express = require('express')

const router = express.Router()

const {loginUser, 
    registerUser,
    checkStatus} 
= require('../controllers/userControllers')

router.post('/login', loginUser)
router.post('/register', registerUser, loginUser)
router.get('/', checkStatus)

module.exports = router