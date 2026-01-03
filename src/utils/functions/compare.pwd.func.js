// import module ------------------------------------------->
import chalk from 'chalk';
import bcrypt from 'bcrypt';

// function ------------------------------------------------>
const passwordCompare = async (inputPwd, hashPwd) => {
    try {
        if (typeof inputPwd !== 'string' || typeof hashPwd !== 'string') {
            throw new Error('Password must be a string format!');
        }

        const normalizedPwd = inputPwd.trim();

        if (!normalizedPwd) {
            throw new Error('Password must not be empty.!');
        }

        const passwordCompare = await bcrypt.compare(normalizedPwd, hashPwd);

        return passwordCompare;
    } catch (error) {
        console.log(chalk.yellow('Password cannot compare!'), error.message);
        throw error;
    }
};

// export module ------------------------------------------->
export default passwordCompare;
