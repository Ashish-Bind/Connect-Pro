import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import userRoute from './routes/userRoute.js'
import chatRoute from './routes/chatRoute.js'
import { connectToDB } from './utils/features.js'
import { errorHandler } from './middlewares/error.js'

dotenv.config({
  path: './.env',
})

const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT || 3000

connectToDB({ uri: MONGO_URI })

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/user', userRoute)
app.use('/api/v1/chat', chatRoute)

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
