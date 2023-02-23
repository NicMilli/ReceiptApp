import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import invoiceReducer from '../features/invoice/invoiceSlice'
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage
}
const rootReducer = combineReducers({
    auth: authReducer,
    invoice: invoiceReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store);