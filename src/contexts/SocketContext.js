import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react'
import { useSelector } from 'react-redux'
import io from 'socket.io-client'
import PropTypes from 'prop-types'

const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
  const { user_id, isLoggedIn } = useSelector((state) => state.auth)

  const [connectionState, setConnectionState] = useState({
    isConnected: false,
    isConnecting: false,
    reconnectAttempts: 0,
    error: null
  })

  const socketRef = useRef(null)
  const reconnectTimeoutRef = useRef(null)
  const maxReconnectAttempts = 5

  const cleanup = useCallback(() => {
    console.log('Cleaning up socket connection...')

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }

    if (socketRef.current) {
      socketRef.current.removeAllListeners()
      socketRef.current.disconnect()
      socketRef.current = null
    }

    setConnectionState({
      isConnected: false,
      isConnecting: false,
      reconnectAttempts: 0,
      error: null
    })
  }, [])

  // Core connection management
  useEffect(() => {
    if (!isLoggedIn && !user_id) {
      cleanup()
      return
    }

    if (socketRef.current) {
      // Already connected or connecting
      return
    }

    if (connectionState.reconnectAttempts >= maxReconnectAttempts) {
      console.error('Max reconnect attempts reached. Will not attempt further connections.')
      setConnectionState((prev) => ({ ...prev, isConnecting: false, error: 'Max reconnect attempts reached' }))
      return
    }

    setConnectionState((prev) => ({ ...prev, isConnecting: true, error: null }))

    try {
      console.log(`Connecting to socket server as user ${user_id}...`)

      socketRef.current = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:8000', {
        query: { user_id },
        transports: ['websocket'],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        maxReconnectAttempts: maxReconnectAttempts,
        timeout: 10000, // 10 seconds
        forceNew: true, // always create fresh connection
        auth: {
          user_id: user_id,
          timestamp: Date.now()
        }
      })

      const socket = socketRef.current

      // Only handle core connection events here
      socket.on('connect', () => {
        console.log(`Socket connected for user ${user_id} with ID: ${socket.id}`)
        setConnectionState({
          isConnected: true,
          isConnecting: false,
          reconnectAttempts: 0,
          error: null
        })

        socket.emit('verify_connection', { user_id }, (response) => {
          if (response?.success) {
            console.log('Connection verified with server')
          } else {
            console.warn('Connection verification failed')
          }
        })
      })

      socket.on('disconnect', (reason) => {
        console.warn(`Socket disconnected: ${reason}`)
        if (reason === 'io server disconnect') {
          // Server disconnected the socket, need to reconnect manually
          socket.connect()
          return
        }
        setConnectionState((prev) => ({
          ...prev,
          isConnected: false
        }))
      })

      socket.on('connect_error', (error) => {
        console.error(`Socket connection error: ${error}`)
        setConnectionState((prev) => ({
          ...prev,
          isConnected: false,
          isConnecting: false,
          error: error.message,
          reconnectAttempts: prev.reconnectAttempts + 1
        }))
      })

      socket.on('user_validation_failed', () => {
        console.error('User validation failed, disconnectiong...')
        cleanup()
      })
    } catch (error) {
      console.error('Failed to create socket:', error)
      setConnectionState((prev) => ({
        ...prev,
        isConnecting: false,
        error: error.message
      }))
    }

    return cleanup
  }, [cleanup, user_id, isLoggedIn])

  // Emit function with error handling
  const emit = useCallback(
    (event, data, option = {}) => {
      return new Promise((resolve, reject) => {
        if (!socketRef.current?.connected) {
          const error = new Error('Socket not connected')
          console.warn(`Can't emit event - ${event}:`, error.message)
          reject(error)
          return
        }

        const timeout = setTimeout(() => {
          reject(new Error(`Emit timeout for event - ${event}`))
        }, 5000)

        socketRef.current.emit(
          event,
          {
            ...data,
            sender_user_id: user_id,
            timestamp: Date.now()
          },
          (response) => {
            clearTimeout(timeout)

            if (response?.error) {
              console.error(`Server error for event - ${event}:`, response.error)
              reject(new Error(response.error))
            } else {
              console.log(`Event - ${event} emitted successfully`)
              resolve(response)
            }
          }
        )
      })
    },
    [user_id]
  )

  // Manual reconnect
  const reconnect = useCallback(() => {
    if (connectionState.reconnectAttempts < maxReconnectAttempts) {
      console.log('Manual reconnect triggered')
      cleanup()
    } else {
      console.warn('Max reconnection attempts reached')
    }
  }, [connectionState.reconnectAttempts, cleanup])

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        ...connectionState,
        emit,
        reconnect,
        cleanup
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider')
  }

  return context
}

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired
}
