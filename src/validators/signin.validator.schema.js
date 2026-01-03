// import module ------------------------------------------->
import zod from 'zod';

// create schema ------------------------------------------->
const signInSchema = zod
    .object({
        email: zod
            .string({ required_error: 'Email is required!' })
            .trim()
            .toLowerCase()
            .email('Invalid Email Address')
            .max(254, 'Email must not be more than 254 characters.'),
        password: zod
            .string({ required_error: 'Password is required!' })
            .min(8, 'Password must be at least 8 characters.')
            .max(64, 'Password must not be more than 64 characters.'),
    })
    .strict();

// export module ------------------------------------------->
export default signInSchema;
