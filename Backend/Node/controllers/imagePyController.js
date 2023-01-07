const asyncHandler = require('express-async-handler')
const Image = require('../models/imageModel')

const uploadImage = asyncHandler(async(req, res) => {
    const {spawn} = require('child_process')

    // const data = '../SampleData/receipt5.jpg'
    const data = req.body
    const stringifiedData = JSON.stringify(data)

    const py = spawn('python', ['.../Python/Functions/upload.py', stringifiedData]);

    py.stdout.on('data', (data) => {
        console.log(`stdout: data received from node ${data}`)
    })


    py.stdout.on('close', (code) => {
        console.log(`exited with code ${code}`)
    })


    py.stdout.on('error', (err) => {
        console.log(err)
    })
})

module.exports = {
    uploadImage
}
