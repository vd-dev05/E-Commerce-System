import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const backendUrl = 'http://localhost:5000';

export const createProduct = createAsyncThunk('/createProduct',
    async (formData) => {
        try {
            const response = await axios.post(`${backendUrl}/api/v1/manager/products/create`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            )
            return response?.data;
        } catch (error) {
            console.log(error)
        }
    }
)
export const fetchAllProductsByManager = createAsyncThunk('/fetchAllProductsByManager',
    async (managerId) => {
        try {
            const response = await axios.get(`${backendUrl}/api/v1/manager/products/list/${managerId}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            return response?.data
        } catch (error) {
            console.log(error)
        }

    }
)
export const fetchAllProductDetailsByManager = createAsyncThunk('/fetchAllProductDetailsByManager',
    async ({ managerId, productId }) => {
        try {
            const response = await axios.get(`${backendUrl}/api/v1/manager/products/list-details/${managerId}/${productId}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            return response?.data
        } catch (error) {
            console.log(error)
        }

    }
)
export const deleteProductByManager = createAsyncThunk('/deleteProductByManager',
    async ({ managerId, productId }) => {
        try {
            const response = await axios.delete(`${backendUrl}/api/v1/manager/products/delete/${managerId}/${productId}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response?.data
        } catch (error) {
            console.log(error)
        }
    }
)

const managerProductSlice = createSlice({
    name: 'managerProduct',
    initialState: {
        isLoading: false,
        productItems: [],
        productDetails: null,
    },
    reducers: {
        resetProductDetails: (state) => {
            state.productDetails = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllProductsByManager.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchAllProductsByManager.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productItems = action.payload.data
        }).addCase(fetchAllProductsByManager.rejected, (state) => {
            state.isLoading = false;
            state.productItems = []
        }).addCase(fetchAllProductDetailsByManager.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchAllProductDetailsByManager.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productDetails = action.payload?.data
        }).addCase(fetchAllProductDetailsByManager.rejected, (state) => {
            state.isLoading = false;
            state.productDetails = null
        })
    }
})
export const { resetProductDetails } = managerProductSlice.actions
export default managerProductSlice.reducer