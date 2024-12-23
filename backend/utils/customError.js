class CustomError extends Error {
  constructor(message, statusCode,details = null) {
    super(message);
    this.statusCode = statusCode;
    if (details) {
      this.details = details;
    }

    // Ensure the stack trace is correctly captured
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;