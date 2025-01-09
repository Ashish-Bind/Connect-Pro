import { ErrorHandler, trycatch } from '../middlewares/error.js'
import { Chat } from '../models/chatModel.js'
import { User } from '../models/userModel.js'
import { Message } from '../models/messageModel.js'
import jwt from 'jsonwebtoken'

export const verifyAdmin = trycatch(async (req, res, next) => {
  const { secret } = req.body

  const isAdmin = secret === process.env.ADMIN_SECRET

  if (!isAdmin) {
    return next(new ErrorHandler('Admin Verification Failed', 403))
  }

  const token = jwt.sign(secret, process.env.JWT_SECRET)

  return res
    .status(200)
    .cookie('connect-pro-admin-token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: true,
    })
    .json({
      success: true,
      message: 'Admin Verified Successfully',
    })
})

export const logoutAdmin = trycatch(async (req, res) => {
  return res
    .status(200)
    .cookie('connect-pro-admin-token', '', {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
    })
    .json({
      success: true,
      message: 'Logged Out Successfully',
    })
})

export const allUsers = trycatch(async (req, res, next) => {
  const users = await User.find({})

  const transformedUsers = await Promise.all(
    users.map(async ({ name, username, avatar, _id, createdAt: joined }) => {
      const [groups, friends] = await Promise.all([
        Chat.countDocuments({ groupChat: true, members: _id }),
        Chat.countDocuments({ groupChat: false, members: _id }),
      ])

      return {
        name,
        username,
        avatar: avatar.url,
        _id,
        groups,
        friends,
        joined,
      }
    })
  )

  return res.status(200).json({
    status: 'success',
    users: transformedUsers,
  })
})

export const allChats = trycatch(async (req, res, next) => {
  const chats = await Chat.find({})
    .populate('members', 'name avatar')
    .populate('creator', 'name avatar')

  const transformedChats = await Promise.all(
    chats.map(
      async ({ members, _id, groupChat, name, creator, groupAvatar }) => {
        const totalMessages = await Message.countDocuments({ chat: _id })

        return {
          _id,
          groupChat,
          name,
          avatar: members.slice(0, 3).map((member) => member.avatar.url),
          members: members.map(({ _id, name, avatar }) => ({
            _id,
            name,
            avatar: avatar.url,
          })),
          creator: {
            name: creator?.name || 'None',
            avatar: creator?.avatar.url || '',
          },
          totalMembers: members.length,
          totalMessages,
          groupAvatar: groupChat ? groupAvatar.url : '',
        }
      }
    )
  )

  return res.status(200).json({
    status: 'success',
    chats: transformedChats,
  })
})

export const getDashboardStats = trycatch(async (req, res, next) => {
  const [groupCount, userCount, chatCount, messageCount] = await Promise.all([
    Chat.countDocuments({ groupChat: true }),
    User.countDocuments({}),
    Chat.countDocuments({}),
    Message.countDocuments({}),
  ])

  const today = new Date()

  const last7Days = new Date()
  last7Days.setDate(last7Days.getDate() - 7)

  const last7DaysMessages = await Message.find({
    createdAt: {
      $gte: last7Days,
      $lte: today,
    },
  }).select('createdAt')

  const messages = new Array(7).fill(0)
  const dayInMiliseconds = 1000 * 60 * 60 * 24

  last7DaysMessages.forEach((message) => {
    const indexApprox =
      (today.getTime() - message.createdAt.getTime()) / dayInMiliseconds
    const index = Math.floor(indexApprox)

    messages[6 - index]++
  })

  const stats = {
    groupCount,
    userCount,
    chatCount,
    messageCount,
    messages,
  }

  return res.status(200).json({
    status: 'success',
    stats,
  })
})

export const getAdminData = trycatch(async (req, res, next) => {
  return res.status(200).json({
    admin: true,
  })
})
