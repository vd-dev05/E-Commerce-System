import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const backendUrl = 'http://localhost:5000';


export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts',
    async () => {
        const response = await axios.get(backendUrl + '/api/admin/products/list')

        return response?.data
    }
)

export const createProduct = createAsyncThunk('/products/createProduct',
    async (formData) => {
        const response = await axios.post(backendUrl + '/api/admin/products/create', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response?.data
    }
)

export const updateProduct = createAsyncThunk('/products/updateProduct',
    async ({ id, formData }) => {
        const response = await axios.put(backendUrl + `/api/admin/products/update/${id}`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response?.data
    }
)

export const removeProduct = createAsyncThunk('/products/removeProduct',
    async (id) => {
        const response = await axios.delete(backendUrl + `/api/admin/products/delete/${id}`)

        return response?.data
    }
)


const adminProductSlice = createSlice({
    name: 'adminProducts',
    initialState: {
        isLoading: false,
        products: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload.data
        }).addCase(fetchAllProducts.rejected, (state) => {
            state.isLoading = false;
            state.products = []
        })
    }
})

export default adminProductSlice.reducer
