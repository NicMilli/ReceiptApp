const asyncHandler = require('express-async-handler')
const path = require('path')

const extractTotal = asyncHandler(async(req, res, next) => {
    console.log("res.locals.data is", res.locals.data)
    const spawn = require('child_process').spawn
    const data = res.locals.data
    // const data = req.body
    const stringifiedData = JSON.stringify(data)
    console.log('stringified data is', stringifiedData) ;
    // Child process to run the python functions to upgrade image for improved text recognition
    // and then extract the total from the upgraded receipt image
    // and then upload to firebase
    const py = spawn('python', [path.join(__dirname,'../../','Python','Functions','upload.py'), stringifiedData]);
    var result = []
    py.stdout.on('data', (data) => {
        result += data
    })
    py.stderr.on('data', (data) =>{
        /// data should be the total output as identified from OCR function
        console.error(`stderr: ${data}`)
    })
    py.on('close', (code) => {
        
        res.status(201).json(result)
        console.log(`exited with code ${code}`, 'result is', result)
    })

})

module.exports = {
    extractTotal
}
