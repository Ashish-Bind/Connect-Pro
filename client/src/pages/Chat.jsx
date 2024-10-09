import { useInfiniteScrollTop } from '6pp'
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from '@mui/icons-material'
import { IconButton, Skeleton, Stack } from '@mui/material'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppLayout from '../components/layout/AppLayout'
import Message from '../components/MessageComponent'
import { InputBox } from '../components/styles/StyledComponent'
import { gray, primary, primaryDark } from '../constants/color'
import { NEW_MESSAGE } from '../constants/events'
import { useErrors, useSocketEvents } from '../hooks/customHooks'
import {
  useGetChatDetailsQuery,
  useGetOldMessagesQuery,
} from '../redux/query/api'
import { useSocket } from '../utils/socket'
import { setIsFileMenu } from '../redux/reducer/misc'
import FileMenu from '../components/dialogs/FileMenu'

const Chat = ({ chatId }) => {
  const dispatch = useDispatch()

  const containerRef = React.useRef(null)
  const [message, setMessage] = React.useState('')
  const [messages, setMessages] = React.useState([])
  const [page, setPage] = React.useState(1)
  const [fileMenuAnchor, setFileMenuAnchor] = React.useState(null)

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

  const allMessages = [...oldMessages, ...messages].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!message) return

    const members = chatDetails?.data?.chat?.members.map((i) => i._id)

    socket.emit(NEW_MESSAGE, {
      message,
      members,
      chatId,
    })
    setMessage('')
  }

  const newMessageHandler = useCallback((data) => {
    setMessages((prev) => [...prev, data])
  }, [])

  const events = { [NEW_MESSAGE]: newMessageHandler }

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
            sx={{ fontFamily: 'Open Sans' }}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
            }}
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

const WrappedChat = React.memo(AppLayout()(Chat), () => true)
WrappedChat.displayName = 'WrappedChat' // add a display name

export default WrappedChat
