import axios from 'axios'


const API_URL = '/api/user/'

const login = async(userData) => {
    const response = await axios.post(API_URL + 'login', userData)

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

const authService = {
    login, 
    logout,
    register,
    checkStatus
}

export default authService
