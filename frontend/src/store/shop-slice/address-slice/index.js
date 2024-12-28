import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const backendUrl = 'http://localhost:5000';

export const addNewAddress = createAsyncThunk('/addresses/addNewAddress',
    async (formData) => {
        const response = await axios.post(`${backendUrl}/api/shop/address/add`,
            formData
        )
        return response.data
    }
)

export const fetchAllAddresses = createAsyncThunk('/addresses/fetchAllAddress',
    async (userId) => {
        const response = await axios.get(`${backendUrl}/api/shop/address/get/${userId}`

        )
        return response.data
    }
)

export const updateAddress = createAsyncThunk('/addresses/updateAddress',
    async ({ userId, addressId, formData }) => {
        const response = await axios.put(`${backendUrl}/api/shop/address/update/${userId}/${addressId}`,
            formData
        )
        return response.data
    }
)

export const removeAddress = createAsyncThunk('/addresses/removeAddress',
    async ({ userId, addressId }) => {
        const response = await axios.delete(`${backendUrl}/api/shop/address/remove/${userId}/${addressId}`,
        )
        return response.data
    }
)



const addressSlice = createSlice({
    name: 'shopAddress',
    initialState: {
        isLoading: false,
        addressList: []

    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addNewAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addNewAddress.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(addNewAddress.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchAllAddresses.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllAddresses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addressList = action.payload.data;
            })
            .addCase(fetchAllAddresses.rejected, (state) => {
                state.isLoading = false;
                state.addressList = [];
            });
    },
})

export default addressSlice.reducer
