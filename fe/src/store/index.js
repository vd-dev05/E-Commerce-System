import { configureStore } from "@reduxjs/toolkit";
import shoppingAuthSlice from '../store/Shop/auth'
import managerAuthSlice from '../store/manager/auth'


const store = configureStore({
    reducer: {
        shoppingAuth: shoppingAuthSlice,
        managerAuth: managerAuthSlice,
    }
})

export default store