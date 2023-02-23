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
    formToFirestore
} = require('../controllers/invoiceControllers')

router.post('/image', parser, imageToFirestore, extractTotal)
router.post('/form', formToFirestore)

module.exports = router