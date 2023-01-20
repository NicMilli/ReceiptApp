import axios from 'axios'
import { current } from '@reduxjs/toolkit'

const API_URL = '/api/user/'

const login = async(userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
        console.log(response.data)
    }

    return response.data
}

const logout = () => localStorage.removeItem('user')

const authService = {
    login, 
    logout
}

export default authService
