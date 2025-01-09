/* eslint-disable react/prop-types */
import { Avatar, Box, Stack, Typography } from '@mui/material'
import { Link } from './styles/StyledComponent'
import React from 'react'
import { mattBlack, primaryDark, primaryDarkest } from '../constants/color'
import { motion } from 'framer-motion'

const ChatItem = ({
  avatar,
  name,
  _id,
  username,
  groupChat = false,
  groupAvatar,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
  customUrl = '',
}) => {
  return (
    <Link
      to={customUrl ? customUrl : `/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
      sx={{
        padding: 0,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: '-100%' }}
        whileInView={{ opacity: 1, y: '0' }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '1rem',
          gap: '1rem',
          position: 'relative',
          backgroundColor: sameSender ? 'rgba(0, 0, 0, 0.1)' : 'unset',
          color: sameSender ? 'black' : 'unset',
        }}
      >
        {groupChat ? (
          <Avatar
            src={groupAvatar && groupAvatar.url}
            sx={{ width: '3rem', height: '3rem' }}
          />
        ) : (
          <Avatar
            src={avatar ? avatar : ''}
            sx={{
              width: '3rem',
              height: '3rem',
            }}
          />
        )}
        <Stack>
          <Typography
            sx={{
              fontFamily: 'Nunito Sans',
              fontWeight: 'bold',
              color: primaryDarkest,
            }}
          >
            {name}
          </Typography>
          {
            <Typography variant="caption" color={mattBlack}>
              @{groupChat ? 'group' : username}
            </Typography>
          }

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
          {!groupChat && (
            <Box
              sx={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: isOnline ? '#AAFF00' : '#CCC',
                position: 'absolute',
                top: '50%',
                right: '1rem',
                transform: 'translateY(-50%)',
              }}
            ></Box>
          )}
        </Stack>
      </motion.div>
    </Link>
  )
}

export default React.memo(ChatItem)
