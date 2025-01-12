import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getRouteData = createAsyncThunk('getRouteProducts', (data) => {
    return data
})

const shoppingProduct = createSlice({
    name: 'shoppingProduct',
    initialState: {
        isLoading: true,
        routeData: null,
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
    }
})

export const { setProduct } = shoppingProduct.actions
export default shoppingProduct.reducer