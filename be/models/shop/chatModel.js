import mongoose, { Schema } from "mongoose";


const chatRoomSchema = mongoose.Schema({
    user_id : { type: Schema.Types.ObjectId, ref: 'user' },
}, { timestamps: true })

const chatMessageSchema = mongoose.Schema({
    chat_room_id : { type: Schema.Types.ObjectId, ref: 'room' },
    sender_id : { type: Schema.Types.ObjectId, ref: ['user', 'manager'] },
    message : { type: String, required: true },
    create_at : { type: Date, default: Date.now() },
    update_at : { type: Date, default: Date.now() }
})

const ChatRoomModel = mongoose.model('room', chatRoomSchema)
const ChatMessageModel = mongoose.model('message', chatMessageSchema)


export {
    ChatRoomModel,
    ChatMessageModel
}