// import module ------------------------------------------->
import express from 'express';
import { signUpController } from '../controllers/auth.controllers.js';
import validatorSchema from '../validators/signup.validator.schema.js';
import validationMiddleware from '../middlewares/validator.middleware.js';

// express router ------------------------------------------>
const router = express.Router();

// routes -------------------------------------------------->
router
    .route('/sign-up')
    .post(validationMiddleware(validatorSchema), signUpController);

// export module ------------------------------------------->
export default router;
