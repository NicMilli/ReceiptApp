import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const login = createAsyncThunk('auth/login',
async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = (error.response.data) 
        return thunkAPI.rejectWithValue(message)       
        }
    }
)

export const logout = createAsyncThunk('auth/logout', async() => {
    await authService.logout()
    return {}
})

export const register = createAsyncThunk('auth/register', async(formData, thunkAPI) => {
    try {
        return await authService.register(formData)
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message.toString())
    }
})


export const checkStatus = createAsyncThunk('auth/checkStatus', async(thunkAPI,{ getState}) =>{
    const state = getState()
    const token = state.auth.user.token
    try {
        const response =  await authService.checkStatus(token)
        return response
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message.toString())
    }
})


export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
            
        }
    },
    extraReducers: (builder) =>{
        builder 
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(checkStatus.pending, (state) =>{
                state.isLoading = true
        
            })
            .addCase(checkStatus.rejected, (state, action) => {
                // reset()
                state.isLoading = false
                // logs user out due to token mismatch
                state.user = null
                state.isError = true
                state.message = action.payload
            })
            .addCase(checkStatus.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer
