import { ALERT, REFETCH_CHATS } from '../constants/events.js'
import { ErrorHandler, trycatch } from '../middlewares/error.js'
import { User } from '../models/userModel.js'
import { eventEmitter, setCookieToken } from '../utils/features.js'

export const newGroupChat = trycatch(async (req, res, next) => {
  const { name, members } = req.body

  //Todo: Add group avatar

  if (members.length < 2) {
    return next(new ErrorHandler('Please add at least 2 members', 400))
  }

  const allMembers = [...members, req.user._id]

  const chat = await Chat.create({
    name,
    members: allMembers,
    creator: req.user._id,
    groupChat: true,
  })

  eventEmitter(req, ALERT, allMembers, `Welcome to ${name} group`)
  eventEmitter(req, REFETCH_CHATS, members, `Welcome to ${name} group`)

  return res.status(200).json({
    success: true,
    message: 'Group Chat Created Successfully',
  })
})
