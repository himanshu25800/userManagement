import express from 'express';
import userRouter from "./routes/user.route.js"
import cookieParser from 'cookie-parser';
import dotenv from "dotenv"

const app = express();
dotenv.config();


app.use(express.json())
app.use(cookieParser())

// Use the signup router
app.use('/api', userRouter);


app.get('/', (req, res) => {
    res.send('Hello world, ');
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


