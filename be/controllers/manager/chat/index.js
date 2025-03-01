import mongoose from "mongoose";
import { ErrorNotFoundResponse } from "../../../error/errorResponse.js"
import { ChatRoomModel, MessageModel } from "../../../models/shop/chatModel.js";

const ChatManagerController = {
    sendUser: async (req, res) => {
        try {
            // const {id }= req.manager
            const { id } = req.params
            const data ={
                chat_room_id : id,
                sender_id : "6777a1eb38abf9bcc1feb941",
                sender_type : "manager",
                message : "Chao ban ban can tu van gi"
            }
            const sendChat = new MessageModel(data)
            await sendChat.save()

            res.status(201).json({sucess: true})
        } catch (error) {
            ErrorNotFoundResponse(res, error, 404)
        }
    },
    getMessageRoomAll: async (req, res) => {
        try {
            const { id } = req.params

            const chat = await MessageModel.find({ chat_room_id: id })
            
            if (chat) {
                res.status(200).json({
                    success : true, 
                    message : chat.map(({ _id, sender_id, sender_type, message, timestamp }) => ({
                        _id,
                        sender_id,
                        sender_type,
                        message,
                        timestamp
                    })),
                    roomId : id
                })
            }

        } catch (error) {
            ErrorNotFoundResponse(res, error, 404)
        }
    },
    getRoomMessageAll: async (req, res) => {
        try {

            // const id= req.manager.id
            // const id = new mongoose.Types.ObjectId("6777a1eb38abf9bcc1feb941")

            const room = await ChatRoomModel.find({ managerId: req.manager.id })
                .populate({ path: 'userId', select: "username _id avartar last_login " })
            if (room) {
                res.status(200).json({
                    success: true,
                    room
                })
            }
        } catch (error) {
            ErrorNotFoundResponse(res, error, 404)
        }
    }
}
export default ChatManagerController