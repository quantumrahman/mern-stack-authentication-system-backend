// import module ------------------------------------------->
import 'dotenv/config';
import jwt from 'jsonwebtoken';

// generator function -------------------------------------->
const tokenGenerator = ({ id, email }) => {
    if (typeof id !== 'string') {
        throw new Error('User ID must be a string.');
    }

    if (typeof email !== 'string') {
        throw new Error('User email must be a string.');
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
        throw new Error('Invalid email address.');
    }

    const jwtSecret = String(process.env.JWT_SECRET);

    if (!jwtSecret) {
        throw new Error('JWT secret is missing in environment variables!');
    }

    const jwtToken = jwt.sign({ id, email }, jwtSecret, {
        expiresIn: '7d',
    });

    return jwtToken;
};

// export module ------------------------------------------->
export default tokenGenerator;
