import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const registerUser = createAsyncThunk('/registerUser',
    async (formData) => {
        const response = await axios.post(`${backendUrl}/api/v1/auth/register`, formData,
            {
                withCredentials: true,

            }
        )
        return response.data
    }
)
export const loginUser = createAsyncThunk('/loginUser',
    async (formData) => {
        const response = await axios.post(`${backendUrl}/api/v1/auth/login`, formData,
            {
                withCredentials: true,

            }
        )
        return response.data
    }
)

export const checkAuthUser = createAsyncThunk('/checkAuthUser',
    async () => {
        const response = await axios.get(`${backendUrl}/api/v1/auth/check-auth`,
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
export const logoutUser = createAsyncThunk('/logoutUser',
    async () => {
        const response = await axios.post(`${backendUrl}/api/v1/auth/logout`, {},
            {
                withCredentials: true,
            }
        )
        return response.data
    }
)
export const checkPassword = createAsyncThunk('/passwordCompare',
    async ({password}, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${backendUrl}/api/v1/users/check-password`, {password},
                {
                    withCredentials: true,
                    headers: {
                        "Cache-Control":
                            "no-store, no-cache, must-revalidate, proxy-revalidate",
                    },
                }
            )
           
            
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message)
        }
   
    }
)
export const changePassword = createAsyncThunk('/changePassword',
    async ({newPassword}, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${backendUrl}/api/v1/users/edit-password`, {newPassword},
                {
                    withCredentials: true,
                    headers: {
                        "Cache-Control":
                            "no-store, no-cache, must-revalidate, proxy-revalidate",
                    },
                }
            )
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message)
        }   
    }
)

const shoppingAuthSlice = createSlice({
    name: 'shoppingAuth',
    initialState: {
        isAuthenticated: false,
        isLoading: true,
        user: null,
        checkpassMessage : null,
        isMessage : true,
        isNewPassword : false
    },
    reducers: {
        setUser: (state, action) => { },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false
        }).addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false
        }).addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user : null;
            state.isAuthenticated = action.payload.success;
        }).addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        }).addCase(checkAuthUser.pending, (state) => {
            state.isLoading = true
            state.isAuthenticated = false
        }).addCase(checkAuthUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user : null;
            state.isAuthenticated = action.payload.success;
        }).addCase(checkAuthUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false
        }).addCase(logoutUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false
        }).addCase(checkPassword.pending, (state) => {
            state.isMessage = true
            state.checkpassMessage = null
        }).addCase(checkPassword.fulfilled, (state, action) => {
            state.isMessage = false;
            state.checkpassMessage = action.payload.message
        }).addCase(checkPassword.rejected, (state, action) => {
            state.isMessage = false;
            state.checkpassMessage = action.payload
            
        }).addCase(changePassword.pending, (state) => {
            state.isNewPassword = true
        }).addCase(changePassword.fulfilled, (state, action) => {
            state.isNewPassword = false
        }).addCase(changePassword.rejected, (state, action) => {
            state.isNewPassword = true
        })
    }
})

export const { setUser } = shoppingAuthSlice.actions;
export default shoppingAuthSlice.reducer