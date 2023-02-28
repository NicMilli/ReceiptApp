const {
    db, 
    auth
} = require('../../Config/firebase.config')
const asyncHandler = require('express-async-handler')
const { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    updateProfile 
} = require('firebase/auth')
const { 
    doc, 
    getDoc, 
    setDoc, 
    updateDoc, 
    serverTimestamp 
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
        res.status(400).send('Please be sure you select position and enter all fields.')
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


module.exports = {
    loginUser,
    registerUser,
    checkStatus
}