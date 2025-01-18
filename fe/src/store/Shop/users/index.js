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
const shoppingProduct = createSlice({
    name: 'shoppingProduct',
    initialState: {
        isLoading: true,
        routeData: null,
        avatar: null
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
    }
})

export const { setProduct } = shoppingProduct.actions
export default shoppingProduct.reducer