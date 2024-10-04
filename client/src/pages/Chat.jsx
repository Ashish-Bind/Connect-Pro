import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { IconButton, Stack } from '@mui/material'
import { gray, primary, primaryDark } from '../constants/color'
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from '@mui/icons-material'
import { InputBox } from '../components/styles/StyledComponent'
import { messages } from '../constants/data'
import Message from '../components/MessageComponent'

const Chat = () => {
  const containerRef = React.useRef(null)

  const user = {
    name: 'Ashish',
    _id: '1',
  }

  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing={'border-box'}
        sx={{ padding: '1rem', overflowX: 'hidden', overflowY: 'auto' }}
        spacing={'1rem'}
        bgcolor={gray}
        height={'90%'}
      >
        {/* {Message render} */}
        {messages.map((i, index) => (
          <Message key={index} message={i} user={user} />
        ))}
      </Stack>

      <form style={{ height: '10%' }}>
        <Stack
          direction={'row'}
          height={'100%'}
          alignItems={'center'}
          padding={'1rem'}
          position={'relative'}
          spacing={'1rem'}
        >
          <IconButton sx={{ position: 'absolute', left: '1rem' }}>
            <AttachFileIcon />
          </IconButton>
          <InputBox
            placeholder="Type a message..."
            sx={{ fontFamily: 'Open Sans' }}
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
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
    </>
  )
}

const WrappedChat = React.memo(AppLayout()(Chat), () => true)
WrappedChat.displayName = 'WrappedChat' // add a display name

export default WrappedChat
