const asyncHandler = require('express-async-handler')
const fs = require('fs');
const { 
  ref,
  uploadBytes,
  getStorage,
  getDownloadURL
} = require('firebase/storage')
const { 
  doc,
  setDoc, 
  collection,
  addDoc,
  getDocs, 
  query, 
  where,
  serverTimestamp  
} = require("firebase/firestore"); 
const { 
  db,
  auth
} = require('../../Config/firebase.config.js')
const { getAuth } = require('firebase/auth')
// const os = require('os');


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
          res.locals.data = {"url": url, "filename": file.newFilename} ; // send the url on to the next function (python OCR)
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

const formToFirebase = asyncHandler(async(req, res) => {
  try {
    auth.onAuthStateChanged((user) => {
      var user = user ;
    })
    const user = auth.currentUser ;
    let userId;
    if (user !== null) {
      userId = user.uid ;
    } else {
      const q = await query(collection(db, "users"), where("email", "==", req.body.email)) ;
      const queryDoc = await getDocs(q) ;
      userId = queryDoc.docs[0].id ; 
    }
    req.body.userKey = userId ;
    delete req.body.name ;
    delete req.body.email ;
    req.body.timestamp = serverTimestamp()
    // const newReceiptDoc = await setDoc(doc(db, "invoices", req.body.invoiceId), {"timestamp": serverTimestamp()})
    const newDoc = await setDoc(doc(db, "invoices", req.body.invoiceId), req.body)
    
    res.status(200).send("Success")
  } catch (error) {
    res.status(401).send("Could not upload invoice. Please contact InvoiceMe for help.")
    throw new Error(error, error.stack)
  }
  
})

module.exports = {
    imageToFirestore,
    formToFirebase
}