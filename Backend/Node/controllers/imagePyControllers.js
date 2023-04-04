const asyncHandler = require('express-async-handler')
const path = require('path')

const extractTotal = asyncHandler(async(req, res, next) => {
    const spawn = require('child_process').spawn
    const url = res.locals.data["url"]
    const filename = res.locals.data["filename"]
    // const data = req.body
    const stringifiedData = JSON.stringify(url)
    // Child process to run the python functions to upgrade image for improved text recognition
    // and then extract the total from the upgraded receipt image
    // and then upload to firebase
    const py = spawn('python', [path.join(__dirname,'../../','Python','Functions','upload.py'), stringifiedData]);
    let result = []
    py.stdout.on('data', (data) => {
        result += data
    })
    py.stderr.on('data', (data) =>{
        /// data should be the total output as identified from OCR function
        console.error(`stderr: ${data}`)
    })
    py.on('close', (code) => {
        res.status(201).send({'total': result, "url": url, "filename": filename}) // if the number isn't able to be extracted, then its a set to zero
        console.log(`exited with code ${code}`)
    })

})

module.exports = {
    extractTotal
}
