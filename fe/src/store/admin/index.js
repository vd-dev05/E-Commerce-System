import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const getUser = createAsyncThunk('/getUser',
    async () => {
        const response = await axios.get(`${backendUrl}/api/v1/admin/get-users`, {
            withCredentials: true,
        })
        return response.data
    }
)

const adminSlice = createSlice({
    name  : 'adminAuth',
    initialState : {
        dataUser : null,
        isLoading : true,
        dataManager : null,
        message : null
    },
    reducers : {
        admin : (state,action) => {
            state.dataUser = action.payload
            state.dataManager = action.payload
            state.isLoading = false
            state.message = null
        }
    },
    extraReducers : (builder) => {
        // getUser
        builder.addCase(getUser.pending, (state) => {
            state.isLoading = true
        }).addCase(getUser.fulfilled, (state,action) => {
            state.isLoading = false;
            state.dataUser = action.payload.data.users;
           
            console.log(action.payload.data.users);
            
        }).addCase(getUser.rejected, (state,action) => {
            state.isLoading = false;
            state.dataUser = null;
            state.dataManager = null;
        })
        // update user
    }
})

export const {setData } = adminSlice.actions;
export default adminSlice.reducer