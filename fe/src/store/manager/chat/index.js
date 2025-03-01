import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
export const   getRoomAll = createAsyncThunk('/getRoomAll', async () => {
    const response = await axios.get(`${backendUrl}/api/v1/manager/room/all`, {
        withCredentials: true,
    })
    return response.data
})
export const getMessageRoomId = createAsyncThunk('/getMessageRoomId', async (roomId) => {
    const response = await axios.get(`${backendUrl}/api/v1/manager/message/${roomId}`, {
        withCredentials: true,
    })
    return response.data
})
export const createMessage = createAsyncThunk('/createMessage', async (data) => {
    const response = await axios.post(`${backendUrl}/api/v1/manager/room/message/${data.roomId}`, data.message, {
        withCredentials: true,
    })
    return response.data
})
const managerChatSlice = createSlice({
    name: 'managerChat',
    initialState: {
        
        isLoading: true,
       
        isLoadingRoom : false,
        roomId : null,
        roomList : null,
        isLoadingMessageList : false,
        messageList : null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getRoomAll.pending, (state) => {
            state.isLoadingRoom = true;
        })
        builder.addCase(getRoomAll.fulfilled, (state, action) => {
            state.isLoadingRoom = false;
            state.roomList = action.payload.room;
            // console.log(action.payload);
            if (action.payload.success === false && action.payload.message === "jwt expired") {
                state.roomList = "false"
            }
        })
        builder.addCase(getRoomAll.rejected, (state) => {
            state.isLoadingRoom = false
        })    
        
        builder.addCase(getMessageRoomId.pending, (state) => {
            state.isLoadingMessageList = true;
        })
        builder.addCase(getMessageRoomId.fulfilled, (state, action) => {
            state.isLoadingMessageList = false;
            state.messageList = action.payload.message;
            // console.log(action.payload);
            
        })
        builder.addCase(getMessageRoomId.rejected, (state) => {
            state.isLoadingMessageList = false
        })


    }
})

export const { } = managerChatSlice.actions;
export default managerChatSlice.reducer