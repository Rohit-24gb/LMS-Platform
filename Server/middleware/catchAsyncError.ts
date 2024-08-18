// import { NextFunction, Request, Response } from "express";
// import { request } from "http";

// export const  CatchAsyncError = (theFunc: any) => {req:request, res:Response, next:NextFunction}=>{
//     Promise.resolve(theFunc(req, res, next)).catch(next);
// }


import { NextFunction, Request, Response } from "express";

export const CatchAsyncError = (theFunc: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(theFunc(req, res, next)).catch(next);
    };
};
 