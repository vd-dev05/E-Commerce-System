import mongoose, { Schema } from "mongoose";


// const chatRoomSchema = mongoose.Schema({
//     user_id : { type: Schema.Types.ObjectId, ref: 'user' },
// }, { timestamps: true })

// const chatMessageSchema = mongoose.Schema({
//     chat_room_id : { type: Schema.Types.ObjectId, ref: 'room' },
//     sender_id : { type: Schema.Types.ObjectId, ref: ['user', 'manager'] },
//     message : { type: String, required: true },
//     create_at : { type: Date, default: Date.now() },
//     update_at : { type: Date, default: Date.now() }
// })
const roomModel = mongoose.Schema({
    receiverId : {type : String , require : true },
    userId : {type: Schema.Types.ObjectId , ref : 'user'  },
    managerId :  {type: Schema.Types.ObjectId , ref : 'manager' }
}, {timestamp : true})
const messageSchema = mongoose.Schema({
    chat_room_id : { type: Schema.Types.ObjectId, ref: 'room' },
    sender_id : { type: Schema.Types.ObjectId, refPath: ['user', 'manager'] },
    sender_type: { 
        type: String, 
        enum: ['user', 'manager'],
        required: true 
    },
    message : { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
})

const MessageModel = mongoose.model('msg', messageSchema)
const ChatRoomModel = mongoose.model('room', roomModel)
// const ChatMessageModel = mongoose.model('message', chatMessageSchema)


export {
    ChatRoomModel,
    // ChatMessageModel,
    MessageModel
}