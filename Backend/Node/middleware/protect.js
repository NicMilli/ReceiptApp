const firebaseAdmin = require('firebase-admin')

// This protects the APP, not the user
const appCheckVerification = async (req, res, next) => {
    const appCheckToken = req.header('X-Firebase-AppCheck');
    if (!appCheckToken) {
        res.status(401);
        return next('Unauthorized, cant find the token? ');
    }
    try {
        const appCheckClaims = await firebaseAdmin.appCheck().verifyToken(appCheckToken);
        return next();
    } catch (err) {
        res.status(401);
        return next('Unauthorized');
    }
}

module.exports = {
    appCheckVerification
}
