const express = require('express')
const router = express.Router()

const {
    uploadImage
} = require('../controllers/imagePyController')

router.post('/', uploadImage)

module.exports = router