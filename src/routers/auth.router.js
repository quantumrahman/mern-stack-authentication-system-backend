// import module ------------------------------------------->
import express from 'express';
import {
    signUpController,
    signInController,
    signOutController,
} from '../controllers/auth.controllers.js';
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

// export module ------------------------------------------->
export default router;
