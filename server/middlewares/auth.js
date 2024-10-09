import jwt from 'jsonwebtoken'
import { ErrorHandler, trycatch } from './error.js'
import { User } from '../models/userModel.js'

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

export const socketAuthenticator = async (err, socket, next) => {
  try {
    if (err) return next(err)

    const token = socket.request.cookies['connect-pro-token']

    if (!token) {
      return next(new ErrorHandler('Please Login to access this resource', 401))
    }

    const isVerified = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(isVerified._id)

    if (!user) {
      return next(new ErrorHandler('Please Login to access this resource', 401))
    }

    socket.user = user

    return next()
  } catch (error) {
    console.log(error)
    return next(new ErrorHandler('Please Login to access this resource', 401))
  }
}
