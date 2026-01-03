// import module ------------------------------------------->
import User from '../models/user.model.js';
import AppError from '../utils/constants/app.error.js';
import AppResponse from '../utils/constants/app.response.js';
import generateOtp from '../utils/generator/otp.generator.js';
import generateJwtToken from '../utils/generator/token.generator.js';
import passwordCompare from '../utils/functions/compare.pwd.func.js';
import nameFormatter from '../utils/functions/name.formatter.func.js';
import generateHashPwd from '../utils/generator/hashpwd.generator.js';
import generateHashOtp from '../utils/generator/hashotp.generator.js';

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

        const userExits = await User.findOne({ email: normalizedEmail });

        if (userExits) {
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

        const token = generateJwtToken({
            id: String(createUser._id),
            email: createUser.email,
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: 10 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json(
            new AppResponse('User register successfully.', {
                success: true,
                status: 201,
                code: 'REGISTER_SUCCESSFULLY',
                data: {
                    user: {
                        id: createUser._id,
                        name: createUser.name,
                        email: createUser.email,
                    },
                },
            })
        );
    } catch (error) {
        return next(error);
    }
};

// sign-in controller -------------------------------------->
export const signInController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedEmail) {
            throw new AppError('Invalid email address.', {
                success: false,
                status: 400,
                code: 'INVALID_EMAIL',
            });
        }

        const existingUser = await User.findOne({
            email: normalizedEmail,
        }).select('+password');

        if (!existingUser) {
            throw new AppError('User not exist.', {
                success: false,
                status: 404,
                code: 'USER_NOT_FOUND',
            });
        }

        const isMatch = await passwordCompare(password, existingUser.password);

        if (!isMatch) {
            throw new AppError('Invalid email or password!', {
                success: false,
                status: 400,
                code: 'INVALID_CREDENTIALS',
            });
        }

        const token = generateJwtToken({
            id: String(existingUser._id),
            email: existingUser.email,
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: 10 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json(
            new AppResponse('User login successfully.', {
                success: true,
                status: 200,
                code: 'LOGIN_SUCCESSFULLY',
                data: {
                    user: {
                        id: existingUser._id,
                        name: existingUser.name,
                        email: existingUser.email,
                    },
                },
            })
        );
    } catch (error) {
        return next(error);
    }
};

// sign-out controller ------------------------------------->
export const signOutController = async (req, res, next) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            path: '/',
        });

        return res.status(200).json(
            new AppResponse('User logout successfully.', {
                success: true,
                status: 200,
                code: 'LOGOUT_SUCCESSFULLY',
            })
        );
    } catch (error) {
        return next(error);
    }
};

// verification otp controller ----------------------------->
export const verificationOtpController = async (req, res, next) => {
    try {
        const user = await User.findById({ _id: req.user._id });

        if (!user) {
            throw new AppError('User not found!', {
                success: false,
                status: 404,
                code: 'UNAUTHORIZED',
            });
        }

        if (user.isVerified) {
            throw new AppError('Account already verified!', {
                success: false,
                status: 400,
                code: 'ALREADY_VERIFIED',
            });
        }

        const otp = generateOtp(6);
        const hashedOTP = generateHashOtp(otp);

        user.verificationOtp = hashedOTP;
        user.verificationOtpExpAt = Date.now() + 5 * 60 * 60 * 1000;

        await user.save();

        return res.status(200).json(
            new AppResponse('Send verification otp.', {
                success: true,
                status: 200,
                code: 'SEND_OTP',
            })
        );
    } catch (error) {
        return next(error);
    }
};
