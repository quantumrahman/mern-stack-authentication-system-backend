// import module ------------------------------------------->
import 'dotenv/config';
import chalk from 'chalk';
import mongoose from 'mongoose';

// connection function ------------------------------------->
const dbConnection = async () => {
    try {
        const dbUser = String(process.env.DB_USER);
        if (!dbUser) {
            throw new Error('Database user is not defined in environment variables!');
        };

        const dbPass = String(process.env.DB_PASS);
        if (!dbPass) {
            throw new Error('Database password is not defined in environment variables!');
        };

        const dbUri = String(process.env.DB_URI);
        if (!dbUri) {
            throw new Error('Database uri is not defined in environment variables!');
        };

        const uri = dbUri.replace('<db_username>', dbUser).replace('<db_password>', dbPass);

        mongoose.connection.on('connected', () => {
            console.log(chalk.green('Mongoose connected successfully.'));
        });

        mongoose.connection.on('disconnected', () => {
            console.log(chalk.yellow('Mongoose disconnected!'));
        });

        mongoose.connection.on('error', () => {
            console.log(chalk.red('Mongoose connection error!!'));
        });

        await mongoose.connect(uri);
    } catch (error) {
        console.log(chalk.red('Mongoose connection error.'), error.message);
        process.exit(1);
    }
};

// export module ------------------------------------------->
export default dbConnection;
