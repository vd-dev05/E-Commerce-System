import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const backendUrl = 'http://localhost:5000';


export const fetchAllFilteredProducts = createAsyncThunk('/products/fetchAllProducts',
    async ({ filterParams, sortParams, page = 1, limit = 12, search }) => {

        const query = new URLSearchParams({
            ...filterParams,
            sortBy: sortParams,
            page,
            limit,
            search
        })
        const response = await axios.get(backendUrl + `/api/shop/products/get?${query}`)

        return response?.data
    }
)

export const fetchProductDetails = createAsyncThunk('/products/fetchProductDetails',
    async (id) => {

        const response = await axios.get(backendUrl + `/api/shop/products/get/${id}`)

        return response?.data
    }
)



const shopProductSlice = createSlice({
    name: 'shopProducts',
    initialState: {
        isLoading: false,
        products: [],
        productDetails: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllFilteredProducts.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload.data
        }).addCase(fetchAllFilteredProducts.rejected, (state) => {
            state.isLoading = false;
            state.products = []
        }).addCase(fetchProductDetails.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchProductDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productDetails = action.payload.data
        }).addCase(fetchProductDetails.rejected, (state) => {
            state.isLoading = false;
            state.productDetails = null
        })
    }
})

export default shopProductSlice.reducer
