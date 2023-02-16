const asyncHandler = require('express-async-handler')
const busboy = require('busboy')
const path = require('path');
const os = require('os');
const fs = require('fs');
const { uuidv4 } = require('@firebase/util');


// Parser will take in the file and use busboy to read it, write it to a temporary storage directory, 
    // and pass it on to the firebase upload file in invoiceControllers to get the actual contents to firestore
const parser = asyncHandler(async(req, res, next) => {
    const bb = busboy({ headers: req.headers });

    let imagesToUpload = []
    bb.on('field', (name, value, info) => {
        console.log('found a field, name is', name, 'value is', value, 'infor is', info)
    }) ;

    bb.on('file', (name, file, info) => {
        const { filename, mimeType } = info;
 
        if(mimeType !== 'image/jpeg' && mimeType !== 'image/jpg' && mimeType !== 'image/png') {
            res.status(400).send('Wrong file type. Please only upload .jpg, .jpeg, or .png files')
            throw new Error('Invalid file type')
        }
    
        const newFilename = uuidv4()
        const filePath = path.join(os.tmpdir(), newFilename)
        var writeStream = fs.createWriteStream(filePath)
        file.pipe(writeStream)
        writeStream.on('finish', () => {
            console.log('write stream is finished')   
        })

        imageToAdd = { 
            newFilename,
            filePath, 
            mimeType 
        };

        imagesToUpload.push(imageToAdd)

        file.on('data', (data) => {
            // console.log(`File [${name}]`)
        }).on('close', () => {
            console.log(`File [${name}] done`);
        });
    });
    
    bb.on('finish', async () => {
        res.locals.data = imagesToUpload 
        next()
    })    

    req.pipe(bb)
})



module.exports = {
    parser
}