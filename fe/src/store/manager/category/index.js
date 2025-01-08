import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const backendUrl = 'http://localhost:5000';

export const createCategory = createAsyncThunk('/createCategory',
    async (formData) => {
        try {
            const response = await axios.post(`${backendUrl}/api/v1/manager/category/create`,
                formData
            )
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
)

export const fetchCategory = createAsyncThunk('/fetchCategory',
    async (managerId) => {
        try {
            const response = await axios.get(`${backendUrl}/api/v1/manager/category/list/${managerId}`)

            return response.data
        } catch (error) {
            console.log(error);
        }
    }
)
export const deleteCategory = createAsyncThunk('/deleteCategory',
    async ({ managerId, code }) => {
        try {
            const response = await axios.delete(`${backendUrl}/api/v1/manager/category/delete`, {
                data: { managerId, code }
            })
            return response.data
        } catch (error) {
            console.log(error);
        }
    }
)

export const updateCategory = createAsyncThunk('/deleteCategory',
    async (formData) => {
        try {
            const response = await axios.put(`${backendUrl}/api/v1/manager/category/update`,
                formData
            )
            return response.data
        } catch (error) {
            console.log(error);
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
            if (action.payload?.success) {
                state.categoryItems.push(action.payload.data);
            }
        }).addCase(createCategory.rejected, (state) => {
            state.isLoading = false;
        }).addCase(fetchCategory.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categoryItems = action.payload?.data || []
        }).addCase(fetchCategory.rejected, (state) => {
            state.isLoading = false;
            state.categoryItems = []
        })
    }
})

export default managerCategorySlice.reducer