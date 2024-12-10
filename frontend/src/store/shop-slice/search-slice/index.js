import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const backendUrl = 'http://localhost:5000';


export const getSearchProducts = createAsyncThunk('/products/getSearchProducts',
    async (keyword) => {
        const response = await axios.get(`${backendUrl}/api/shop/search/${keyword}`);

        return response?.data
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        isLoading: false,
        searchResults: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSearchProducts.pending, (state) => {
            state.isLoading = true
        }).addCase(getSearchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.searchResults = action.payload.data
            console.log(action);

        }).addCase(getSearchProducts.rejected, (state) => {
            state.isLoading = false;
            state.searchResults = []
        })
    }
})

export default searchSlice.reducer
