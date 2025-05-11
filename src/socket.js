import io from 'socket.io-client'

let socket
const connectSocket = (user_id) => {
  socket = io('http://localhost:8000', {
    query: {
      user_id
    }
  })

  return socket
}
const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
  }
}
const getSocket = (user_id) => {
  if (!socket) {
    socket = connectSocket(user_id)
  }
  return socket
}

export { connectSocket, disconnectSocket, getSocket }
