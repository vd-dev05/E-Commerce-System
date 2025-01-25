

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
export class UnauthorizedError extends UserError {
    constructor(message = 'Unauthorized' , details = null ) { 
        super(message, 401 , details)
    }
}

export class CoinError extends UserError {
    constructor(message = 'Coin Unauthorized' , details = null ) { 
        super(message, 404 , details)
    }
}