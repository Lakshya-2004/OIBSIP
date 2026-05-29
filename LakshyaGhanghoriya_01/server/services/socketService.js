let io = null

export const initializeSocket = (
  socketIo
) => {
  io = socketIo

  io.on('connection', (socket) => {
    console.log(
      `Socket Connected: ${socket.id}`
    )

    socket.on('disconnect', () => {
      console.log(
        `Socket Disconnected: ${socket.id}`
      )
    })
  })
}

export const emitEvent = (
  eventName,
  data
) => {
  if (io) {
    io.emit(eventName, data)
  }
}