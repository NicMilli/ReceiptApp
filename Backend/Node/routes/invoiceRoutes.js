const express = require('express')
const router = express.Router()

const {
    extractTotal
} = require('../controllers/imagePyControllers')

const { imageToFirestore
} = require('../controllers/invoiceControllers')

router.post('/', extractTotal)
router.post('/image', imageToFirestore)

module.exports = router