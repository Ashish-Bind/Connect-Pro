import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import { v4 as uuid } from 'uuid'
import { userSocketMap } from '../app.js'

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
      secure: true,
    })
    .json({
      success: true,
      message,
      user,
    })
}

export const eventEmitter = (req, event, users, data) => {
  const io = req.app.get('io')

  const socketIds = getSockets(users)

  io.to(socketIds).emit(event, data)
}

export const getOtherMember = ({ members, userId }) => {
  return members.find((member) => member._id.toString() !== userId.toString())
}

export const getBase64 = (file) => {
  return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
}

export const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        {
          resource_type: 'auto',
          public_id: uuid(),
        },
        (error, result) => {
          if (error) return reject(error)
          resolve(result)
        }
      )
    })
  })

  try {
    const results = await Promise.all(uploadPromises)

    const formattedResults = results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }))
    return formattedResults
  } catch (err) {
    throw new Error('Error uploading files to cloudinary', err)
  }
}

export const deletFilesFromCloudinary = (public_ids) => {
  // public_ids.forEach((public_id) => {
  //   cloudinary.v2.uploader.destroy(public_id)
  // })
}

export const getSockets = (users = []) => {
  const sockets = users.map((user) => {
    return userSocketMap.get(user.toString())
  })

  return sockets
}
