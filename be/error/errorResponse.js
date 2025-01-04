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
export const ErrorResponse = (res, error, defaultStatusCode = 500) => {
  const statusCode = error.statusCode || defaultStatusCode;
  res.status(statusCode).json({
    success: false,
    message: error.message,
    data : null
  });
}

export const ErrorUnAuthorizedResponse = (res, error, defaultStatusCode = 401) => {
  const statusCode = error.statusCode || defaultStatusCode;
  res.status(statusCode).json({
    success: false,
    message: error.message,
    data : null
  });
}

export const ErrorNotFoundResponse = (res, error, defaultStatusCode = 404) => {
  const statusCode = error.statusCode || defaultStatusCode;
  res.status(statusCode).json({
    success: false,
    message: error.message,
    data : null
  });
}