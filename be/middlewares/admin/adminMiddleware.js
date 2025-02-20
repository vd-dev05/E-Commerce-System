import { UnauthorizedError } from "../../error/admin/adminError.js";
import { ErrorUnAuthorizedResponse } from "../../error/errorResponse.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
const adminMiddleware = {
    isAdmin: (req, res, next) => {
        try {
            const token = req.cookies.admin_token;
            if (!token) throw new UnauthorizedError('Unauthorised user !');
            const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);


            if (decoded.role !== 'admin') {
                return res.json({
                    success: false,
                    message: 'Unauthorised user !'
                })
            }
            next()
        } catch (error) {
            ErrorUnAuthorizedResponse(res, error)
        }
    }
}
export default adminMiddleware;