const asyncHandler = require('express-async-handler')
const busboy = require('busboy')
const path = require('path');
const os = require('os');
const fs = require('fs');
// const asyncHandler = require('express-async-handler')
const {getAuth, onAuthStateChanged} = require('firebase/auth')
const { getStorage, ref,
     uploadBytes,
     uploadString,
    getDownloadURL} = require('firebase/storage')
const { addDoc, collection, serverTimestamp } = require("firebase/firestore")
const { db, auth } = require('../../Config/firebase.config.js')
const {v4} = require('uuid');
const { uuidv4 } = require('@firebase/util');



const parser = asyncHandler(async(req, res, next) => {
    const bb = busboy({ headers: req.headers });

    let imagesToUpload = []

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
        // console.log('image to upload array:', imagesToUpload)


        file.on('data', (data) => {
            console.log(`File [${name}] got ${data.length} bytes`)
            // writeStream.write(data)
        }).on('close', () => {
            console.log(`File [${name}] done`);
            console.log('PARSING STILLLL!!!!', fs.statSync(filePath))
        });
    });
    
    bb.on('finish', async () => {
        imagesToUpload.forEach((file) => {
            // console.log('Done parsing form!', fs.statSync(file.filePath))   
            const storage = getStorage()
            const metadata = {
            contentType: file.mimeType
            };
            const storageRef = ref(storage, '/images', file.newFilename)

            try {
              const uploadTask = uploadBytes(storageRef, fs.readFileSync(file.filePath), metadata)
              console.log('Successfully uploaded')
            } catch (e) {
                console.log(e)
                res.status(400).send('Could not upload image. Please contact InvoiceMe.')
                throw new Error(e);
            }
        })
    })    
    // res.locals.data = imagesToUpload 
    // next()
    req.pipe(bb)
})



module.exports = {
    parser
}