import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    isQuestionDone: false,
    isUpdateDone: null,
    forgotPasswordSent : false,
    employees: []
}

export const login = createAsyncThunk('auth/login',
async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = error.response.data 
        return thunkAPI.rejectWithValue(message.toString())       
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


export const checkStatus = createAsyncThunk('auth/checkStatus', async(thunkAPI,{getState}) =>{
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

export const sendQuestion = createAsyncThunk('auth/sendQuestion',
    async(question, thunkAPI) => {
        try {
            return await authService.sendQuestion(question) ;
        } catch (error) {
            const message = (error.response.data) ;
            return thunkAPI.rejectWithValue(message.toString()) ;
        } ;
    }  
) ;

export const updateUser = createAsyncThunk('auth/updateUser',
    async(form, thunkAPI) => {
        try {
            return await authService.updateUser(form) ;
        } catch(error) {
            const message = error.response.data ;
            return thunkAPI.rejectWithValue(message.toString());
        }
    }
);

export const forgotPassword = createAsyncThunk('auth/forgotPassword',
    async(email, thunkAPI) => {
        try {
            return await authService.forgotPassword(email);
        } catch (error) {
            const message = error.response.data;
            return thunkAPI.rejectWithValue(message.toString());
        }
    }    
);

export const getEmployees = createAsyncThunk('auth/getEmployees', 
    async(_, thunkAPI) => {
        try {
            return await authService.getEmployees();
        } catch (error) {
            const message = error.response.data;
            return thunkAPI.rejectWithValue(message.toString());            
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
            state.isQuestionDone = false
            state.isUpdateDone = null
            state.forgotPasswordSent = false
            state.employees = []
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
            .addCase(sendQuestion.fulfilled, (state, action) => {
                state.isLoading = false
                state.isQuestionDone = true
                state.isError = false
            })
            .addCase(sendQuestion.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(sendQuestion.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.isLoading = false
                state.isUpdateDone = true
                state.isError = false
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateUser.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.isLoading = false
                state.forgotPasswordSent = true
                state.isError = false
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(forgotPassword.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getEmployees.fulfilled, (state, action) => {
                state.isLoading = false
                state.employees = action.payload
                state.isError = false
            })
            .addCase(getEmployees.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(getEmployees.pending, (state, action) => {
                state.isLoading = true
            })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer
