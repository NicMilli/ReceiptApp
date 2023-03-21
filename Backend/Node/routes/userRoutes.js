const express = require('express')

const router = express.Router()

const {loginUser, 
    registerUser,
    checkStatus,
    sendQuestion,
    updateUser,
    forgotPassword,
    getEmployees,
    adminAddEmployee,
    validateNewUserEmailandAccessCode
} = require('../controllers/userControllers')

router.post('/login', loginUser)
router.post('/register', registerUser, loginUser)
router.post('/question', sendQuestion)
router.post('/forgot-password', forgotPassword)
router.post('/add-new-employee', adminAddEmployee)
router.post('/access-register', validateNewUserEmailandAccessCode)
router.put('/update-user', updateUser)
router.get('/', checkStatus)
router.get('/get-employees', getEmployees)

module.exports = router