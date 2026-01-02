// import module ------------------------------------------->
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routers/auth.router.js';
import errorMiddleware from './middlewares/validator.middleware.js';

// express app --------------------------------------------->
const app = express();

// express middleware -------------------------------------->
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// express static middleware ------------------------------->
app.use(express.static('public'));

// security middleware ------------------------------------->
app.use(cors({ origin: String(process.env.CORS_ORIGIN), credentials: true }));
app.use(cookieParser());

// check routes -------------------------------------------->
app.get('/', (req, res) => {
    res.send('Api Working Successfully.');
});

// api routes ---------------------------------------------->
app.use('/api/v1/auth', authRouter);

// error middleware ---------------------------------------->
app.use(errorMiddleware);

// export module ------------------------------------------->
export default app;
