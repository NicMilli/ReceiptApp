const {db, auth} = require('../../Config/firebase.config')
const asyncHandler = require('express-async-handler')
const { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } = require('firebase/auth')
const { doc, getDoc, setDoc, serverTimestamp } = require ('firebase/firestore')

const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    try {
        const userCredential = await signInWithEmailAndPassword
        (auth, email, password)
    
        const docRef = doc(db, "users", auth.currentUser.uid)
        const docSnap = await getDoc(docRef)
        const userData = docSnap.data()
    
        if(userCredential.user) {
            res.status(200).json({
                name: auth.currentUser.displayName,
                email: auth.currentUser.email,
                position: userData.position,
                token: auth.currentUser.getIdToken()
            })
        }
    } catch (error) {
        res.status(401).send('Incorrect credentials')
        throw new Error('Could not validate user')
    }
})


const registerUser = asyncHandler(async(req, res) => {
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
        res.status(200).json(formDataCopy)

    } catch(error) {
        res.status(500).json({error})
        throw new Error(`${error}`)
    }
})

module.exports = {
    loginUser,
    registerUser
}