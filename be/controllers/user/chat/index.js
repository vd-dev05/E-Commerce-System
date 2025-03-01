import { ErrorNotFoundResponse } from '../../../error/errorResponse.js'
import { ChatRoomModel, MessageModel } from '../../../models/shop/chatModel.js';
const ChatManager = {
    createRoomId: async (req, res) => {
        try {
            const { receiverId } = req.body
            const { id } = req.params
            const checkRoom = await ChatRoomModel.findOne({ userId: req.user.id, managerId: id });
            console.log(checkRoom);
            
            
            if (checkRoom ||  checkRoom !== null) {
                res.status(200).json({ message: "phong ton tai", success: false });
            } else {
                const createRoom = new ChatRoomModel({
                    receiverId,
                    userId: req.user.id,
                    managerId: id
                });

                const createChat = new MessageModel({
                    chat_room_id: createRoom._id,
                    sender_id: req.user.id,
                    sender_type: "user",
                    message: "hello Shop. Bạn có thể tư vấn tôi được không?"
                });

                const data = await Promise.all([createRoom.save(), createChat.save()]);
                if (data) {
                    res.status(201).json({
                        message : "Create room successfull",
                        success : true,
                        data
                    })
                }
            }
          



        } catch (error) {
            ErrorNotFoundResponse(res, error.message = "Create Room  failed");
        }
    },
    getRoomListId : async (req,res) => {
        try {
           const room  = await ChatRoomModel.find({userId : req.user.id})
            .populate({ path: "managerId", select: "manager_name _id logo" })
        
           if (room) {
            res.status(200).json({
                message : "get room successfull",
                success : true,
                room
            })
           }
        } catch (error) {
            ErrorNotFoundResponse(res, error);
        }
    },
    getMessageId : async (req, res) => {
        try {
            const {id} = req.params
            const chat = await MessageModel.find({chat_room_id : id})
           
            if (chat) {
                res.status(200).json({
                    success : true,
                    message : chat.map(({ _id, sender_id, sender_type, message, timestamp }) => ({
                        _id,
                        sender_id,
                        sender_type,
                        message,
                        timestamp
                    })) ,
                    roomId : id
                })
            }
            
            
        } catch (error) {
            ErrorNotFoundResponse(res, error);
        }
    },
    createMessageList  :async (req,res) => {
        try {
    
            // const {id} = req.params
            const message = req.body
            
            
            const existingMessages = await MessageModel.find();
          
            const filteredMessages = message.filter(newMsg => !existingMessages.some(existingMsg => existingMsg._id.toString() === newMsg._id));
        
            if (filteredMessages.length === 0) {
                res.status(200).json({
                    message : "message is exist",
                    success : false
                })
            } else {
                const insertedMessages = await MessageModel.insertMany(filteredMessages);
                if (insertedMessages.length > 0) {
                    res.status(201).json({
                        message: "Messages created successfully",
                        success: true,
                        data: insertedMessages
                    });
                } else {
                    res.status(500).json({
                        message: "Failed to insert messages",
                        success: false
                    });
                }
                
            }
        
        } catch (error) {
            ErrorNotFoundResponse(res, error);   
        }
    }
}

export default ChatManager