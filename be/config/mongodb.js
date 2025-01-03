import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/e-commerce`);
        console.log("Successfully connected to mongoDB")    
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}
export default connectDB