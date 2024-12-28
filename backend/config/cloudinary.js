import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import dotenv from "dotenv"

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const stroage = new multer.memoryStorage();

const imageUpload = async (file) => {
    const result = await cloudinary.uploader.upload(file,
        {
            resource_type: 'auto'
        }
    )
    return result
}

const upload = multer({ stroage });

export { upload, imageUpload }