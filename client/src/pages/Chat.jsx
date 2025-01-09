import { useInfiniteScrollTop } from '6pp'
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from '@mui/icons-material'
import { IconButton, Skeleton, Stack } from '@mui/material'
import { useState, useCallback, useEffect, useRef, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppLayout from '../components/layout/AppLayout'
import Message from '../components/MessageComponent'
import { InputBox } from '../components/styles/StyledComponent'
import { gray, primary, primaryDark } from '../constants/color'
import {
  ALERT,
  CHAT_JOINED,
  CHAT_LEFT,
  END_TYPING,
  NEW_MESSAGE,
  START_TYPING,
} from '../constants/events'
import { useErrors, useSocketEvents } from '../hooks/customHooks'
import {
  useGetChatDetailsQuery,
  useGetOldMessagesQuery,
} from '../redux/query/api'
import { useSocket } from '../utils/socket'
import { setIsFileMenu } from '../redux/reducer/misc'
import FileMenu from '../components/dialogs/FileMenu'
import { removeNewMessagesAlert } from '../redux/reducer/chat'
import { TypingLoader } from '../components/layout/Loaders'
import { FLASK_SERVER } from '../constants/config'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { memberExists } from '../redux/reducer/auth'

const Chat = ({ chatId }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const containerRef = useRef(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [page, setPage] = useState(1)
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null)
  const [isTyping, setIsTyping] = useState(false)
  const [isUserTyping, setIsUserTyping] = useState(false)
  const [isHateSpeech, setIsHateSpeech] = useState(false)
  const typingTimeout = useRef(null)
  const bottomRef = useRef(null)

  const { user } = useSelector((state) => state.auth)

  const handleFileMenuOpen = (e) => {
    dispatch(setIsFileMenu(true))
    setFileMenuAnchor(e.currentTarget)
  }

  const socket = useSocket()

  const chatDetails = useGetChatDetailsQuery({
    chatId,
    populate: true,
  })

  const members = chatDetails?.data?.chat?.members.map((i) => i._id)

  const oldMessagesChunk = useGetOldMessagesQuery({ chatId, page })

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  )

  const errors = [
    {
      isError: chatDetails.isError,
      error: chatDetails.error,
    },
    {
      isError: oldMessagesChunk.isError,
      error: oldMessagesChunk.error,
    },
  ]

  const messageHandler = (e) => {
    setMessage(e.target.value)
    if (!isTyping) {
      setIsTyping(true)
      socket.emit(START_TYPING, {
        members: chatDetails?.data?.chat?.members.map((i) => i._id),
        chatId,
      })
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current)

    typingTimeout.current = setTimeout(() => {
      socket.emit(END_TYPING, {
        members: chatDetails?.data?.chat?.members.map((i) => i._id),
        chatId,
      })
      setIsTyping(false)
    }, 3000)
  }

  const allMessages = [...oldMessages, ...messages].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!message) return

    socket.emit(NEW_MESSAGE, {
      message,
      members,
      chatId,
    })

    // axios
    //   .post(`${FLASK_SERVER}/api/v2/process-message`, { message: message })
    //   .then((res) => {
    //     const members = chatDetails?.data?.chat?.members.map((i) => i._id)
    //     if (res?.data?.isSlangReplaced) {
    //       toast('Slang word detected. Message has been replaced', {
    //         icon: '🚫',
    //       })
    //       socket.emit(NEW_MESSAGE, {
    //         message: res.data.message,
    //         members,
    //         chatId,
    //       })
    //     } else {
    //       socket.emit(NEW_MESSAGE, {
    //         message,
    //         members,
    //         chatId,
    //       })
    //     }
    // })
    //   .catch((err) => {
    //     setIsHateSpeech(true)
    //     toast.error(err?.response?.data?.message)
    //   })

    setMessage('')
  }

  useEffect(() => {
    if (chatDetails?.data?.chat?.members) {
      const otherMember = chatDetails?.data?.chat?.members.find(
        (i) => i._id !== user._id
      )

      if (chatDetails?.data?.chat?.groupChat) {
        dispatch(memberExists(chatDetails.data?.chat))
      } else {
        dispatch(
          memberExists({ ...otherMember, _id: chatDetails.data.chat._id })
        )
      }
    }
  }, [chatDetails])

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  useEffect(() => {
    socket.emit(CHAT_JOINED, { userId: user._id, members })
    dispatch(removeNewMessagesAlert(chatId))

    return () => {
      setMessages([])
      setMessage('')
      setPage(1)
      setOldMessages([])
      socket.emit(CHAT_LEFT, { userId: user._id, members })
    }
  }, [chatId])

  const newMessageListener = useCallback(
    (data) => {
      if (data.chat !== chatId) return
      console.log(data)
      setMessages((prev) => [...prev, data])
      console.log(messages)
    },
    [chatId]
  )

  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return
      setIsUserTyping(true)
    },
    [chatId]
  )

  const endTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return
      setIsUserTyping(false)
    },
    [chatId]
  )

  const alertListener = useCallback(
    (data) => {
      if (chatId !== data.chat) return
      const messageAlert = {
        content: data.message,
        sender: {
          _id: 'asdfljofhiagn',
          name: 'Admin',
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, messageAlert])
    },
    [chatId]
  )

  const events = {
    [NEW_MESSAGE]: newMessageListener,
    [START_TYPING]: startTypingListener,
    [END_TYPING]: endTypingListener,
    [ALERT]: alertListener,
  }

  useSocketEvents(socket, events)

  useErrors(errors)

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <>
      <Stack
        ref={containerRef}
        boxSizing={'border-box'}
        sx={{ padding: '1rem', overflowX: 'hidden', overflowY: 'auto' }}
        spacing={'1rem'}
        bgcolor={gray}
        height={'90%'}
      >
        {allMessages.map((i, index) => (
          <Message key={index} message={i} user={user} />
        ))}

        {isUserTyping && <TypingLoader />}

        <div ref={bottomRef} />
      </Stack>

      <form style={{ height: '10%' }} onSubmit={handleSubmit}>
        <Stack
          direction={'row'}
          height={'100%'}
          alignItems={'center'}
          padding={'1rem'}
          position={'relative'}
          spacing={'1rem'}
        >
          <IconButton onClick={handleFileMenuOpen}>
            <AttachFileIcon />
          </IconButton>
          <InputBox
            placeholder="Type a message..."
            sx={{ fontFamily: 'Nunito Sans' }}
            value={message}
            onChange={messageHandler}
          />
          <IconButton
            sx={{
              bgcolor: primary,
              padding: '0.5rem',
              '&:hover': {
                bgcolor: primaryDark,
              },
              color: 'white',
            }}
            type="submit"
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <FileMenu anchorEl={fileMenuAnchor} chatId={chatId} />
    </>
  )
}

const WrappedChat = memo(AppLayout()(Chat), () => true)
WrappedChat.displayName = 'WrappedChat' // add a display name

export default WrappedChat
