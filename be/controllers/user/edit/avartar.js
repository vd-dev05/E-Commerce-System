import { imageUploadUser } from "../../../config/cloundAvartar.js"
import { ErrorNotFoundResponse } from "../../../error/errorResponse.js"
import UserModel from "../../../models/auth/userModel.js";

const AvartarController = async (req, res) => {
    try {

        const file = req.file;
        const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
        const fileName = file.originalname.split('.')[0];

        const data = await imageUploadUser(dataUrl, fileName)
        const user = await UserModel.findByIdAndUpdate(req.user.id, { avartar: data.url })
        if (user) {
            res.status(200).json({
                success: true,
                avartar: data.url
            })
        }

    } catch (error) {
        ErrorNotFoundResponse(res, error)

    }
}

export default AvartarController