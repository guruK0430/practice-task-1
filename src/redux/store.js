import { configureStore } from '@reduxjs/toolkit'

import { cartReducer } from './reducers/Cart'


const store = configureStore({
    reducer:{
        cartProducts: cartReducer,
    }
})

export default store