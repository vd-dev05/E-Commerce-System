import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const backendUrl = 'http://localhost:5000';

export const createNewOrder = createAsyncThunk('/order/createNewOrder',
    async (orderData) => {
        const response = await axios.post(`${backendUrl}/api/shop/order/add`,
            orderData
        )
        return response.data
    }
)

export const capturePayment = createAsyncThunk('/order/capturePayment',
    async ({ paymentId, payerId, orderId }) => {
        const response = await axios.post(`${backendUrl}/api/shop/order/capture`,
            { paymentId, payerId, orderId }
        )
        return response.data
    }
)
export const getAllOrderByUser = createAsyncThunk('/order/getAllOrderByUser',
    async (userId) => {
        const response = await axios.get(`${backendUrl}/api/shop/order/list/${userId}`,

        )
        return response.data
    }
)
export const getOrderDetails = createAsyncThunk('/order/getOrderDetails',
    async (id) => {
        const response = await axios.get(`${backendUrl}/api/shop/order/details/${id}`,
        )
        return response.data
    }
)
const shopOrderSlice = createSlice({
    name: 'shopOrder',
    initialState: {
        isLoading: false,
        approvalURL: null,
        orderId: null,
        orderList: [],
        orderDetails: null

    },
    reducers: {
        resetOrderDetails: (state, action) => {
            state.orderDetails = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createNewOrder.pending, (state) => {
            state.isLoading = true
        }).addCase(createNewOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.approvalURL = action.payload.approvalURL;
            state.orderId = action.payload.orderId;
            sessionStorage.setItem('OrderId', JSON.stringify(action.payload.orderId))
        }).addCase(createNewOrder.rejected, (state) => {
            state.isLoading = false;
            state.approvalURL = null;
            state.orderId = null
        }).addCase(getAllOrderByUser.pending, (state) => {
            state.isLoading = true
        }).addCase(getAllOrderByUser.fulfilled, (state, action) => {

            state.isLoading = false;
            state.orderList = action.payload.data;
        }).addCase(getAllOrderByUser.rejected, (state) => {
            state.isLoading = false;
            state.orderList = []
        }).addCase(getOrderDetails.pending, (state) => {
            state.isLoading = true
        }).addCase(getOrderDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderDetails = action.payload.data;
        }).addCase(getOrderDetails.rejected, (state) => {
            state.isLoading = false;
            state.orderDetails = null
        })

    }
})

export const { resetOrderDetails } = shopOrderSlice.actions
export default shopOrderSlice.reducer
