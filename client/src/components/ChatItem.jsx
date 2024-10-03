/* eslint-disable react/prop-types */
import { Avatar, Box, Stack, Typography } from '@mui/material'
import { Link } from './styles/StyledComponent'
import React from 'react'

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  console.log(isOnline,newMessageAlert)
  return (
    <Link
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
      sx={{
        padding: 0,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0.5rem',
          gap: '1rem',
          position: 'relative',
          backgroundColor: sameSender ? 'rgba(0, 0, 0, 0.2)' : 'unset',
          color: sameSender ? 'white' : 'unset',
        }}
      >
        {avatar && (
          <Avatar
            src={avatar}
            sx={{
              width: '2.5rem',
              height: '2.5rem',
            }}
          />
        )}
        <Stack>
          <Typography>{name}</Typography>

          {newMessageAlert && newMessageAlert.count > 0 && (
            <Typography
              sx={{
                fontSize: '0.7rem',
                color: 'rgba(0, 0, 0, 0.5)',
              }}
            >
              {newMessageAlert.count} new message
            </Typography>
          )}

          {isOnline && (
            <Box
              sx={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: 'green',
                position: 'absolute',
                top: '50%',
                right: '1rem',
                transform: 'translateY(-50%)',
              }}
            ></Box>
          )}
        </Stack>
      </div>
    </Link>
  )
}

export default React.memo(ChatItem)
