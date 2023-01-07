const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({
    filepath: {
        type: String,
        required: true
    },
    original: {
        type: Array,
        required: true
    },
    upgraded : {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('Image', imageSchema)
