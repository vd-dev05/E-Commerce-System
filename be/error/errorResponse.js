/**
 * Function to handle authorization errors
 * @param {Object} res - Express response object
 * @param {Object} error - Error object
 * @param {Number} defaultStatusCode - Default status code if not provided in the error object
 */
export const TimeOutErrorResponse = (res, error, defaultStatusCode = 408) => {
  const statusCode = error.statusCode || defaultStatusCode;
  res.status(statusCode).json({
    success: false,
    message: error.message,
    data : null
  });
}