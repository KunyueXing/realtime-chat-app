import { useSocket } from './useSocket'
import { useFriendSocketHandlers } from './useFriendSocketHandlers'

export const useSocketHandlers = ({ userId, isLoggedIn }) => {
  const { socketRef, isConnected, connectionError, disconnect, reconnect, cleanup } = useSocket({ userId, isLoggedIn })

  // Use individual socket event handlers with the shared socket reference
  const friendHandlers = useFriendSocketHandlers(socketRef)

  return {
    isConnected,
    connectionError,
    disconnect,
    reconnect,
    cleanup,
    // individual handlers can be added here as needed
    friendHandlers
  }
}
