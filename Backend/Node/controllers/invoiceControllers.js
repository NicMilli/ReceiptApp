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
  updateDoc,
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

    delete req.body.email ;
    req.body.timestamp = serverTimestamp();
    req.body.compensated = false ;
    req.body.date = Timestamp.fromDate(new Date(req.body.date));

    await addDoc(collection(db, "users", userId, "invoices"), req.body);
    res.status(201).send("Success");
  } catch (error) {
    res.status(401).send("Could not upload invoice. Please contact InvoiceMe for help.");
    throw new Error(error);
  }

})

const viewInvoices = asyncHandler(async(req, res) => {
  try {
    const user = auth.currentUser;
    const headers = JSON.parse(req.headers.info);
    let userId;

    if (user !== null) {
      userId = user.uid;
    } else {
      const q = await query(collection(db, "users"), where("email", "==", headers.email));
      const queryUserDoc = await getDocs(q);
      userId = queryUserDoc.docs[0].id;
    }

    let from = new Date(headers.dateFrom);
    let to = new Date(headers.dateTo);
    let reference; 

    if(headers.position === 'admin') {
      reference = collectionGroup(db, "invoices");
    } else {
      reference = collection(db, "users", userId, "invoices");
    };
   
    const q = await query(reference, where("date", ">=", from), where("date", "<=" , to));
    const queryDoc = await getDocs(q);

    let queryData = [];
    queryDoc.forEach(doc => {
      d = doc.data();
      queryData.push(d);
    })

    if(headers.position === 'admin') {
      queryData = queryData.filter((doc) => headers.employeeList.includes(doc.name));
    };
    
    res.status(200).send(queryData);
  } catch (error) {
    res.status(404).send('Could not retrieve any invoices for the dates selected. If you believe this is an error, please contact InvoiceMe.')
    throw new Error(error)
  }
})

const updateInvoice = asyncHandler(async(req, res) => {
  try {
    const user = auth.currentUser ;
    let userId;

    let reference = collectionGroup(db, "invoices");
    const q = await query(reference, where("imageInvoiceId", "==", req.body.imageInvoiceId)) ;
    const queryDoc = await getDocs(q) ;
    const docId = queryDoc.docs[0].id ;

    if (user) {
      userId = user.uid ;
    } else {
      userId = queryDoc.docs[0].ref.parent.parent.id ;
    }
    req.body.date = Timestamp.fromDate(new Date(req.body.date));
    await updateDoc(doc(db, "users", userId, "invoices", docId), req.body) ;
    res.status(200).send("Invoice successfully updated.") ;
} catch (error) {
    res.status(404).send("Could not update your invoice. Please contact InvoiceMe for help.") ;
    throw new Error(error) ;
}
})

const markAsCompensated = asyncHandler(async(req,res) => {
  try {
    const user = auth.currentUser ;
    let userId;

    let reference = collectionGroup(db, "invoices");
    const q = await query(reference, where("imageInvoiceId", "==", req.body.imageInvoiceId));
    const queryDoc = await getDocs(q);
    const docId = queryDoc.docs[0].id ;

    if (user) {
      userId = user.uid;
    } else {
      userId = queryDoc.docs[0].ref.parent.parent.id;
    }

    await updateDoc(doc(db, "users", userId, "invoices", docId), {"compensated": true});

    res.status(200).send("This invoice is now marked as compensated.")
  } catch (error) {
        res.status(404).send("Could not change compensation status for this invoice. Please contact InvoiceMe for help.") ;
    throw new Error(error) ;
  }
})

module.exports = {
    imageToFirestore,
    formToFirebase,
    viewInvoices,
    updateInvoice,
    markAsCompensated
}