import { imageUploadUser } from "../../../config/cloundAvartar.js"
import { ErrorNotFoundResponse } from "../../../error/errorResponse.js"

const AvartarController = async (req,res) => {
    try {
    
        const file = req.file;
        const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
        const fileName = file.originalname.split('.')[0];

        const data = await  imageUploadUser( dataUrl,fileName) 
        console.log(data);
        
        // res.json({url}) 
    } catch (error) {
        ErrorNotFoundResponse(res, error)
        
    }
}

export default AvartarController