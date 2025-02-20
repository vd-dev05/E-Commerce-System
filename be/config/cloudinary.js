import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import dotenv from "dotenv"

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});
// console.log(cloudinary.config());


const stroage = new multer.memoryStorage();
const upload = multer({ stroage });

const imageUpload = async (file) => {
    const result = await cloudinary.uploader.upload(file,
        {
            resource_type: 'auto'
        }
    )
    return result
}

export { upload, imageUpload }