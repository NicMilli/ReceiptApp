const express = require('express')

const router = express.Router()

const {loginUser, 
    registerUser,
    checkStatus,
    sendQuestion,
    updateUser,
    forgotPassword,
    getEmployees
} = require('../controllers/userControllers')
// const { appCheckVerification } = require('../middleware/protect')

router.post('/login',
    // appCheckVerification, 
    loginUser)
router.post('/register', registerUser, loginUser)
router.post('/question', sendQuestion)
router.post('/forgot-password', forgotPassword)
router.put('/update-user', updateUser)
router.get('/', checkStatus)
router.get('/get-employees', getEmployees)

module.exports = router