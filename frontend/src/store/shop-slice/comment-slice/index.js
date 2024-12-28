import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const backendUrl = 'http://localhost:5000';


export const createCommentProduct = createAsyncThunk('/comments/createCommentProduct',
    async (formData) => {
        const response = await axios.post(`${backendUrl}/api/shop/comment/add`, formData);

        return response?.data
    }
);

export const getCommentProduct = createAsyncThunk('/comments/getCommentProduct',
    async (productId) => {
        const response = await axios.get(`${backendUrl}/api/shop/comment/${productId}`);

        return response?.data
    }
);

const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        isLoading: false,
        comments: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCommentProduct.pending, (state) => {
            state.isLoading = true
        }).addCase(getCommentProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.comments = action.payload.data

        }).addCase(getCommentProduct.rejected, (state) => {
            state.isLoading = false;
            state.comments = []
        })
    }
})

export default commentSlice.reducer
