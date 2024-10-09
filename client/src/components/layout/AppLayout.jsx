/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import { useParams } from 'react-router-dom'
import ChatList from '../ChatList'
import Title from '../Title'
import Header from './Header'
import { Drawer, Grid2, Skeleton } from '@mui/material'
import Profile from '../ProfileCard'
import { secondary, tertiary } from '../../constants/color'
import { useGetChatsQuery } from '../../redux/query/api'
import { useDispatch, useSelector } from 'react-redux'
import { setIsMobile } from '../../redux/reducer/misc'
import { useErrors, useSocketEvents } from '../../hooks/customHooks'
import { useSocket } from '../../utils/socket'
import { NEW_MESSAGE_ALERT, NEW_REQUEST } from '../../constants/events'
import { useCallback } from 'react'

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const { isMobile } = useSelector((state) => state.misc)
    const params = useParams()
    const dispatch = useDispatch()
    const chatId = params.id

    const socket = useSocket()

    const { data, isError, isLoading, error, refetch } = useGetChatsQuery('')

    useErrors([{ isError, error }])

    console.log(data?.chats)

    const handleDeleteChat = (e, chatId, groupChat) => {
      e.preventDefault()
      console.log('Delete chat', chatId, groupChat)
    }

    const handleMobileClose = () => {
      dispatch(setIsMobile(false))
    }

    const newMessageAlertHandler = useCallback((data) => {}, [])

    const newRequestHandler = useCallback((data) => {}, [])

    const events = {
      [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
      [NEW_REQUEST]: newRequestHandler,
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
              onlineUsers={[1, 2]}
              newMessageAlert={[{ chatId: '1', count: 5 }]}
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
                onlineUsers={[1, 2]}
                newMessageAlert={[{ chatId: '1', count: 5 }]}
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
            sx={{ backgroundColor: secondary }}
          >
            <Profile />
          </Grid2>
        </Grid2>
      </>
    )
  }
}

export default AppLayout
