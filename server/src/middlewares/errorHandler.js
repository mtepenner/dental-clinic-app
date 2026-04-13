export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Mongoose Validation Error (e.g., missing a required field)
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid input data', 
      errors: messages 
    });
  }

  // Mongoose Duplicate Key Error (e.g., index violation for double-booking)
  if (err.code === 11000) {
    return res.status(409).json({ 
      success: false, 
      message: 'A scheduling conflict occurred. Please try again.' 
    });
  }

  // Default Server Error
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    // Only reveal stack traces during development
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
