import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const backendUrl = 'http://localhost:5000';

export const registerManager = createAsyncThunk('/registerManager',
    async (formData) => {
        const response = await axios.post(`${backendUrl}/api/v1/manager/register`, formData,
            {
                withCredentials: true,

            }
        )
        return response.data
    }
)
export const loginManager = createAsyncThunk('/loginManager',
    async (formData) => {
        const response = await axios.post(`${backendUrl}/api/v1/manager/login`, formData,
            {
                withCredentials: true,

            }
        )
        return response.data
    }
)

export const checkAuthManager = createAsyncThunk('/checkAuthManager',
    async () => {
        const response = await axios.get(`${backendUrl}/api/v1/manager/check-auth`,
            {
                withCredentials: true,
                headers: {
                    "Cache-Control":
                        "no-store, no-cache, must-revalidate, proxy-revalidate",
                },

            }
        )
        return response.data
    }
)
export const logoutManager = createAsyncThunk('/logoutManager',
    async () => {
        const response = await axios.post(`${backendUrl}/api/v1/manager/logout`, {},
            {
                withCredentials: true,
            }
        )
        return response.data
    }
)

const managerAuthSlice = createSlice({
    name: 'managerAuth',
    initialState: {
        isAuthenticated: false,
        isLoading: true,
        manager: null
    },
    reducers: {
        setUser: (state, action) => { },
    },
    extraReducers: (builder) => {
        builder.addCase(registerManager.pending, (state) => {
            state.isLoading = true
        }).addCase(registerManager.fulfilled, (state, action) => {
            state.isLoading = false;
            state.manager = null;
            state.isAuthenticated = false
        }).addCase(registerManager.rejected, (state, action) => {
            state.isLoading = false;
            state.manager = null;
            state.isAuthenticated = false
        }).addCase(loginManager.pending, (state) => {
            state.isLoading = true;
        }).addCase(loginManager.fulfilled, (state, action) => {
            state.isLoading = false;
            state.manager = action.payload.success ? action.payload.manager : null;
            state.isAuthenticated = action.payload.success;
        }).addCase(loginManager.rejected, (state, action) => {
            state.isLoading = false;
            state.manager = null;
            state.isAuthenticated = false;
        }).addCase(checkAuthManager.pending, (state) => {
            state.isLoading = true
        }).addCase(checkAuthManager.fulfilled, (state, action) => {
            state.isLoading = false;
            state.manager = action.payload.success ? action.payload.manager : null;
            state.isAuthenticated = action.payload.success;
        }).addCase(checkAuthManager.rejected, (state, action) => {
            state.isLoading = false;
            state.manager = null;
            state.isAuthenticated = false
        }).addCase(logoutManager.fulfilled, (state, action) => {
            state.isLoading = false;
            state.manager = null;
            state.isAuthenticated = false
        })
    }
})

export const { setUser } = managerAuthSlice.actions;
export default managerAuthSlice.reducer