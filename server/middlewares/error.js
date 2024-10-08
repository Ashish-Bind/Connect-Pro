export class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}

export const errorHandler = (err, req, res, next) => {
  err.message = err.message || 'Internal Server Error'
  err.statusCode = err.statusCode || 500

  if (err.code === 11000) {
    const error = Object.keys(err.keyPattern).join(',')
    err.message = `Duplicate field - ${error}`
    err.statusCode = 400
  }

  if (err.name === 'CastError') {
    const errorPath = err.path
    err.message = `Invalid Format of ${errorPath}`
    err.statusCode = 400
  }

  const response = {
    success: false,
    message: err.message,
  }

  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    response.error = err
  }

  return res.status(err.statusCode).json(response)
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
