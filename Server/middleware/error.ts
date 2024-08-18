import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utlis/ErrorHandlers"

export const ErrorMiddleware= (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.messege = err.messege || "Internal Server Error";

  //wrong mongodb in eror

  if (err.name == "CastError") {
    const messege = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(messege, 400);
  }

  // Duplicste key error

  if (err.code == 11000) {
    const messege = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(messege, 400);
  }

  // wrong jwt error
  if (err.name == "JsonWebTokenError") {
    const messege = "Json web token in invalid, try again";
    err = new ErrorHandler(messege, 400);
  }

  //Jwt expired error

  if (err.name == "TokenExpiredError") {
    const messege = "Json web token in expired, try again";
    err = new ErrorHandler(messege, 400);
  }

  res.status(err.statusCode).json({
    
    success: false,
    message: err.message,
  });
};
