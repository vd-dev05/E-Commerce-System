import { configureStore } from "@reduxjs/toolkit";
import shoppingAuthSlice from '../store/Shop/auth'
import managerAuthSlice from '../store/manager/auth'
import adminSlice from '../store/admin/index.js'

const store = configureStore({
    reducer: {
        shoppingAuth: shoppingAuthSlice,
        managerAuth: managerAuthSlice,
        adminAuth : adminSlice
    }
})

export default store