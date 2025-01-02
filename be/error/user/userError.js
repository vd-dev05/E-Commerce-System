

export class UserError extends Error {
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

export class TimeOutError extends UserError {
    constructor(message = 'Time out' , details = null ) { 
        super(message, 408 , details)
    }
}