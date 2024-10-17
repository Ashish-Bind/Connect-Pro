import React from 'react'
import AppLayout from '../components/layout/AppLayout'

const AssistantChat = () => {
  return <div>AssistantChat</div>
}

const WrappedAssistantChat = React.memo(AppLayout()(AssistantChat), () => true)
WrappedAssistantChat.displayName = 'WrappedAssistantChat' // add a display name=

export default WrappedAssistantChat
