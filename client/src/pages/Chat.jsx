import React from 'react'
import AppLayout  from '../components/layout/AppLayout'

const Chat = () => {
  return <div>Chat</div>
}

const WrappedChat = React.memo(AppLayout()(Chat), () => true)
WrappedChat.displayName = 'WrappedChat' // add a display name

export default WrappedChat
