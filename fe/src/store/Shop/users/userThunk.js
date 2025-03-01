import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit"

export const createOrderPaymentSepay = createAsyncThunk('/createOrderPaymentSepay', async (data) => {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_PAYMENT_SEPAY}/payment/list?code=${data}`, {} , {
        withCredentials: true,
    })
    console.log(response);
    
    return response.data
})

export const addMessageChat = createAsyncThunk('/addMessageChat', async ({roomId, message}) => {
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/chat/${roomId}/list`, message, {
        withCredentials: true,
    })
    return response.data
})

export const getMessageChat = createAsyncThunk('/getMessageChat', async ({roomId}) => {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/chat/${roomId}/roomId`, {
        withCredentials: true,
    })
    return response.data
})

export const getRoomChat = createAsyncThunk('/room', async () => {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/room`, {
        withCredentials: true,
    })
    return response.data
})

export const addProductFavorite = createAsyncThunk('/addProductFavorite', async (id) =>{
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/favorite/like/${id}`, {} , {
        withCredentials: true,
    })
    return response.data
})

export const removeProductFavorite = createAsyncThunk('/removeProductFavorite', async (id) =>{
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/favorite/unlike/${id}`, {} , {
        withCredentials: true,
    })
    return response.data
})

export const getVoucherPromotion = createAsyncThunk('/getVoucherPromotion', async () => {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/voucher/promotion`, {
        withCredentials: true,
    })
    return response.data
})

export const getQueryCategoryProduct = createAsyncThunk('/getQueryCategoryProduct', async (data) => {
    const encode = encodeURIComponent(JSON.stringify(data))

    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/products/category?query=${encode}`, {
        withCredentials: true,
    })
    return response.data
})

export const recommendProduct = createAsyncThunk('/recommendProduct', async (data) => {
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/recommend/list`, data, {
        withCredentials: true,
    })
    return response.data
} )

export const getOrderPaymentProcess = createAsyncThunk('/getOrderPaymentProcess', async () => {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/products/process`, {
        withCredentials: true,
    })
    return response.data
} )

export const editPaymentOrder = createAsyncThunk('/editPaymentOrder', async ({ id, data }) => {
   
    
    const response = await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/products/order/${id}`, data, {
        withCredentials: true,
    })
    return response.data
})

export const  getOrderProductId = createAsyncThunk('/getOrderProductId' , async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/products/get-order/${id}`,
        {
            withCredentials: true,
        }
    )
    return response.data
})

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
export const createAddress = createAsyncThunk('createAddress', async ({ search }) => {
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
export const createSearch = createAsyncThunk('/createSearch',
    async (data) => {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/search/create`, data, {
            withCredentials: true,
        })
        return response.data
    }
)
export const getSearch = createAsyncThunk('/getSearch',
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
export const addToCartProduct = createAsyncThunk('addToCartProduct', async (data) => {
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/cart/add`, data, {
        withCredentials: true,
    })
    return response.data
})
export const getToCartProduct = createAsyncThunk('getToCartProduct', async () => {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/cart`, {
        withCredentials: true,
    })
    return response.data
})
export const removeToCartProduct = createAsyncThunk('/removeToCartProduct', async (data) => {
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/cart/1`, data, {
        withCredentials: true,
    })
    return response.data
})
export const removeAllCart = createAsyncThunk('removeAllCart', async () => {
    const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/cart/all`, {
        withCredentials: true,
    })
    return response.data
})
export const createOrder = createAsyncThunk('/createOrder', async (data) => {
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/products/create-order`, data, {
        withCredentials: true,
    })
    return response.data
})