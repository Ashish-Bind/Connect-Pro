/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import { Drawer, Grid2, Skeleton } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { secondary, tertiary } from '../../constants/color'
import {
  NAVIGATE_TO,
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USERS,
  REFETCH_CHATS,
} from '../../constants/events'
import { useErrors, useSocketEvents } from '../../hooks/customHooks'
import { getOrSaveFromStorage } from '../../libs/features'
import { useGetChatsQuery } from '../../redux/query/api'
import {
  incrementNotification,
  setNewMessagesAlert,
} from '../../redux/reducer/chat'
import { setIsMobile } from '../../redux/reducer/misc'
import { useSocket } from '../../utils/socket'
import ChatList from '../ChatList'
import Profile from '../ProfileCard'
import Title from '../Title'
import Header from './Header'

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const [onlineUsers, setOnlineUsers] = useState([])
    const { isMobile } = useSelector((state) => state.misc)
    const { newMessagesAlert } = useSelector((state) => state.chat)
    const { user } = useSelector((state) => state.auth)
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const chatId = params.id

    const socket = useSocket()

    const { data, isError, isLoading, error, refetch } = useGetChatsQuery('')

    useErrors([{ isError, error }])

    useEffect(() => {
      getOrSaveFromStorage({
        key: NEW_MESSAGE_ALERT,
        value: newMessagesAlert,
        get: false,
      })
    }, [newMessagesAlert])

    const handleDeleteChat = (e, chatId, groupChat) => {
      e.preventDefault()
      console.log('Delete chat', chatId, groupChat)
    }

    const handleMobileClose = () => {
      dispatch(setIsMobile(false))
    }

    const newMessageAlertListener = useCallback(
      (data) => {
        if (data.chatId === chatId) return
        dispatch(setNewMessagesAlert(data))
        console.log(data)
      },
      [chatId]
    )

    const newRequestListener = useCallback(
      (data) => {
        dispatch(incrementNotification())
      },
      [dispatch]
    )

    const refetchListener = useCallback(() => {
      refetch()
    }, [refetch])

    const navigateToListener = useCallback(
      (data) => {
        navigate('/')
        if (data) {
          toast.error(data)
        }
      },
      [navigate]
    )

    const onlineUserListener = useCallback(
      (data) => {
        console.log(data)
        setOnlineUsers(data)
      },
      [data]
    )

    const events = {
      [NEW_MESSAGE_ALERT]: newMessageAlertListener,
      [NEW_REQUEST]: newRequestListener,
      [REFETCH_CHATS]: refetchListener,
      [NAVIGATE_TO]: navigateToListener,
      [ONLINE_USERS]: onlineUserListener,
    }

    useSocketEvents(socket, events)

    return (
      <>
        <Title />
        <Header />

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data.chats}
              chatId={chatId}
              onlineUsers={onlineUsers}
              newMessageAlert={newMessagesAlert}
              handleDeleteChat={handleDeleteChat}
            />
          </Drawer>
        )}

        <Grid2 container height={'calc(100vh - 4rem)'}>
          <Grid2
            size={{ sm: 4, md: 3 }}
            sx={{
              display: { xs: 'none', sm: 'block' },
            }}
            height={'100%'}
            bgcolor={tertiary}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data.chats}
                chatId={chatId}
                onlineUsers={onlineUsers}
                newMessageAlert={newMessagesAlert}
                handleDeleteChat={handleDeleteChat}
              />
            )}
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 8, md: 5, lg: 6 }} height={'100%'}>
            <WrappedComponent {...props} chatId={chatId} />
          </Grid2>

          <Grid2
            size={{ md: 4, lg: 3 }}
            height={'100%'}
            sx={{
              backgroundColor: secondary,
              display: { xs: 'none', md: 'block' },
            }}
          >
            <Profile />
          </Grid2>
        </Grid2>
      </>
    )
  }
}

export default AppLayout
