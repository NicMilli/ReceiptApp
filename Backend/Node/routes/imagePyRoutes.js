const express = require('express')
const router = express.Router()

const {
    uploadTotal
} = require('../controllers/imagePyController')

router.post('/', uploadTotal)

module.exports = router