import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import invoiceService from "./invoiceService";

const initialState = {
    invoice: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}

export const createInvoice = createAsyncThunk('invoice/createInvoice', 
    async(file, user, thunkAPI) => {

        try {
            return await invoiceService.createInvoice(file)
        } catch(error) {
            const message = (error.response.data) 
            return thunkAPI.rejectWithValue(message)       
        }
})

export const invoiceSlice = createSlice({
    name:'invoice',
    initialState,
    reducers: {
        reset: (state) => {
            state.invoice = {}
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
        }
    },
    extraReducers(builder) {
        builder
            .addCase(createInvoice.pending,  (state) =>{
                state.isLoading = true
            }) 
            .addCase(createInvoice.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createInvoice.fulfilled, (state, action) => {
                state.isLoading = false
                state.invoice = action.payload
                state.isSuccess = true
            })
    }
})


export const { reset } = invoiceSlice.actions
export default invoiceSlice.reducer
