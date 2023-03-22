import axios from 'axios'
const { initializeAppCheck, getToken, ReCaptchaV3Provider } = require('firebase/app-check');
const { initializeApp } = require('firebase/app')

// const firebaseConfig = {
//   apiKey: "AIzaSyBqo4SVq1KRroDJVpGJIHchL7EgQ_ooryE",
//   authDomain: "receiptapp-d19c6.firebaseapp.com",
//   projectId:"receiptapp-d19c6",
//   storageBucket:"receiptapp-d19c6.appspot.com",
//   messagingSenderId: "1012742181460",
//   appId: "1:1012742181460:web:5956bb6888785ba941d3c1",
//   measurementId: "G-YBNSTXR3T6"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const appCheck = initializeAppCheck(
//     app, { 
//         provider: new ReCaptchaV3Provider("6Le_YCMkAAAAABdpxqMTLGYlguCGYIO8lB5aPUi4"),
//         isTokenAutoRefreshEnabled: true 
//     }
// );

// const getAppCheckToken = async () => {
//   try {
//       return await getToken(appCheck);
//     } catch (error) {
//       // Handle any errors if the token was not retrieved.
//       console.log(error)
//       return error;
//   }
// };

const API_URL = '/api/user/'

const login = async(userData) => {
    // const appCheckTokenResponse = await getAppCheckToken()
   
    const response = await axios.post(API_URL + 'login', userData 
    // , {
    //     headers: {
    //     'X-Firebase-AppCheck': appCheckTokenResponse.token,
    //     }
    // }
    )
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const logout = () => localStorage.removeItem('user')


const register = async(formData) => {
    const response = await axios.post(API_URL + 'register', formData)
    return response.data
}


const checkStatus = async(token) => {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}` }
        }
    )
    // will return true if decoded token matches a valid id of a document
    return response.data
}

const sendQuestion = async(question) => {
    const response = await axios.post(API_URL + 'question', question)
    return response.status;
  }

const updateUser = async(form) => {
    const response = await axios.put(API_URL + 'update-user', form) ;
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data ;
}

const forgotPassword = async(email) => {
    const response = await axios.post(API_URL + 'forgot-password', email);
    
    return response.data;
};

const getEmployees = async() => {
    const response = await axios.get(API_URL + 'get-employees')

    return response.data;
}

const adminAddEmployee = async(form) => {
    const response = await axios.post(API_URL + 'add-new-employee', form);

    return response.data.accessCode;
}

const accessRegister = async(form) => {
    const response = await axios.post(API_URL + 'access-register', form);

    return response.data
}

const authService = {
    login, 
    logout,
    register,
    checkStatus,
    sendQuestion,
    updateUser,
    forgotPassword,
    getEmployees,
    adminAddEmployee,
    accessRegister
}

export default authService
