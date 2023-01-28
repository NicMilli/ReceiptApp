const asyncHandler = require('express-async-handler')
const busboy = require('busboy')
const path = require('path');
const os = require('os');
const fs = require('fs');
// const asyncHandler = require('express-async-handler')
const {getAuth, onAuthStateChanged} = require('firebase/auth')
const { getStorage, ref,
     uploadBytesResumable,
    getDownloadURL} = require('firebase/storage')
const { addDoc, collection, serverTimestamp } = require("firebase/firestore")
const { db, auth } = require('../../Config/firebase.config.js')
const {v4} = require('uuid');
const { uuidv4 } = require('@firebase/util');


const parser = asyncHandler(async(req, res, next) => {
    const bb = busboy({ headers: req.headers });

    let imagesToUpload = []

    bb.on('file', (name, file, info) => {
        const { filename, encoding, mimeType } = info;
    //     console.log('ON FILE HERE',
    //     'filename is',filename,
    //     'encoding is', encoding,
    //     'mimetype is', mimeType,
    //     'info is', info
    // );

        if(mimeType !== 'image/jpeg' && mimeType !== 'image/jpg' && mimeType !== 'image/png') {
            res.status(400).send('Wrong file type. Please only upload .jpg, .jpeg, or .png files')
            throw new Error('Invalid file type')
        }
        const newFilename = uuidv4()
        const filePath = path.join(os.tmpdir(), newFilename)
        console.log('filePath from parser is',filePath)
        imageToAdd = { 
            newFilename,
            filePath, 
            mimeType 
        };

        var writeStream = fs.createWriteStream(filePath)
       
        // file.pipe(writeStream)
        // let reader = fs.createReadStream(filePath).pipe(writeStream)
        // writeStream.on("error", (err) => {
        //     console.log('Writestream error ====>', err)
        // })
        // writeStream.on("close", async(err) => {
        //     let sizeBytes = fs.statSync(filePath.size)
        // })

        imagesToUpload.push(imageToAdd)
        console.log('image to upload array:', imagesToUpload)

        file.on('data', (data) => {
            file.pipe(writeStream)
            console.log(`File [${name}] got ${data.length} bytes`);
        }).on('close', () => {
            console.log(`File [${name}] done`);
        });
    });

    bb.on('field', (name, val, info) => {
    console.log(`Field [${name}]: value: %j`, val);
    });

    bb.on('finish', () => {
    // console.log('Done parsing form!', 'BB IS', bb)

    imagesToUpload.forEach((file) => {
        try {
          const storage = getStorage()

          const metadata = {
            contentType: file.mimeType
          };
      
          const storageRef = ref(storage, 'images/' + file.newFilename)
          const filePath = "C:\\Users\\Base\\AppData\\Local\\Temp\\1eb3eec3-fe2c-4bef-942b-9498a5b2d6c9"
          console.log('FilePath here ------------>', filePath)
          const uploadTask = uploadBytesResumable(storageRef, filePath, metadata)
      
          uploadTask.on('state_changed', 
          (snapshot) => {console.log(snapshot.bytesTransferred)},
          (error) => {
            res.status(418).send('Could not upload file. Please contact InvoiceMe.')
            throw new Error(error)
          }, 
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            res.status(200).send(downloadURL)
            })
          }
          )
        }
        catch(error) {
          console.log(error)
          throw new Error('Could not upload image. Please contact InvoiceMe.')
        }
      })
    // res.locals.data = imagesToUpload 
    // console.log('locals data to next fn', res.locals.data)
    // next()
    });
    req.pipe(bb)

})

module.exports = {
    parser
}