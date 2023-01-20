const {db, auth} = require('../../Config/firebase.config')
const asyncHandler = require('express-async-handler')
const { signInWithEmailAndPassword } = require('firebase/auth')

const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    const userCredential = await signInWithEmailAndPassword
    (auth, email, password)

    if(userCredential.user) {
        res.status(200).json({
            _id: auth.currentUser.uid,
            user: auth.currentUser,
            name: auth.currentUser.displayName,
            email: auth.currentUser.email,
            position: auth.currentUser.position
        })
    }
    else {
        res.status(401)
        throw new Error('Could not validate user')
    }

})

module.exports = {
    loginUser
}