const asyncHandler = require('express-async-handler')
const Image = require('../models/imageModel')

const uploadImage = asyncHandler(async(req, res) => {
    return 1
})

module.exports = {
    uploadImage
}
