// import module ------------------------------------------->
import 'dotenv/config';
import chalk from 'chalk';
import bcrypt from 'bcrypt';

// generator function -------------------------------------->
const hashPwdGenerator = async (pwd) => {
    try {
        if (typeof pwd !== 'string') {
            throw new Error('Password must be a string format!');
        }

        const normalizedPwd = pwd.trim();

        if (normalizedPwd === '') {
            throw new Error('Password must not be empty!');
        }

        const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);

        if (!Number.isInteger(saltRounds) || saltRounds < 1) {
            saltRounds = 10;
        }

        let hashedPwd = await bcrypt.hash(normalizedPwd, saltRounds);

        return hashedPwd;
    } catch (error) {
        console.log(chalk.yellow('Password cannot hashing!'), error.message);
        throw error;
    }
};

// export module ------------------------------------------->
export default hashPwdGenerator;
