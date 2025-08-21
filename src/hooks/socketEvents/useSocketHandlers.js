import { useSocket } from './useSocket'

export const useSocketHandlers = ({ userId, isLoggedIn }) => {
  const { socketRef, isConnected, connectionError, disconnect, reconnect, cleanup } = useSocket({ userId, isLoggedIn })

  // Use individual socket event handlers with the shared socket reference

  return {
    isConnected,
    connectionError,
    disconnect,
    reconnect,
    cleanup
    // individual handlers can be added here as needed
  }
}
