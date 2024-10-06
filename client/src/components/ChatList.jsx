/* eslint-disable react/prop-types */
import { Stack } from '@mui/material'
import React from 'react'
import ChatItem from './ChatItem'

const ChatList = ({
  w = '100%',
  chats = [],
  chatId,
  onlineUsers = [],
  newMessageAlert = [
    {
      chatId: '',
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <Stack
      width={w}
      direction={'column'}
      sx={{ overflow: 'auto', height: '100%' }}
    >
      {chats?.map((chat, index) => {
        const { _id, name, groupChat, avatar, members } = chat

        const newMessageAlerts = newMessageAlert.find(
          ({ chatId }) => chatId === _id
        )
        const sameSender = chatId === _id

        const isOnline = members?.some((member) => onlineUsers.includes(member))

        return (
          <ChatItem
            index={index}
            key={_id}
            _id={_id}
            newMessageAlert={newMessageAlerts}
            isOnline={isOnline}
            name={name}
            avatar={avatar}
            groupChat={groupChat}
            sameSender={sameSender}
            members={members}
            handleDeleteChatOpen={handleDeleteChat}
          />
        )
      })}
    </Stack>
  )
}

export default ChatList