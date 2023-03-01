const express = require('express')

const router = express.Router()

const {loginUser, 
    registerUser,
    checkStatus,
    sendQuestion,
    updateUser
} = require('../controllers/userControllers')
// const { appCheckVerification } = require('../middleware/protect')

router.post('/login',
    // appCheckVerification, 
    loginUser)
router.post('/register', registerUser, loginUser)
router.post('/question', sendQuestion)
router.put('/update-user', updateUser)
router.get('/', checkStatus)

module.exports = router