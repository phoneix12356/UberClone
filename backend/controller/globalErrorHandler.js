export const globalerrorHandler = (err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';

    res.status(statusCode).json({
      status: status,
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
}