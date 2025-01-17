import {
  ALERT,
  NAVIGATE_TO,
  NEW_MESSAGE,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
} from '../constants/events.js'
import { ErrorHandler, trycatch } from '../middlewares/error.js'
import { Chat } from '../models/chatModel.js'
import { Message } from '../models/messageModel.js'
import { User } from '../models/userModel.js'
import {
  deletFilesFromCloudinary,
  eventEmitter,
  getOtherMember,
  setCookieToken,
  uploadFilesToCloudinary,
} from '../utils/features.js'

export const newGroupChat = async (req, res, next) => {
  const { name, members } = req.body
  let groupAvatar = null

  const file = req.file

  if (file) {
    const result = await uploadFilesToCloudinary([file])

    groupAvatar = {
      public_id: result[0].public_id,
      url: result[0].url,
    }
  }

  if (JSON.parse(members).length < 2) {
    return next(new ErrorHandler('Please add at least 2 members', 400))
  }

  const allMembers = [...JSON.parse(members), req.user._id]

  const chat = await Chat.create({
    name,
    members: allMembers,
    creator: req.user._id,
    groupChat: true,
    groupAvatar: groupAvatar ? groupAvatar : { public_id: '', url: '' },
  })

  eventEmitter(req, ALERT, allMembers, {
    message: `Welcome to ${name} group`,
    chatId: chat._id,
  })
  eventEmitter(req, REFETCH_CHATS, JSON.parse(members))

  return res.status(200).json({
    success: true,
    message: 'Group Chat Created Successfully',
  })
}

export const getUserChats = trycatch(async (req, res, next) => {
  const chats = await Chat.find({
    members: {
      $in: [req.user._id],
    },
  }).populate('members', 'name username avatar')

  const transfromedChats = chats.map(
    ({ _id, name, members, groupChat, groupAvatar, username }) => {
      const otherMember = getOtherMember({
        members: members,
        userId: req.user._id,
      })

      // fix: group avatar not working
      return {
        _id,
        name: groupChat ? name : otherMember.name,
        username: otherMember.username,
        groupChat,
        avatar: groupChat ? groupAvatar.url : otherMember.avatar.url,
        groupAvatar: groupChat && groupAvatar,
        members: members.reduce((prev, curr) => {
          if (curr._id.toString() !== req.user.toString()) {
            prev.push(curr._id)
          }
          return prev
        }, []),
        otherMember: !groupChat && otherMember._id,
      }
    }
  )

  return res.status(200).json({
    success: true,
    chats: transfromedChats,
  })
})

export const getUserGroupChats = trycatch(async (req, res, next) => {
  const chats = await Chat.find({
    members: {
      $in: [req.user._id],
    },
    groupChat: true,
    creator: req.user._id,
  }).populate('members', 'name username avatar')

  const transfromedChats = chats.map(
    ({ _id, name, members, groupChat, groupAvatar }) => {
      return {
        _id,
        name,
        groupChat,
        avatar: groupAvatar.url,
      }
    }
  )

  return res.status(200).json({
    success: true,
    chats: transfromedChats,
  })
})

export const addNewMembers = trycatch(async (req, res, next) => {
  const { chatId, members } = req.body

  const chat = await Chat.findById(chatId)

  if (!chat) {
    return next(new ErrorHandler('Chat not found', 404))
  }

  if (!chat.groupChat) {
    return next(new ErrorHandler('Only group chat can have new members', 400))
  }

  if (chat.creator.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler('Only group creator can add new members', 400))
  }

  const allNewMembersPromise = members.map((i) => User.findById(i, 'name'))

  const allNewMembers = await Promise.all(allNewMembersPromise)

  const uniqueMembers = allNewMembers
    .filter((i) => !chat.members.includes(i._id.toString()))
    .map((i) => i._id)

  chat.members.push(...uniqueMembers)

  if (chat.members.length > 100)
    return next(new ErrorHandler('Group members limit reached', 400))

  await chat.save()

  const allUsersName = allNewMembers.map((i) => i.name).join(', ')

  eventEmitter(req, ALERT, chat.members, {
    message: `${allUsersName} added to group`,
    chatId,
  })
  eventEmitter(req, REFETCH_CHATS, chat.members)

  return res.status(200).json({
    success: true,
    message: 'Members added successfully',
  })
})

export const removeMembers = trycatch(async (req, res, next) => {
  const { userId, chatId } = req.body

  const [chat, userThatWillBeRemoved] = await Promise.all([
    Chat.findById(chatId),
    User.findById(userId, 'name'),
  ])

  if (!chat) return next(new ErrorHandler('Chat not found', 404))

  if (!chat.groupChat)
    return next(new ErrorHandler('This is not a group chat', 400))

  if (chat.creator.toString() !== req.user._id.toString())
    return next(new ErrorHandler('You are not allowed to add members', 403))

  if (chat.members.length <= 3)
    return next(new ErrorHandler('Group must have at least 3 members', 400))

  const allChatMembers = chat.members.map((i) => i.toString())

  chat.members = chat.members.filter((member) => member.toString() !== userId)

  await chat.save()

  eventEmitter(req, ALERT, chat.members, {
    message: `${userThatWillBeRemoved.name} has been removed from the group`,
    chatId,
  })

  eventEmitter(req, REFETCH_CHATS, allChatMembers)
  eventEmitter(
    req,
    NAVIGATE_TO,
    [userId],
    'You have been removed from the group'
  )

  return res.status(200).json({
    success: true,
    message: 'Member removed successfully',
  })
})

export const leaveGroup = trycatch(async (req, res, next) => {
  const chatId = req.params.id

  const chat = await Chat.findById(chatId)

  if (!chat) {
    return next(new ErrorHandler('Chat not found', 404))
  }

  if (!chat.groupChat) {
    return next(new ErrorHandler('This is not a group chat', 400))
  }

  const remainingMembers = chat.members.filter(
    (member) => member.toString() !== req.user._id.toString()
  )

  if (remainingMembers.length < 3) {
    return next(new ErrorHandler('Group must have at least 3 members', 400))
  }

  if (chat.creator.toString() === req.user._id.toString()) {
    const newCreator = remainingMembers[0]
    chat.creator = newCreator
  }

  chat.members = remainingMembers

  const [user] = await Promise.all([
    User.findById(req.user, 'name'),
    chat.save(),
  ])

  eventEmitter(req, ALERT, chat.members, {
    message: `${req.user.name} has left the group`,
    chatId,
  })

  return res.status(200).json({
    success: true,
    remainingMembers,
    message: `${user.name} Left group successfully`,
  })
})

export const sendAttachments = trycatch(async (req, res, next) => {
  const { chatId } = req.body

  const files = req.files || []

  if (files.length < 1) {
    return next(new ErrorHandler('Please select at least 1 file', 400))
  }

  const [chat, user] = await Promise.all([
    Chat.findById(chatId),
    User.findById(req.user._id),
  ])

  if (!chat) {
    return next(new ErrorHandler('Chat not found', 404))
  }

  const attachments = await uploadFilesToCloudinary(files)

  const messageDB = { content: '', attachments, sender: user._id, chat: chatId }

  const messageRT = {
    ...messageDB,
    sender: { _id: user._id, name: user.name },
  }

  const message = await Message.create(messageDB)

  eventEmitter(req, NEW_MESSAGE, chat.members, {
    ...messageRT,
    chatId,
  })

  eventEmitter(req, NEW_MESSAGE_ALERT, chat.members, { chatId })

  return res.status(200).json({
    success: true,
    message,
  })
})

export const getChatDetails = trycatch(async (req, res, next) => {
  if (req.query.populate === 'true') {
    const chat = await Chat.findById(req.params.id)
      .populate('members', 'name avatar username bio createdAt')
      .lean()

    if (!chat) return next(new ErrorHandler('Chat not found', 404))

    chat.members = chat.members.map(
      ({ _id, name, avatar, username, bio, createdAt }) => ({
        _id,
        name,
        avatar: avatar.url,
        username,
        bio,
        createdAt,
      })
    )

    return res.status(200).json({
      success: true,
      chat,
    })
  } else {
    const chat = await Chat.findById(req.params.id).populate(
      'members',
      'name avatar username bio'
    )
    if (!chat) return next(new ErrorHandler('Chat not found', 404))

    return res.status(200).json({
      success: true,
      chat,
    })
  }
})

export const renameGroup = trycatch(async (req, res, next) => {
  const chatId = req.params.id
  const { name } = req.body

  const chat = await Chat.findById(chatId)

  if (!chat) return next(new ErrorHandler('Chat not found', 404))

  if (!chat.groupChat)
    return next(new ErrorHandler('This is not a group chat', 400))

  if (chat.creator.toString() !== req.user._id.toString())
    return next(
      new ErrorHandler('You are not allowed to rename the group', 403)
    )

  chat.name = name

  await chat.save()

  eventEmitter(req, REFETCH_CHATS, chat.members)

  return res.status(200).json({
    success: true,
    message: 'Group renamed successfully',
  })
})

export const deleteChat = trycatch(async (req, res, next) => {
  const chatId = req.params.id

  const chat = await Chat.findById(chatId)

  if (!chat) return next(new ErrorHandler('Chat not found', 404))

  const members = chat.members

  if (chat.groupChat && chat.creator.toString() !== req.user._id.toString())
    return next(
      new ErrorHandler('You are not allowed to delete the group', 403)
    )

  if (!chat.groupChat && !chat.members.includes(req.user._id.toString())) {
    return next(new ErrorHandler('You are not allowed to delete the chat', 403))
  }

  const messagesWithAttachments = await Message.find({
    chat: chatId,
    attachments: { $exists: true, $ne: [] },
  })

  const public_ids = []

  messagesWithAttachments.forEach(({ attachments }) =>
    attachments.forEach(({ public_id }) => public_ids.push(public_id))
  )

  await Promise.all([
    deletFilesFromCloudinary(public_ids),
    chat.deleteOne(),
    Message.deleteMany({ chat: chatId }),
  ])

  const otherMembers = members.filter(
    (member) => member.toString() !== req.user._id
  )

  eventEmitter(req, REFETCH_CHATS, members)
  eventEmitter(
    req,
    NAVIGATE_TO,
    otherMembers,
    'You have been removed from the chat'
  )

  return res.status(200).json({
    success: true,
    message: 'Chat deleted successfully',
  })
})

export const getMessages = trycatch(async (req, res, next) => {
  const chatId = req.params.id
  const { page = 1 } = req.query

  const chat = await Chat.findById(chatId)

  if (!chat) {
    return next(new ErrorHandler('Chat not found', 404))
  }

  if (!chat.members.includes(req.user._id.toString())) {
    return next(
      new ErrorHandler('You are not allowed to access this chat', 403)
    )
  }

  const limit = 20

  const skip = (page - 1) * limit

  const [messages, messageCount] = await Promise.all([
    Message.find({ chat: chatId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('sender', 'name avatar')
      .lean(),
    Message.countDocuments({ chat: chatId }),
  ])

  const totalPages = Math.ceil(messageCount / limit)

  return res.status(200).json({
    success: true,
    messages,
    count: messageCount,
    totalPages,
  })
})
