require('dotenv').config();
import express,{NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from './routes/user.routes'

//body parser

app.use(express.json({ limit: "50mb" }));

//cookie parser

app.use(cookieParser());

//cors => cross origin resource sharing

app.use(cors({
    origin: process.env.ORIGIN
}));


// routes

app.use("/api/v1", userRouter);



// Testing API route
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "API is working",
    });
});

// Unknown route handler
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err: any = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
});


app.use(ErrorMiddleware);