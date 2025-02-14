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
        const response = await axios.delete(`${backendUrl}/api/v1/admin/delete-user/${id}` ,{
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

export const getBlockUser = createAsyncThunk('/getBlockUser',
    async () => {
        const response = await axios.get(`${backendUrl}/api/v1/admin/block-users`, {
            withCredentials: true,
        })
        return response.data
    }
)

export const editBlockUser = createAsyncThunk('/editBlockUser',
    async (id) => {
        const response = await axios.put(`${backendUrl}/api/v1/admin/unblock-user/${id}`, {}, {
            withCredentials: true,
        })
        return response.data  
    }
)

export const getTraficDate = createAsyncThunk('/getTraficDate',
    async () => {
        const response = await axios.get(`${backendUrl}/api/v1/admin/test`, {
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
        message : null,

        isBlockUser : false,
        payloadBlockUser : null,

        isEditBlockUser : false,
        payloadEditBlockUser : null,

        isDeleteUser : false,
        payloadDeleteUser : null,

        isGetTraficUserChart  :false,
        payloadTraficUserChart : null
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

        builder.addCase(getBlockUser.pending, (state,action) => {
            state.isBlockUser = false
        }).addCase(getBlockUser.fulfilled, (state,action) => {
            state.isBlockUser = true
            state.payloadBlockUser = action?.payload?.data?.users
        }).addCase(getBlockUser.rejected, (state,action) => {
            state.isBlockUser = false;
            state.payloadBlockUser = null;
        })

        builder.addCase(editBlockUser.pending, (state,action) => {
            state.isEditBlockUser = false
        }).addCase(editBlockUser.fulfilled, (state,action) => {
            state.isEditBlockUser = true
            state.payloadEditBlockUser = action?.payload?.data?.users
        }).addCase(editBlockUser.rejected, (state,action) => {
            state.isEditBlockUser = false;
            state.payloadEditBlockUser = null;
        })

        builder.addCase( deleteUser.pending, (state,action) => {
            state.isDeleteUser = false
        }).addCase( deleteUser.fulfilled, (state,action) => {
            state.isDeleteUser = true
            state.payloadDeleteUser = action?.payload?.data?.users
        }).addCase( deleteUser.rejected, (state,action) => {
            state.isDeleteUser = false;
            state.payloadDeleteUser = null;
        })
        builder.addCase( getTraficDate.pending, (state,action) => {
            state.isGetTraficUserChart = false
        }).addCase( getTraficDate.fulfilled, (state,action) => {
            state.isGetTraficUserChart = true
            state.payloadTraficUserChart = action?.payload?.data
            // console.log(action?.payload?.data);
            
        }).addCase( getTraficDate.rejected, (state,action) => {
            state.isGetTraficUserChart = false;
            state.payloadTraficUserChart = null;
        })
    }
})

export const {setData } = adminSlice.actions;
export default adminSlice.reducer