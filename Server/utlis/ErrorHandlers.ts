class ErrorHandler extends Error{
    statusCode : Number;

    constructor(messege:any, statusCode:Number){
        super(messege);
        this.statusCode = statusCode;

        Error.captureStackTrace(this,this.constructor);
    }
}

export default ErrorHandler;