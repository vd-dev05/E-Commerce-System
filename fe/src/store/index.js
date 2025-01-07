import { configureStore } from "@reduxjs/toolkit";
import shoppingAuthSlice from '../store/Shop/auth'
import managerAuthSlice from '../store/manager/auth'
import managerCategorySlice from '../store/manager/category'
import adminSlice from '../store/admin/index.js'

const store = configureStore({
    reducer: {
        shoppingAuth: shoppingAuthSlice,
        managerAuth: managerAuthSlice,
        managerCategory: managerCategorySlice,
        adminAuth: adminSlice
    }
})

export default store