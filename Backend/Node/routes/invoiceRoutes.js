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
    formToFirebase,
    viewInvoices
} = require('../controllers/invoiceControllers')

router.post('/image', parser, imageToFirestore, extractTotal)
router.post('/form', formToFirebase)
router.get('/view', viewInvoices)

module.exports = router