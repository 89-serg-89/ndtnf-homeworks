import { Server, Socket } from 'socket.io'

let roomName: string | string[]
let socket: Socket

const connect = <Type>(server: Type) => {
  const io = new Server(server)
  io.on('connection', socketIO => {
    socket = socketIO
    roomName = socket.handshake.query.roomName
    console.log(`Socket roomName: ${roomName}`)
    socket.join(roomName)
    socket.on('message', onMessage)
  })
}

const onMessage = (msg: object): void => {
  socket.to(roomName).emit('message', msg)
  socket.emit('message', msg)
}

export = connect
