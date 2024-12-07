import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.json({
        success: false,
        message: 'Unauthorised user !'

    })
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next()
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

export { authMiddleware }