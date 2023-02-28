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
  getDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  Timestamp,
  collectionGroup
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
      res.status(201).send("Success");

    } catch (error) {
        res.status(400).send('Could not upload image. Please contact InvoiceMe.');
        throw new Error(error);
    }
  })

})

const formToFirebase = asyncHandler(async(req, res) => {
  try {
    const user = auth.currentUser ;
    let userId;
    if (user !== null) {
      userId = user.uid ;
    } else {
      const q = await query(collection(db, "users"), where("email", "==", req.body.email)) ;
      const queryDoc = await getDocs(q) ;
      userId = queryDoc.docs[0].id ;
    }

    delete req.body.name ;
    delete req.body.email ;
    req.body.timestamp = serverTimestamp();
    req.body.date = Timestamp.fromDate(new Date(req.body.date));

    const newDoc = await addDoc(collection(db, "users", userId, "invoices"), req.body);
    res.status(201).send("Success");
  } catch (error) {
    res.status(401).send("Could not upload invoice. Please contact InvoiceMe for help.");
    throw new Error(error);
  }

})

const viewInvoices = asyncHandler(async(req, res) => {
  try {
    const user = auth.currentUser ;
    const headers = JSON.parse(req.headers.info);
    if (user !== null) {
      userId = user.uid ;
    } else {
      const q = await query(collection(db, "users"), where("email", "==", headers.email)) ;
      const queryUserDoc = await getDocs(q) ;
      var userId = queryUserDoc.docs[0].id ;
    }
    var from = new Date(headers.dateFrom);
    var to = new Date(headers.dateTo);

    if(headers.position === 'admin') {
      var reference = collectionGroup(db, "invoices");
    } else {
      var reference = collection(db, "users", userId, "invoices");
    }
    console.log(from)
    console.log(to)

    const q = await query(reference, where("date", ">=", from), where("date", "<=" , to))
    const queryDoc = await getDocs(q)

    var queryData = []
    queryDoc.forEach(doc => {
      d = doc.data()
      queryData.push({date: d.date, category: d.category, comment: d.comment, location: d.location, 
      currency: d.currency, amount: d.amount, otherCategory: d.otherCategory, vendor: d.vendor, compensated: false})
    })
    console.log(queryData)

    res.status(200).send(queryData)
  } catch (error) {
    res.status(400).send('Could not retrieve any invoices for the dates selected. If you believe this is an error, please contact InvoiceMe.')
    throw new Error(error)
  }
})

module.exports = {
    imageToFirestore,
    formToFirebase,
    viewInvoices
}