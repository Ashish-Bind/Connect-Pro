/* eslint-disable react/prop-types */
import { Stack } from '@mui/material'
import React from 'react'
import ChatItem from './ChatItem'
import { useSelector } from 'react-redux'

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
  const { user } = useSelector((state) => state.auth)
  console.log(chats)

  return (
    <Stack
      width={w}
      direction={'column'}
      sx={{ overflow: 'auto', height: '100%' }}
    >
      {chats?.map((chat, index) => {
        const {
          _id,
          name,
          groupChat,
          avatar,
          members,
          username,
          groupAvatar,
          otherMember,
        } = chat

        const newMessageAlerts = newMessageAlert.find(
          ({ chatId }) => chatId === _id
        )
        const sameSender = chatId === _id

        console.log(members)

        const isOnline = !groupChat && onlineUsers.includes(otherMember)

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
            groupAvatar={groupAvatar}
            sameSender={sameSender}
            username={username}
            members={members}
            handleDeleteChatOpen={handleDeleteChat}
          />
        )
      })}

      {/* <Stack sx={{ marginTop: 'auto' }}>
        <ChatItem
          index={1}
          key={1}
          _id={'1'}
          name={'ConnectPro. AI'}
          avatar={
            'https://res.cloudinary.com/dpjoc6hra/image/upload/v1728498301/bfye4kbb7ykcwljg6poi.jpg'
          }
          username={'connectpro.ai'}
          members={[]}
          customUrl="/ai-chat"
        />
      </Stack> */}
    </Stack>
  )
}

export default ChatList
