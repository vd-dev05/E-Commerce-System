export class AdminError extends Error {
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
 
 export class NotfoundError extends AdminError {
     constructor(message = 'Not found' , details = null ) { 
         super(message, 404 , details)
     }
 }
 export class UnauthorizedError extends AdminError {
    constructor(message = 'Unauthorized' , details = null ) { 
        super(message, 401 , details)
    }
}