import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './usercontext/userSlice.js'

const persistConfig = {
    key : 'auth',
    storage
}

const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
    reducer:{
        user : persistedReducer
    },
    middleware : (getDefaultMiddleware ) => getDefaultMiddleware({
        serializableCheck : false
    })
})

export const persistor = persistStore(store)
