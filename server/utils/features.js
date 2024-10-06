import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

export const connectToDB = async ({ uri }) => {
  mongoose
    .connect(uri, {
      dbName: 'connectpro',
    })
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.log(err))
}

export const setCookieToken = ({ res, user, message, statusCode }) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

  return res
    .status(statusCode)
    .cookie('connect-pro-token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      sameSite: 'none',
      secure: true,
    })
    .json({
      success: true,
      message,
    })
}

export const eventEmitter = (req, event, users, data) => {
  console.log('event emitter')
}
