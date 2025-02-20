import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import dotenv from "dotenv"

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME_USER,
    api_key: process.env.CLOUDINARY_API_KEY_USER,
    api_secret: process.env.CLOUDINARY_SECRET_KEY_USER
});

const storage = new multer.memoryStorage();

const imageUploadUser = async (fileUrl, fileName) => {
    const result = await cloudinary.uploader.upload(fileUrl,
        {
            resource_type: 'auto',
            folder: 'avatar',
            public_id: fileName + '-' + Date.now(),
        }
    )
    return result
}

const uploadUser = multer({ storage: storage });

export { uploadUser, imageUploadUser }