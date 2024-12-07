import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const backendUrl = 'http://localhost:5000';

export const getAllOrder = createAsyncThunk('/order/getAllOrder',
    async () => {
        const response = await axios.get(`${backendUrl}/api/admin/orders/list`,

        )
        return response.data
    }
)
export const getOrderDetailsForAdmin = createAsyncThunk('/order/getOrderDetailsForAdmin',
    async ({ id, userId }) => {
        const response = await axios.get(`${backendUrl}/api/admin/orders/details/${id}`,
            {
                params: { userId },
            }
        )
        return response.data
    }
)

export const updateOrderStatus = createAsyncThunk('/order/updateOrderStatus',
    async ({ id, orderStatus }) => {
        const response = await axios.put(`${backendUrl}/api/admin/orders/update/${id}`,
            { orderStatus }
        )
        return response.data
    }
)
const adminOrderSlice = createSlice({
    name: 'adminOrder',
    initialState: {
        isLoading: false,
        orderList: [],
        orderDetails: null,
        user: null

    },
    reducers: {
        resetOrderDetails: (state, action) => {
            state.orderDetails = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllOrder.pending, (state) => {
            state.isLoading = true
        }).addCase(getAllOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderList = action.payload.data;
        }).addCase(getAllOrder.rejected, (state) => {
            state.isLoading = false;
            state.orderList = []
        }).addCase(getOrderDetailsForAdmin.pending, (state) => {
            state.isLoading = true
        }).addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.orderDetails = action.payload.data;
            state.user = action.payload.user;
        }).addCase(getOrderDetailsForAdmin.rejected, (state) => {
            state.isLoading = false;
            state.orderDetails = null
        })

    }
})

export const { resetOrderDetails } = adminOrderSlice.actions
export default adminOrderSlice.reducer
