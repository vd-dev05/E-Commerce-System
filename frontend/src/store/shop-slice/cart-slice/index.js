import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const backendUrl = 'http://localhost:5000';

export const addToCart = createAsyncThunk('cart/addToCart',
    async ({ userId, productId, quantity }) => {
        const response = await axios.post(`${backendUrl}/api/shop/cart/add`,
            { userId, productId, quantity }
        )
        return response.data
    }
)

export const fetchCartItems = createAsyncThunk('cart/fecthCartItems',
    async (userId) => {
        const response = await axios.get(`${backendUrl}/api/shop/cart/get/${userId}`

        )
        return response.data
    }
)

export const updateCartItem = createAsyncThunk('cart/updateCartItem',
    async ({ userId, productId, quantity }) => {
        const response = await axios.put(`${backendUrl}/api/shop/cart/update`,
            { userId, productId, quantity }
        )
        return response.data
    }
)

export const deleteCartItem = createAsyncThunk('cart/deleteCartItem',
    async ({ userId, productId }) => {
        const response = await axios.delete(`${backendUrl}/api/shop/cart/remove/${userId}/${productId}`,
            { userId }
        )
        return response.data
    }
)



const shopCartSlice = createSlice({
    name: 'shopCart',
    initialState: {
        isLoading: false,
        cartItems: []

    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addToCart.pending, (state) => {
            state.isLoading = true
        }).addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data
        }).addCase(addToCart.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = []
        }).addCase(fetchCartItems.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchCartItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data
        }).addCase(fetchCartItems.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = []
        }).addCase(updateCartItem.pending, (state) => {
            state.isLoading = true
        }).addCase(updateCartItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data
        }).addCase(updateCartItem.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = []
        }).addCase(deleteCartItem.pending, (state) => {
            state.isLoading = true
        }).addCase(deleteCartItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data
        }).addCase(deleteCartItem.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = []
        })
    }
})

export default shopCartSlice.reducer
