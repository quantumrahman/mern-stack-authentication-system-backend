// import module ------------------------------------------->
import 'dotenv/config';
import chalk from 'chalk';
import app from './app.js';
import mongoose from 'mongoose';
import dbConnection from './database/db.connection.js';

// server function ----------------------------------------->
const startServer = async () => {
    try {
        await dbConnection();

        const port = Number(process.env.PORT) || 4000;
        const server = app.listen(port, () => {
            console.log(
                chalk.green(`Server running on http://localhost:${port}`)
            );
        });

        const gracefulShutdown = async (signal) => {
            console.log(
                chalk.yellow(
                    `Recevied signal ${signal}, Server shutting down...`
                )
            );

            server.close(async () => {
                console.log(chalk.white('Server is closed...'));

                await mongoose.connection.close();
                console.log(chalk.white('Mongoose connection is closed...'));

                process.exit(0);
            });

            setTimeout(() => {
                console.log(
                    chalk.red(
                        'Could not close connections in time, forcefully shutting down the server...'
                    )
                );
            }, 10000);
        };

        process.on('SIGINT', gracefulShutdown);
        process.on('SIGTERM', gracefulShutdown);
    } catch (error) {
        console.log(chalk.red('Server startup error!!'), error.message);
        process.exit(1);
    }
};

// function call ------------------------------------------->
startServer();
