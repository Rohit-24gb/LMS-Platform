import express from "express";
import { activateUser, registrationUser } from "../controllers/user.controllers";


const userRouter = express.Router();

userRouter.post("/register", registrationUser);


userRouter.post("/activate-user", activateUser);

export default userRouter;
