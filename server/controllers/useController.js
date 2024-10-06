import { ErrorHandler, trycatch } from '../middlewares/error.js'
import { User } from '../models/userModel.js'
import { setCookieToken } from '../utils/features.js'
import bcrypt from 'bcryptjs'

export const newUser = trycatch(async (req, res, next) => {
  const { name, bio, username, password } = req.body

  const avatar = {
    public_id: 'test',
    url: 'test',
  }

  const user = await User.create({
    name,
    bio,
    username,
    password,
    avatar,
  })

  setCookieToken({
    res,
    user,
    message: 'User Created Successfully',
    statusCode: 201,
  })
})

export const login = trycatch(async (req, res, next) => {
  const { username, password } = req.body

  const user = await User.findOne({ username }).select('+password')

  if (!user) {
    return next(new ErrorHandler('User Not Found', 404))
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password)

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Wrong Password', 401))
  }

  setCookieToken({
    res,
    user,
    message: `Welcome Back ${user.name}`,
    statusCode: 200,
  })
})

export const getUserProfile = trycatch(async (req, res, next) => {
  const user = await User.findById(req.user._id)

  res.status(200).json({
    success: true,
    user,
  })
})

export const logout = trycatch(async (req, res) => {
  res
    .status(200)
    .cookie('connect-pro-token', '', {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
    })
    .json({
      success: true,
      message: 'Logged Out Successfully',
    })
})

export const searchUser = trycatch(async (req, res, next) => {
  const { username } = req.query

  res.status(200).json({
    success: true,
    username,
  })
})
