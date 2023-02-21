import {configureStore} from '@reduxjs/toolkit'
import extraReducers from './productSlice';




const store = configureStore({
    reducer:{
        product: extraReducers,

    },

})
export default store