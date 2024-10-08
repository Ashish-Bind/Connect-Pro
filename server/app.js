import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import { v4 as uuid } from 'uuid'
import { Server } from 'socket.io'

import { errorHandler } from './middlewares/error.js'
import chatRoute from './routes/chatRoute.js'
import userRoute from './routes/userRoute.js'
import adminRoute from './routes/adminRoute.js'
import { connectToDB, getSockets } from './utils/features.js'
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from './constants/events.js'
import { Message } from './models/messageModel.js'

dotenv.config({
  path: './.env',
})

const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT || 3000

const userSocketMap = new Map()

connectToDB({ uri: MONGO_URI })

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/user', userRoute)
app.use('/api/v1/chat', chatRoute)
app.use('/api/v1/admin', adminRoute)

app.get('/', (req, res) => {
  res.send('Hello World')
})

io.use((socket, next) => {})

io.on('connection', (socket) => {
  const user = {
    _id: 'asfdasf',
    name: 'test',
  }

  userSocketMap.set(user._id.toString(), socket).id

  console.log(`user connecte ${socket.id}`)

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageRT = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user._id,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    }

    const messageDB = {
      content: message,
      user: user._id,
      chat: chatId,
    }

    const membersSocket = getSockets(members)

    io.to(membersSocket).emit(NEW_MESSAGE, { chatId, messageRT })

    io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId })

    try {
      await Message.create(messageDB)
    } catch (error) {
      console.log(error)
    }
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
    userSocketMap.delete(user._id.toString())
  })
})

app.use(errorHandler)

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})

export { userSocketMap }
