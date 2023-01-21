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

    if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const authService = {
    login, 
    logout,
    register
}

export default authService
