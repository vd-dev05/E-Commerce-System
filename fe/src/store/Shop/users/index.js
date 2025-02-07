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
            header: {
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
export const getCoinPaypal = createAsyncThunk('getCoinPaypal', async () => {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/getcoin-paypal`,
        {
            withCredentials: true,

        }
    )
    return response.data
})

export const editProfile = createAsyncThunk('editProfile', async (data) => {
    const response = await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/edit-profile`, data, {
        withCredentials: true,
    })
    return response.data
})
export const getCoinTransaction = createAsyncThunk('getCoinTransaction', async () => {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/get-coin-transaction`, {
        withCredentials: true,
    })
    return response.data
})
export const createAddress = createAsyncThunk('createAddress', async ({search}) => {
    // console.log(search);
    
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/address`, search, {
        withCredentials: true,
    })
    return response.data
})

export const getAlladdress = createAsyncThunk('/getAlladdress',
    async (rejectWithValue) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/address_all`,
                {
                    withCredentials: true,
                }
            )
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)

export const createSearch =  createAsyncThunk('/createSearch',
    async (data) => {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/search/create`, data, {
            withCredentials: true,
        })
        return response.data
    }
)

export const getSearch =  createAsyncThunk('/getSearch',
    async () => {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/search`, {
            withCredentials: true,
        })
        return response.data
    }
)
export const editAddress = createAsyncThunk('/editAddress', async (data) => {
    const response = await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/address/${data.userId}`, {

        address: data?.data?.address,
        name: data?.data?.name,
        phone: data?.data?.phone,
        is_default: data?.data?.is_default,
        status: data?.data?.status
    }, {
        withCredentials: true,
    })
    return response.data
})
export const getVoucher = createAsyncThunk('/getVoucher', async () => {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/voucher`, {
        withCredentials: true,
    })
    return response.data
})

export const postQueryProduct = createAsyncThunk('/postQueryProduct', async (data) => {
    // console.log(data);
    
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/products?query=${data}`, {
        withCredentials: true,
    })
    return response.data
})
export const getProductById = createAsyncThunk('/getProductById', async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/products/${id}`, {
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
        isSuccessCoin: false,
        coinUpdate: null,
        isSuccesEdit: false,
        coinTransaction: null,
        isTransaction: false,
        isAddress: false,
        isUpdateAddress: false,
        addressMessageUpdate : null,
        addressMessage: null,
        addressPaydata: null,
        isSearch : false,
        payloadSearch : null,
        isActiveVoucher : false,
        payloadVoucher : null,
        isProducts : false,
        payloadProducts : null,
        items: [],
        cartIndex : 0
    },
    reducers: {
        setProduct: (state, action) => { },
        addToCart: (state, action) => {
            state.items.push(action.payload);
            state.cartIndex += 1
            // state.totalPrice += action.payload.price;
            // state.isCartEmpty = false;
            // Lưu trữ state vào localStorage
            // localStorage.setItem('cart', JSON.stringify(state));
          },
        removeToCart : (state,action) => {
            if (state.cartIndex === 0) {
                    return 
            } else {
                state.cartIndex -= 1;
            }        
          
        }
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
            .addCase(orderCoinPayPal.pending, (state) => { state.isLoading = true, state.isSuccessCoin = false })
            .addCase(orderCoinPayPal.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload?.success === true) {
                    state.isSuccessCoin = true
                    state.coinUpdate = action.payload.data.user.coin

                }

            })
            .addCase(orderCoinPayPal.rejected, (state) => { state.isLoading = false })
        builder
            .addCase(getCoinPaypal.pending, (state) => { state.isLoading = true, state.isSuccessCoin = false })
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
            .addCase(editProfile.rejected, (state) => { state.isSuccesEdit = false })
        builder
            .addCase(getCoinTransaction.pending, (state) => { state.isLoading = false, state.isTransaction = false })
            .addCase(getCoinTransaction.fulfilled, (state, action) => {
                state.isLoading = false
                state.coinTransaction = action.payload
                state.isTransaction = true
            })
            .addCase(getCoinTransaction.rejected, (state) => { state.isLoading = false, state.isTransaction = false })
        builder
            .addCase(createAddress.pending, (state) => { state.isAddress = false, state.addressMessage = null })
            .addCase(createAddress.fulfilled, (state, action) => {
                state.isAddress = true
            })
            .addCase(createAddress.rejected, (state) => { state.isAddress = false, state.addressMessage = null })
        builder
            .addCase(getAlladdress.pending, (state) => { state.isAddress = false, state.addressMessage = null, state.addressPaydata = null })
            .addCase(getAlladdress.fulfilled, (state, action) => {
                state.isAddress = true;
                state.addressPaydata = action.payload.address
                state.addressMessage = action.payload.message
            })
            .addCase(getAlladdress.rejected, (state, action) => {
                state.isAddress = false;
                state.addressMessage = action.payload || "An error occurred.";
            })
        builder
            .addCase(editAddress.pending, (state) => { state.isUpdateAddress = false, state.addressMessageUpdate = null })
            .addCase(editAddress.fulfilled, (state, action) => {
                state.isUpdateAddress = true,
                    state.addressMessageUpdate = action.payload.message
            })
            .addCase(editAddress.rejected, (state) => { state.isUpdateAddress = false, state.addressMessageUpdate = action.payload || "An error occurred." })
        builder 
            .addCase(createSearch.pending, (state) => { state.isSearch = false })
            .addCase(createSearch.fulfilled, (state, action) => {
                state.isSearch = true
            })
            .addCase(createSearch.rejected, (state) => { state.isSearch = false })
        builder
            .addCase(getSearch.pending, (state) => { state.isSearch = false })
            .addCase(getSearch.fulfilled, (state, action) => {
                state.isSearch = true
                state.payloadSearch = action?.payload?.search
            })
            .addCase(getSearch.rejected, (state) => { state.isSearch = false })
        builder
            .addCase(postQueryProduct.pending, (state) => { state.isProducts = false , state.payloadProducts = null})
            .addCase(postQueryProduct.fulfilled, (state, action) => {
                state.isProducts = true
                state.payloadProducts = action?.payload?.products
                // console.log(action.payload);
                
            })
            .addCase(postQueryProduct.rejected, (state) => { state.isProducts = false , state.payloadProducts = null})
        builder
            .addCase(getProductById.pending, (state) => { state.isProducts = false , state.payloadProducts = null})
            .addCase(getProductById.fulfilled, (state, action) => {
                state.isProducts = true
                state.payloadProducts = action?.payload?.products

            })
            .addCase(getProductById.rejected, (state) => { state.isProducts = false , state.payloadProducts = null})
        }

})

export const { setProduct, addToCart, removeToCart } = shoppingProduct.actions
export default shoppingProduct.reducer
