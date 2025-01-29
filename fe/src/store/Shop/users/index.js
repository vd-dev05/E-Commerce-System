import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getRouteData = createAsyncThunk('getRouteProducts', (data) => {
    return data
})

export const uploadAvatar = createAsyncThunk('uploadAvatar', async (file) => {
    const formData = new FormData();
    formData.append('avatar', file)
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/file-upload`,
        formData,
        {
            header :{
                'Content-Type': 'multipart/form-data'
     
            },
            withCredentials: true,

        }
    )
    return response.data
})
export const orderCoinPayPal = createAsyncThunk('orderCoinPayPal', async (data) => {
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/order/coin/paypal`,
        data,
        {
            withCredentials: true,
        }
    )
    return response.data
})
export const getCoinPaypal = createAsyncThunk('getCoinPaypal' ,async () => {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/getcoin-paypal`,
        {
            withCredentials: true,

        }
    )
    return response.data
})

export const editProfile = createAsyncThunk('editProfile' , async (data) => {
    const response = await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/edit-profile`, data, {
        withCredentials: true,
    })
    return response.data
})
export const    getCoinTransaction = createAsyncThunk('getCoinTransaction' , async () => {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/get-coin-transaction`, {
        withCredentials: true,
    })
    return response.data
})
const shoppingProduct = createSlice({
    name: 'shoppingProduct',
    initialState: {
        isLoading: true,
        routeData: null,
        avatar: null,
        isSuccessCoin : false,
        coinUpdate : null,
        isSuccesEdit : false,
        coinTransaction : null,
        isTransaction : false
    },
    reducers: {
        setProduct: (state, action) => { },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRouteData.pending, (state) => { state.isLoading = true })
            .addCase(getRouteData.fulfilled, (state, action) => {
                state.isLoading = false, 
                state.routeData = action.payload
                
            })
            .addCase(getRouteData.rejected, (state) => { state.isLoading = false })
        builder
            .addCase(uploadAvatar.pending, (state) => { state.isLoading = true })
            .addCase(uploadAvatar.fulfilled, (state, action) => {
                state.isLoading = false
                state.avatar = action.payload
            })
            .addCase(uploadAvatar.rejected, (state) => { state.isLoading = false })
        builder
            .addCase(orderCoinPayPal.pending, (state) => { state.isLoading = true , state.isSuccessCoin = false})
            .addCase(orderCoinPayPal.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload?.success === true) {
                    state.isSuccessCoin = true 
                    state.coinUpdate = action.payload.data.user.coin
                    
                }
                
            })
            .addCase(orderCoinPayPal.rejected, (state) => { state.isLoading = false })
        builder
            .addCase(getCoinPaypal.pending , (state) => { state.isLoading = true , state.isSuccessCoin = false})
            .addCase(getCoinPaypal.fulfilled, (state, action) => {
                state.isLoading = false
                state.coinUpdate = action.payload.coin
            })
            .addCase(getCoinPaypal.rejected, (state) => { state.isLoading = false })
        builder
            .addCase(editProfile.pending, (state) => { state.isSuccesEdit = false })
            .addCase(editProfile.fulfilled, (state, action) => {
                if (action.payload?.success === true) {
                    state.isSuccesEdit = true
                }
            })
            .addCase(editProfile.rejected, (state) => {state.isSuccesEdit = false })
        builder
            .addCase(getCoinTransaction.pending , (state) => { state.isLoading = false , state.isTransaction = false})
            .addCase(getCoinTransaction.fulfilled, (state, action) => {
                state.isLoading = false
                state.coinTransaction = action.payload
                state.isTransaction = true
            })
            .addCase(getCoinTransaction.rejected, (state) => { state.isLoading = false , state.isTransaction = false})
    }

})

export const { setProduct } = shoppingProduct.actions
export default shoppingProduct.reducer