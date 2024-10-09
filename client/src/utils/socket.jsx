import { createContext, useContext, useMemo } from 'react'
import io from 'socket.io-client'
import { SERVER } from '../constants/config'

const SocketContext = createContext()

export const useSocket = () => useContext(SocketContext)

const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io(SERVER, { withCredentials: true }), [])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}

export default SocketProvider
