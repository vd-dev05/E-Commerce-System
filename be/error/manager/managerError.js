import { Error } from "./error";

export class ManagerError extends Error {
   constructor
    (message , statusCode,details =null ,isOpenrational = true)
    {
        super(message)
        this.statusCode = statusCode
        this.details = details
        this.isOpenrational = isOpenrational
        Error.captureStackTrace(this, this.constructor)
    }
}

export class NotfoundError extends ManagerError {
    constructor(message = 'Not found' , details = null ) { 
        super(message, 404 , details)
    }
}