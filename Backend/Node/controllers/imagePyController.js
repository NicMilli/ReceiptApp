const asyncHandler = require('express-async-handler')
const path = require('path')

const uploadImage = asyncHandler(async(req, res, next) => {
    const spawn = require('child_process').spawn
    const updgradedImage = []

    const data = req.body
    const stringifiedData = JSON.stringify(data)

    // const py = spawn('python', ['..../Python/Functions/upload.py', stringifiedData]);
    const py = spawn('python', [path.join(__dirname,'../../','Python','Functions','upload.py'), stringifiedData]);
    var result = []
    py.stdout.on('data', (data) => {
        result += data

    })

    py.stderr.on('data', (data) =>{
        console.error(`stderr: ${data}`)
    })


    py.on('close', (code) => {
        res.status(201).json(result)
        console.log(`exited with code ${code}`)
    })

})

module.exports = {
    uploadImage
}
