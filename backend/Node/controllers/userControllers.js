const {
    db, 
    auth
} = require('../../Config/firebase.config')

const asyncHandler = require('express-async-handler')

const { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    updateProfile ,
    sendPasswordResetEmail
} = require('firebase/auth')

const { 
    doc, 
    query,
    where,
    getDoc, 
    getDocs,
    setDoc,
    Timestamp,
    addDoc, 
    updateDoc, 
    serverTimestamp,
    collection
} = require ('firebase/firestore')

const jwt = require('jsonwebtoken')

require('dotenv').config()

const loginUser = asyncHandler(async(req, res) => {
    let email 
    let password
    res.locals.data ?
        {email, password} = res.locals.data :
        {email, password} = req.body

    try {
        const userCredential = await signInWithEmailAndPassword
        (auth, email, password)
        
        const docRef = doc(db, "users", auth.currentUser.uid)
        const token = generateToken(auth.currentUser.uid)
        await updateDoc(docRef, {token: token})

        const authToken = auth.currentUser.getIdToken()

        const docSnap = await getDoc(docRef)
        const userData = docSnap.data()
        
        if(userCredential.user) {
            res.status(200).json({
                name: auth.currentUser.displayName,
                email: auth.currentUser.email,
                position: userData.position,
                timestamp: userData.timestamp,
                token: token
            })
        }
    } catch (error) {
        res.status(401).send('Incorrect credentials')
        throw new Error('Could not validate user')
    }
})

const registerUser = asyncHandler(async(req, res, next) => {
    const {name, position, email, password} = req.body

    if(!name || !position || !email || !password ) {
        res.status(400).send('Please be sure you enter all fields.')
        throw new Error('Enter all fields')
    }
    try {    
     
        const userCredential = await createUserWithEmailAndPassword
        (auth, email, password)

        const user = userCredential.user

        updateProfile(auth.currentUser, {
            displayName: name,
        })
        
        const formDataCopy = {name, position, email}
        formDataCopy.timestamp = serverTimestamp()

        await setDoc(doc(db, "users", user.uid), formDataCopy)
        console.log('success')
        res.locals.data = {'email': email, 'password': password}
        next()

    } catch(error) {
        res.status(500).json('Could not register user. Please try again and contact InvoiceMe if problem persists.')
        throw new Error(`${error}`)
    }
})


const generateToken = (id) => {
    const strId = String(id)
    
    return jwt.sign({"id": strId }, process.env.JWT_SECRET, {
        expiresIn: '2h',
    })
}


const checkStatus = asyncHandler(async(req, res) => {
    if(req.headers.authorization.startsWith('Bearer')) {
        try {
            const token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            // Collects the document with the user ID from the decoded token. If the token is no longer active, it will not identify user
            const userDoc = doc(db, "users", decoded.id)
            const docSnap = await getDoc(userDoc)
        
            if(docSnap.exists()) {
                res.status(200).json(docSnap.exists())
            } else {
                // Decoded token doesn't match to an valid document id
                res.status(401).send('Invalid authorization. Please sign in again.')
                throw new Error('Not Authorized - token does not match document token')
            }
        } catch (error) {
            // Faulty token - can't decode
            res.status(401).send('Could not validate user token. Please sign in again.')
            throw new Error('Not Authorized')
        }
    }
})

const sendQuestion = asyncHandler(async(req,res) => {
    try {
        await addDoc(collection(db, "questions"), req.body);
        res.status(201).send('success');
    } catch (error) {
        res.status(403).send("Could not post your question. This failure has been noted and InvoiceMe will look into its cause.") ;
        throw new Error(error);
    }
})

const updateUser = asyncHandler(async(req,res) => {
    try {
        const user = auth.currentUser;
        let userId;
      
        if (user) {
         userId = user.uid;
        } else {
            const q = await query(collection(db, "users"), where("email", "==", req.body.email));
            const queryDoc = await getDocs(q) ;
            userId = queryDoc.docs[0].id;
        }

        // update the userdoc
        await updateDoc(doc(db, "users", userId), req.body);
        const userUpdatedDoc = await getDoc(doc(db, "users", userId));

        // update all the name fields in the invoices subcollection of that user
        const invoiceQuery = query(collection(db, "users", userId, "invoices"));
        const invoiceSnapshots = await getDocs(invoiceQuery);

        invoiceSnapshots.forEach((snap) => {
            updateDoc(doc(db, "users", userId, "invoices", snap.id), {
                name: req.body.name
            });
        });

        res.status(201).send(userUpdatedDoc.data());
    } catch (error) {
        res.status(404).send("Could not update your user profile. Please contact InvoiceMe for help.");
        throw new Error(error);
    }
})

const forgotPassword = asyncHandler(async(req, res) => {
    try {
        await sendPasswordResetEmail(auth, req.body.email);
        res.status(201);
      } catch (error) {
        res.status(400).send('Unable to send reset email');
        throw new Error(error);
      };
});

const getEmployees = asyncHandler(async(req, res) => {
    try {
        const q = await query(collection(db, "users")) ;
        const queryDocs = await getDocs(q) ;
        let users = [];
        queryDocs.forEach((doc) => {
            users.push(doc.data().name);
        }) ;
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send('Error retrieving users');
        throw new Error(error);
    }
})

const adminAddEmployee = asyncHandler(async(req, res) => {
    // admin sends in email and position, gets back a user token to share with employee

    try {
        accessCode = Math.floor(Math.random() * (Math.ceil(100000) - Math.floor(10000)) + (Math.ceil(10000)));
        req.body.accessCode = accessCode;
        req.body.date = new Date();
        const q = await query(collection(db, "requestedusers"), where("email", "==", req.body.email));
        const queryDoc = await getDocs(q); 
        if (queryDoc.docs.length > 0) {
            // user has already been created so just update new code and date
            await setDoc(doc(db, "requestedusers", queryDoc.docs[0].id), req.body);
        } else {
            // otherwise add a new document
            await addDoc(collection(db, "requestedusers"), req.body);
        } 
        
        res.status(201).send({"accessCode" : accessCode});
    } catch (error) {
        res.status(400).send('Could not add user at this time. Please contact InvoiceMe for help.');
        throw new Error(error);
    }
})

const validateNewUserEmailandAccessCode = asyncHandler(async (req, res) => {
    // Takes in a new user token and email, passes them with validation
    // and allows them to submit the rest of the register form

    try {
        const q = await query(collection(db, "requestedusers"), where("email", "==", req.body.accessEmail), where("accessCode", "==", Number(req.body.accessCode)));
        const queryDoc = await getDocs(q);
        const newEmployeeInfo = queryDoc.docs[0].data();
        console.log(newEmployeeInfo.date.seconds + 7200 < Timestamp.fromDate(new Date()))
        if (queryDoc.docs.length > 0 && (newEmployeeInfo.date.seconds + 7200 < Timestamp.fromDate(new Date()))) {
            res.status(200).send({email: newEmployeeInfo.email, position: newEmployeeInfo.position});
        } else {
            throw new Error('Could not find employee. Check your access code.');
        }
    } catch (error) {
        res.status(400).send('InvoiceMe failed to find your use records.')
        throw new Error(error)
    }
})


module.exports = {
    loginUser,
    registerUser,
    checkStatus,
    sendQuestion,
    updateUser,
    forgotPassword,
    getEmployees,
    adminAddEmployee,
    validateNewUserEmailandAccessCode
}