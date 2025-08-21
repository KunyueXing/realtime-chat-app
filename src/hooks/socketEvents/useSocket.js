import { useEffect, useState, useRef, useCallback } from 'react'
import { getSocket } from '../../socket'

export const useSocket = ({ userId, isLoggedIn }) => {
  const socketRef = useRef(null)
  const [isconnected, setConnected] = useState(false)
  const [connectionError, setConnectionError] = useState(null)
  const reconnectTimeoutRef = useRef(null)
  const reconnectAttemptsRef = useRef(0)
  const maxRecconectAttempts = 5
  const maxReconnectDelay = 5000 // 5 seconds

  const cleanup = useCallback(() => {
    // Cleanup function to remove all listeners and disconnect the socket
    if (socketRef.current) {
      socketRef.current.removeAllListeners()
      socketRef.current.disconnect()
      socketRef.current = null
    }
    // Clear the timeout if it exists
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }
    setConnected(false) // Reset connection state
    reconnectAttemptsRef.current = 0 // Reset reconnect attempts
    setConnectionError(null) // Reset connection error
  }, [])

  const connectSocket = useCallback(() => {
    if (isLoggedIn && userId) {
      const newSocket = getSocket(userId)
      socketRef.current = newSocket
    }
  }, [userId, isLoggedIn])

  useEffect(() => {
    if (!isLoggedIn || !userId) {
      cleanup()
      return
    }

    if (!socketRef.current) {
      try {
        const socket = getSocket(userId)
        socketRef.current = socket

        // Connection event handlers - stored in refs to avoid re-creating them on every render
        const handleConnect = () => {
          console.log('Socket connected:', userId)
          setConnected(true)
          setConnectionError(null)
          reconnectAttemptsRef.current = 0 // Reset reconnect attempts on successful connection
        }

        const handleDisconnect = (reason) => {
          console.log('Socket disconnected:', userId)
          console.log('Reason:', reason)
          setConnected(false)
          setConnectionError('Disconnected from socket')

          // Attempt to reconnect for unexpected disconnections and max attempts not reached
          if (reason != 'io client disconnect' && reconnectAttemptsRef.current < maxRecconectAttempts) {
            const delay = Math.min(maxReconnectDelay, 1000 * Math.pow(2, reconnectAttemptsRef.current))
            reconnectTimeoutRef.current = setTimeout(() => {
              reconnectAttemptsRef.current += 1
              socket.connect()
            }, delay)
          }
        }

        const handleConnectionError = (error) => {
          console.error('Socket connection error:', error)
          setConnectionError(error.message || 'Connection error')
          setConnected(false)
          reconnectAttemptsRef.current += 1

          // Attempt to reconnect for connection errors and max attempts not reached
          if (reconnectAttemptsRef.current < maxRecconectAttempts) {
            const delay = Math.min(maxReconnectDelay, 1000 * Math.pow(2, reconnectAttemptsRef.current))
            reconnectTimeoutRef.current = setTimeout(() => {
              reconnectAttemptsRef.current += 1
              socket.connect()
            }, delay)
          }
        }

        // Attach event listeners
        socket.on('connect', handleConnect)
        socket.on('disconnect', handleDisconnect)
        socket.on('connect_error', handleConnectionError)
      } catch (error) {
        console.error('Error creating or connecting to socket:', error)
        setConnectionError(error.message || 'Connection error')
      }
    }

    // Cleanup on unmount or when dependencies change
    return cleanup
  }, [isLoggedIn, userId, cleanup])
}
