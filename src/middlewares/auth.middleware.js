// import module ------------------------------------------->
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import AppError from '../utils/constants/app.error.js';

// auth middleware ----------------------------------------->
const authMiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            throw new AppError('Token missing.', {
                success: false,
                status: 401,
                code: 'UNAUTHORIZED',
            });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken) {
            throw new AppError('Invalid or expired token.', {
                success: false,
                status: 401,
                code: 'UNAUTHORIZED',
            });
        }

        const user = await User.findById({ _id: decodedToken.id });

        if (!user) {
            throw new AppError('User not found!', {
                success: false,
                status: 404,
                code: 'USER_NOT_FOUND',
            });
        }

        req.user = user;

        next();
    } catch (error) {
        return next(error);
    }
};

// export module ------------------------------------------->
export default authMiddleware;
