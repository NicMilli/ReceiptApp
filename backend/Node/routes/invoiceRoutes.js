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
    viewInvoices,
    updateInvoice,
    markAsCompensated
} = require('../controllers/invoiceControllers')

router.post('/image', parser, imageToFirestore, extractTotal)
router.post('/form', formToFirebase)
router.put('/update-invoice', updateInvoice)
router.put('/mark-as-compensated', markAsCompensated)
router.get('/view', viewInvoices)


module.exports = router