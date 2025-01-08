import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const getUser = createAsyncThunk('/getUser',
    async (credential) => {
        const response = await axios.get(`${backendUrl}/api/v1/admin/get-users?page=${credential.page}&limit=${credential.limit}`, {
            withCredentials: true,
        })
        return response.data
    }
)
export const getManager = createAsyncThunk('/getManager',
    async (credential) => {
        const response = await axios.get(`${backendUrl}/api/v1/admin/get-managers?page=${credential.page}&limit=${credential.limit}`, {
            withCredentials: true,
        })
        return response.data
    }        
)
export const getTraficUser = createAsyncThunk('/getTraficUser',
    async () => {
        const response = await axios.get(`${backendUrl}/api/v1/admin/trafic-users`, {
            withCredentials: true,
        })
     
        return response.data
    }
)
export const updateUser = createAsyncThunk('/updateUser',
    async (data) => {
        const response = await axios.put(`${backendUrl}/api/v1/admin/update-user`, data, {
            withCredentials: true,
        })
        return response.data
    }
)
export const deleteUser = createAsyncThunk('/deleteUser',
    async (id) => {
        const response = await axios.delete(`${backendUrl}/api/v1/admin/delete-user/${id}`, {
            withCredentials: true,
        })
        return response.data
    }
)
export const deleteManager = createAsyncThunk('/deleteManager',
    async (id) => {
        const response = await axios.delete(`${backendUrl}/api/v1/admin/delete-manager/${id}`, {
            withCredentials: true,
        })
        return response.data
    }
)
export const updateManager = createAsyncThunk('/updateManager',
    async (data) => {
        const response = await axios.put(`${backendUrl}/api/v1/admin/update-manager`, data, {
            withCredentials: true,
        })
        return response.data  
    }

)
const adminSlice = createSlice({
    name  : 'adminAuth',
    initialState : {
        dataUser : [],
        traficUser : [],
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
        builder.addCase(getUser.pending, (state,action) => {      
            state.isLoading = true
        }).addCase(getUser.fulfilled, (state,action) => {
            state.isLoading = false;
            state.dataUser = action.payload.data;
           
            // console.log(action.payload.data);
            
        }).addCase(getUser.rejected, (state,action) => {
            state.isLoading = false;
            state.dataUser = null;
            state.dataManager = null;
        })
        // update user

        // get trafic user 
        builder.addCase(getTraficUser.pending, (state,action) => {      
            state.isLoading = true
        }).addCase(getTraficUser.fulfilled, (state,action) => {
            state.isLoading = false;
            state.traficUser = action.payload.data;
            console.log(action.payload.data);
            
        }).addCase(getTraficUser.rejected, (state,action) => {
            state.isLoading = false;
            state.traficUser = null;
        })

        // get manager
        builder.addCase(getManager.pending, (state,action) => {      
            state.isLoading = true
        }).addCase(getManager.fulfilled, (state,action) => {
            state.isLoading = false;
            state.dataManager = action.payload.data;
        }).addCase(getManager.rejected, (state,action) => {
            state.isLoading = false;
            state.dataManager = null;
        })
    }
})

export const {setData } = adminSlice.actions;
export default adminSlice.reducer