import { configureStore } from "@reduxjs/toolkit";
import shoppingAuthSlice from '../store/Shop/auth'


const store = configureStore({
    reducer: {
        shoppingAuth: shoppingAuthSlice
    }
})

export default store