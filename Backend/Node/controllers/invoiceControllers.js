const asyncHandler = require('express-async-handler')
const {getAuth, onAuthStateChanged} = require('firebase/auth')
const { getStorage, ref,
     uploadBytesResumable,
    getDownloadURL} = require('firebase/storage')
const { addDoc, collection, serverTimestamp } = require("firebase/firestore")
const { db, auth } = require('../../Config/firebase.config.js')
const {v4} = require('uuid')


const imageToFirestore = asyncHandler(async(req, res) => {
  
  const fileArray = res.locals.data

  console.log('made is to the controller, file is', res.locals.data)

  // fileArray.forEach((file) => {
  //   try {
  //     const storage = getStorage()
  //     const fileName = `${v4()}`
  
  //     const metadata = {
  //       contentType: file.mimeType
  //     };
  
  //     const storageRef = ref(storage, 'images/' + fileName)
  //     const uploadTask = uploadBytesResumable(storageRef, file.filePath, metadata)
  
  //     uploadTask.on('state_changed', 
  //     (snapshot) => {console.log(snapshot.bytesTransferred)},
  //     (error) => {
  //       res.status(418).send('Could not upload file. Please contact InvoiceMe.')
  //       throw new Error(error)
  //     }, 
  //     () => {
  //       // Handle successful uploads on complete
  //       // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //       res.status(200).send(downloadURL)
  //       })
  //     }
  //     )
  //   }
  //   catch(error) {
  //     console.log(error)
  //     throw new Error('Could not upload image. Please contact InvoiceMe.')
  //   }

  // })
  
})

module.exports = {
    imageToFirestore
}