/* eslint-disable react/display-name */
import { useParams } from 'react-router-dom'
import { chats } from '../../constants/data'
import ChatList from '../ChatList'
import Title from '../Title'
import Header from './Header'
import { Grid2 } from '@mui/material'
import Profile from '../ProfileCard'
import { secondary, tertiary } from '../../constants/color'

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams()
    const chatId = params.id

    const handleDeleteChat = (e, chatId, groupChat) => {
      e.preventDefault()
      console.log('Delete chat', chatId, groupChat)
    }

    return (
      <>
        <Title />
        <Header />
        <Grid2 container height={'calc(100vh - 4rem)'}>
          <Grid2
            size={{ sm: 4, md: 3 }}
            sx={{
              display: { xs: 'none', sm: 'block' },
            }}
            height={'100%'}
            bgcolor={tertiary}
          >
            <ChatList
              chats={chats}
              chatId={chatId}
              onlineUsers={[1, 2]}
              newMessageAlert={[{ chatId: '1', count: 5 }]}
              handleDeleteChat={handleDeleteChat}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 8, md: 5, lg: 6 }} height={'100%'}>
            <WrappedComponent {...props} />
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
