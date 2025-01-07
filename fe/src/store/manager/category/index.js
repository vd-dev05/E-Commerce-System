import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const backendUrl = 'http://localhost:5000';

export const createCategory = createAsyncThunk('/createCategory',
    async (formData) => {
        try {
            const response = await axios.post(`${backendUrl}/api/v1/manager/category/create`,
                formData
            )
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
)

const managerCategorySlice = createSlice({
    name: 'managerCategory',
    initialState: {
        isLoading: false,
        categoryItems: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createCategory.pending, (state) => {
            state.isLoading = true
        }).addCase(createCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categoryItems.push(action.payload.data);
        }).addCase(createCategory.rejected, (state) => {
            state.isLoading = false;
        })
    }
})

export default managerCategorySlice.reducer