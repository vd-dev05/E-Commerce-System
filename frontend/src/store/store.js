import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import adminProductSlice from './admin-slice/product-slice'
import shopProductSlice from './shop-slice/products-slice'
import shopCartSlice from './shop-slice/cart-slice'
import addressSlice from './shop-slice/address-slice'
import shopOrderSlice from './shop-slice/order-slice'
import adminOrderSlice from './admin-slice/order-slice'


const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductSlice,
        shopProducts: shopProductSlice,
        shopCart: shopCartSlice,
        shopAddress: addressSlice,
        shopOrder: shopOrderSlice,
        adminOrder: adminOrderSlice

    }
});

export default store