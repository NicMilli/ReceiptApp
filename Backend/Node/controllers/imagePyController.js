const asyncHandler = require('express-async-handler')
const path = require('path')
const Image = require('../models/imageModel')

const uploadImage = asyncHandler(async(req, res) => {
    // const {spawn} = require('child_process')
    const spawn = require('child_process').spawn
    const updgradedImage = []

    // const data = '../SampleData/receipt5.jpg'
    const data = req.body
    const stringifiedData = JSON.stringify(data)

    // const py = spawn('python', ['..../Python/Functions/upload.py', stringifiedData]);
    const py = spawn('python', [path.join(__dirname,'../../','Python','Functions','upload.py'), stringifiedData]);

    py.stdout.on('data', (data) => {
        const upgradedImage = []
        console.log(`stdout: data received from node ${data}`)
        
        updgradedImage.push(data)
        console.log(upgradedImage)
        res.send(data)
    })

    py.stderr.on('data', (data) =>{
        console.error(`stderr: ${data}`)
    })


    py.on('close', (code) => {
        console.log(`exited with code ${code}`)
    })

})

module.exports = {
    uploadImage
}
