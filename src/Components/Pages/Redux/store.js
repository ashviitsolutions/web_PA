import {configureStore} from '@reduxjs/toolkit'
// import counterSlice from './counterSlice'
import extraReducers from './productSlice';
import extraReducers1 from './productSlice';




const store = configureStore({
    reducer:{
        product: extraReducers,
        products: extraReducers1,

    },

})
export default store