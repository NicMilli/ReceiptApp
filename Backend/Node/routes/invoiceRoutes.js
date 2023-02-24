const express = require('express')
const router = express.Router()

const { 
    parser
}   = require('../middleware/parser')

const {
    extractTotal
} = require('../controllers/imagePyControllers')

const { 
    imageToFirestore,
    formToFirebase
} = require('../controllers/invoiceControllers')

router.post('/image', parser, imageToFirestore, extractTotal)
router.post('/form', formToFirebase)

module.exports = router