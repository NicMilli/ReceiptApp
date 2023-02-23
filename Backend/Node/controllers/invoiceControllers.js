const asyncHandler = require('express-async-handler')
const { ref,
     uploadBytes,
     getStorage,
    getDownloadURL} = require('firebase/storage')
const { db , auth } = require('../../Config/firebase.config.js')
const os = require('os');
const fs = require('fs');


const imageToFirestore = asyncHandler(async(req, res, next) => {

  const fileArray = res.locals.data

  fileArray.forEach(async(file) => { 
    const metadata = {
    contentType: file.mimeType
    };
    try {
      const storage = getStorage() ;
      const user = auth.currentUser ;
      const id = user ? user.uid : "00000" // for now, if there is a problem getting the logged in userid (probably a state error on code recompile), just use 00000 as the identifier
      const storageRef = ref(storage, `/images/${id}/${file.newFilename}`) ;
      const uploadTask = uploadBytes(storageRef, fs.readFileSync(file.filePath), metadata).then((snapshot) => {
        getDownloadURL(storageRef).then(url => {
          res.locals.data = url ; // send the url on to the next function (python OCR)
          next() ; 
        }) ;
      }) ;
    } catch (error) {
        console.log(error)
        res.status(400).send('Could not upload image. Please contact InvoiceMe.')
        throw new Error(error);
    }
  }) 
})

const formToFirestore = asyncHandler(async(req, res) => {

})

module.exports = {
    imageToFirestore,
    formToFirestore
}