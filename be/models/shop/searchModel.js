import mongoose, { Schema } from "mongoose"

const searchSchema = mongoose.Schema({
    userId : { type: Schema.Types.ObjectId, ref: 'user' },
    search : { type: String },
    status : {type : Boolean, default : false},
}, { timestamps: true })

const Search = mongoose.model('search', searchSchema)

export default Search