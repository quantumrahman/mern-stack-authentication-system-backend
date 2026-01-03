// import module ------------------------------------------->
import User from '../models/user.model.js';
import AppError from '../utils/constants/app.error.js';
import AppResponse from '../utils/constants/app.response.js';
import generateJwtToken from '../utils/generator/token.generator.js';
import nameFormatter from '../utils/functions/name.formatter.func.js';
import generateHashPwd from '../utils/generator/hashpwd.generator.js';

// sign-up controller -------------------------------------->
export const signUpController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedEmail) {
            throw new AppError('Invalid email address.', {
                success: false,
                status: 400,
                code: 'INVALID_EMAIL',
            });
        }

        const existingUser = await User.findOne({ email: normalizedEmail });

        if (existingUser) {
            throw new AppError('User already registered!', {
                success: false,
                status: 409,
                code: 'USER_ALREADY_EXISTS',
            });
        }

        const formattedName = nameFormatter(name);
        const hashedPwd = await generateHashPwd(password);

        const createUser = await User.create({
            name: formattedName,
            email: normalizedEmail,
            password: hashedPwd,
        });

        try {
            const token = generateJwtToken({
                id: String(createUser._id),
                email: createUser.email,
            });

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite:
                    process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
                maxAge: 10 * 24 * 60 * 60 * 1000,
            });
        } catch (error) {
            next(error);
        }

        return res.status(201).json(
            new AppResponse('User register successfully.', {
                success: true,
                status: 201,
                code: 'REGISTER_SUCCESSFULLY',
                data: {
                    user: {
                        id: createUser._id,
                        name: createUser.name,
                    },
                },
            })
        );
    } catch (error) {
        return next(error);
    }
};
