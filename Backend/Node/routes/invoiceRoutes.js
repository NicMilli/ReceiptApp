const express = require('express')
const router = express.Router()

const { 
    parser
}   = require('../middleware/parser')

const {
    extractTotal
} = require('../controllers/imagePyControllers')

const { imageToFirestore
} = require('../controllers/invoiceControllers')

router.post('/', extractTotal)
router.post('/image', parser, imageToFirestore)

module.exports = router