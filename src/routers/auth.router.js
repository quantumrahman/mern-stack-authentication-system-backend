// import module ------------------------------------------->
import express from 'express';
import {
    signUpController,
    signInController,
    signOutController,
    verificationOtpController,
} from '../controllers/auth.controllers.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import validationMiddleware from '../middlewares/validator.middleware.js';
import { signUpSchema, signInSchema } from '../validators/validator.schema.js';

// express router ------------------------------------------>
const router = express.Router();

// routes -------------------------------------------------->
router
    .route('/sign-up')
    .post(validationMiddleware(signUpSchema), signUpController);
router
    .route('/sign-in')
    .post(validationMiddleware(signInSchema), signInController);
router.route('/sign-out').post(signOutController);

// protected route middleware ------------------------------>
router.use(authMiddleware);

// protedted route ----------------------------------------->
router.route('/send-verification-otp').post(verificationOtpController);

// export module ------------------------------------------->
export default router;
