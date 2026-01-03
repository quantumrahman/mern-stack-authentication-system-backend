// import module ------------------------------------------->
import zod from 'zod';

// sign-up validation schema ------------------------------->
export const signUpSchema = zod
    .object({
        name: zod
            .string({ required_error: 'Name is required!' })
            .trim()
            .min(6, 'Name must be at least 6 characters.')
            .max(128, 'Name must not be more than 128 characters.'),
        email: zod
            .string({ required_error: 'Email is required!' })
            .trim()
            .toLowerCase()
            .email('Invalid email address.')
            .max(254, 'Email must not be more than 254 characters.'),
        password: zod
            .string({ required_error: 'Password is required!' })
            .min(8, 'Password must be at least 8 characters.')
            .max(64, 'Password must not be more than 64 characters.'),
    })
    .strict();

// sign-in validation schema ------------------------------->
export const signInSchema = zod
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
