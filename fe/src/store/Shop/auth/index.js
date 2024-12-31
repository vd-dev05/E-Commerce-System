import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const backendUrl = 'http://localhost:5000';

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

// export const checkAuth = createAsyncThunk('/auth/checkauth',
//     async () => {
//         const response = await axios.get(backendUrl + '/api/auth/check-auth',
//             {
//                 withCredentials: true,
//                 headers: {
//                     "Cache-Control":
//                         "no-store, no-cache, must-revalidate, proxy-revalidate",
//                 },

//             }
//         )
//         return response.data
//     }
// )
// export const logoutUser = createAsyncThunk('/auth/logout',
//     async () => {
//         const response = await axios.post(backendUrl + '/api/auth/logout', {},
//             {
//                 withCredentials: true,
//             }
//         )
//         return response.data
//     }
// )

const shoppingAuthSlice = createSlice({
    name: 'shoppingAuth',
    initialState: {
        isAuthenticated: false,
        isLoading: true,
        user: null
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
            // }).addCase(checkAuth.pending, (state) => {
            //     state.isLoading = true
            // }).addCase(checkAuth.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     state.user = action.payload.success ? action.payload.user : null;
            //     state.isAuthenticated = action.payload.success;
            // }).addCase(checkAuth.rejected, (state, action) => {
            //     state.isLoading = false;
            //     state.user = null;
            //     state.isAuthenticated = false
            // }).addCase(logoutUser.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     state.user = null;
            //     state.isAuthenticated = false
        })
    }
})

export const { setUser } = shoppingAuthSlice.actions;
export default shoppingAuthSlice.reducer