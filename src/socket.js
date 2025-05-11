import io from 'socket.io-client'

let socket
const connectSocket = (user_id) => {
  socket = io('http://localhost:8000', {
    query: `user_id=${user_id}`
  })
  socket.connect()
  return socket
}
const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
  }
}
const getSocket = () => {
  if (!socket) {
    socket = connectSocket()
  }
  return socket
}

export { connectSocket, disconnectSocket, getSocket }
