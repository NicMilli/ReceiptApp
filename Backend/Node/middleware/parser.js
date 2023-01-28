const asyncHandler = require('express-async-handler')
const busboy = require('busboy')
const path = require('path');
const os = require('os');
const fs = require('fs');
// const asyncHandler = require('express-async-handler')
const {getAuth, onAuthStateChanged} = require('firebase/auth')
const { getStorage, ref,
     uploadBytes,
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


    bb.on('finish', () => {
    //     imagesToUpload.forEach((file) => {
    //         console.log('Done parsing form!', fs.statSync(file.filePath))
    
    //         try {
    //           const storage = getStorage()
    //           const metadata = {
    //             contentType: file.mimeType
    //           };
    //           const storageRef = ref(storage, 'images/' + file.newFilename)
            
    //           const uploadTask = uploadBytes(storageRef, file.filePath, metadata)
          
    //           uploadTask.on('state_changed', 
    //           (snapshot) => {console.log('bytes transferred to firestore: ', snapshot.bytesTransferred)},
    //           (error) => {
    //             res.status(418).send('Could not upload file. Please contact InvoiceMe.')
    //             throw new Error(error)
    //           }, 
    //           () => {
    //             // Handle successful uploads on complete
    //             // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //             res.status(200).send(downloadURL)
    //             })
    //           }
    //           )
    //         }
    //         catch(error) {
    //           console.log(error)
    //           throw new Error('Could not upload image. Please contact InvoiceMe.')
    //         }
    //       })
    // // res.locals.data = imagesToUpload 
    // // console.log('locals data to next fn', res.locals.data)
    // // next()
    });
    req.pipe(bb)

})

module.exports = {
    parser
}