export class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}

export const errorHandler = (err, req, res, next) => {
  err.message = err.message || 'Internal Server Error'
  err.statusCode = err.statusCode || 500

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  })
}

export const trycatch = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
