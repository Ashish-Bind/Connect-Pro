import { ErrorHandler, trycatch } from '../middlewares/error.js'
import { User } from '../models/userModel.js'
import { Chat } from '../models/chatModel.js'
import {
  eventEmitter,
  getOtherMember,
  setCookieToken,
  uploadFilesToCloudinary,
} from '../utils/features.js'
import { Request } from '../models/requestModel.js'
import bcrypt from 'bcryptjs'
import { NEW_REQUEST, REFETCH_CHATS } from '../constants/events.js'

export const newUser = trycatch(async (req, res, next) => {
  const { name, bio, username, password } = req.body

  const file = req.file

  if (!file) return next(new ErrorHandler('Please Upload Avatar'))

  const result = await uploadFilesToCloudinary([file])

  const avatar = {
    public_id: result[0].public_id,
    url: result[0].url,
  }

  console.log(avatar)

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

  return res.status(200).json({
    success: true,
    user,
  })
})

export const logout = trycatch(async (req, res, next) => {
  return res
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

  const myChats = await Chat.find({
    members: {
      $in: [req.user._id],
    },
    groupChat: false,
  })

  const allUsersFromMyChats = myChats.flatMap((chat) => chat.members)

  const allUsersExceptMeAndFriends = await User.find({
    _id: { $nin: allUsersFromMyChats },
    name: { $regex: username, $options: 'i' },
    username: { $regex: username, $options: 'i' },
  })

  const users = allUsersExceptMeAndFriends.map(({ _id, name, avatar }) => ({
    _id,
    name,
    avatar: avatar.url,
  }))

  return res.status(200).json({
    success: true,
    users,
  })
})

export const sendFriendRequest = trycatch(async (req, res, next) => {
  const { userId } = req.body

  const request = await Request.findOne({
    $or: [
      { sender: userId, receiver: req.user._id },
      { receiver: userId, sender: req.user._id },
    ],
  })

  if (request) {
    return next(new ErrorHandler('Friend Request Already Sent', 400))
  }

  await Request.create({ sender: req.user._id, receiver: userId })

  eventEmitter(req, NEW_REQUEST, [userId], {})

  return res.status(200).json({
    success: true,
    message: 'Friend Request Sent',
  })
})

export const acceptFriendRequest = trycatch(async (req, res, next) => {
  const { requestId, accept } = req.body

  const [request, userId] = await Request.findById(requestId)
    .populate('sender', 'name')
    .populate('receiver', 'name')

  if (!request) {
    return next(new ErrorHandler('Friend Request Not Found', 404))
  }

  if (request.receiver._id.toString() !== req.user._id.toString()) {
    return next(
      new ErrorHandler('You are not allowed to accept this request', 403)
    )
  }

  if (!accept) {
    await request.deleteOne()

    return res.status(200).json({
      success: true,
      message: 'Friend Request Rejected',
    })
  }

  const members = [request.sender._id, request.receiver._id]

  await Promise.all([
    Chat.create({
      name: `${request.sender.name} and ${request.receiver.name}`,
      members,
    }),
    request.deleteOne(),
  ])

  eventEmitter(req, REFETCH_CHATS, members, {})

  return res.status(200).json({
    success: true,
    message: 'Friend Request Accepted',
    sender: request.sender._id,
  })
})

export const getAllNotifications = trycatch(async (req, res, next) => {
  const requests = await Request.find({ receiver: req.user._id }).populate(
    'sender',
    'name avatar'
  )

  const allRequests = requests.map(({ sender, _id }) => ({
    _id,
    sender: {
      _id: sender._id,
      name: sender.name,
      avatar: sender.avatar.url,
    },
  }))

  res.status(200).json({
    success: true,
    requests: allRequests,
  })
})

export const getAllFriends = trycatch(async (req, res, next) => {
  const { chatId } = req.query

  const chats = await Chat.find({
    members: req.user._id,
    groupChat: false,
  }).populate('members', 'name avatar')

  const friends = chats.map(({ members }) => {
    const otherUser = getOtherMember(members, req.user)

    return {
      _id: otherUser._id,
      name: otherUser.name,
      avatar: otherUser.avatar.url,
    }
  })

  if (chatId) {
    const chat = await Chat.findById(chatId)

    // get all members except me
    const availableFriends = friends.filter(
      (friend) => !chat.members.includes(friend._id)
    )

    return res.status(200).json({
      success: true,
      friends: availableFriends,
    })
  } else {
    return res.status(200).json({
      success: true,
      friends,
    })
  }
})
