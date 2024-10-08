import jwt from 'jsonwebtoken'
import { ErrorHandler, trycatch } from './error.js'

export const isAuthenticated = trycatch((req, res, next) => {
  const token = req.cookies['connect-pro-token']

  if (!token) {
    return next(new ErrorHandler('Please Login to access this resource', 401))
  }

  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)

  if (!verifiedToken) {
    return next(new ErrorHandler('Please Login to access this resource', 401))
  }

  req.user = verifiedToken
  next()
})

export const isAuthenticatedAdmin = trycatch((req, res, next) => {
  const token = req.cookies['connect-pro-admin-token']

  if (!token) {
    return next(new ErrorHandler('Please Login to access this resource', 401))
  }

  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)

  if (!verifiedToken) {
    return next(new ErrorHandler('Please Login to access this resource', 401))
  }

  const isMatched = verifiedToken === process.env.ADMIN_SECRET

  if (!isMatched) {
    return next(new ErrorHandler('Please Login to access this resource', 401))
  }

  next()
})
