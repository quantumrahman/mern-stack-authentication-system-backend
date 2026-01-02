// import module ------------------------------------------->
import AppError from '../utils/constants/app.error.js';

// validator middleware ------------------------------------>
const validatorMiddleware = (schema) => async (req, res, next) => {
    const result = await schema.safeParseAsync(req.body);

    if (!result.success) {
        const { fieldErrors } = result.error.flatten();

        return next(
            new AppError('Validation Error.', {
                success: result.success,
                status: 400,
                code: 'VALIDATION_ERROR',
                details: Object.entries(fieldErrors).map(
                    ([field, message]) => ({
                        field: field,
                        message: message[0],
                    })
                ),
            })
        );
    }

    req.body = result.data;
    return next();
};

// export module ------------------------------------------->
export default validatorMiddleware;
