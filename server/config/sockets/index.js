module.exports = function (io) {
  let ioTracks = {}

  io.sockets.on('connection', function (socket) {
    console.log(`Socket connected`)

  // when server detect a new track
    socket.on('new track', track => {
      if (socket.userId == track.userId) {
        ioTracks[socket.groupId].map(trackToCheck => {
          if (trackToCheck.userId == track.userId) {
            trackToCheck.coords = track.coords
            return trackToCheck
          } else {
            return trackToCheck
          }
        })
        io.sockets.in(socket.groupId).emit('send locations', ioTracks[socket.groupId])
      } else {
        socket.userId = track.userId
        socket.groupId = track.groupId
        socket.coords = track.coords
        ioTracks[socket.groupId] ? ioTracks[socket.groupId].push(track) : ioTracks[socket.groupId] = [track]
        console.log(ioTracks)
      }
    })

  // when the user disconnects.. perform this
    socket.on('leaveGroup', () => {
      socket.leave(socket.groupId)
      let newTracks = []
      ioTracks[socket.groupId].forEach(track => {
        if (track.userId != socket.userId) newTracks.push(track)
      })
      ioTracks[socket.groupId] = newTracks
    })

  // when the user disconnects.. perform this
    socket.on('joinGroup', (user) => {
      socket.broadcast.emit('broadcast', socket.username + ' is disconnected')
      socket.groupId = user.groupId
      socket.username = user.username
      socket.join(socket.groupId)
      io.sockets.in(socket.groupId).emit('send locations', ioTracks[socket.groupId])
      socket.broadcast.emit('broadcast', socket.username + ' is now connected')
    })

  // when the user disconnects.. perform this
    socket.on('disconnect', () => {
      socket.to(socket.groupId).emit('user disconnect', socket.username + 'is now disconnected')
      let newTracks = []
      if (ioTracks[socket.groupId]) {
        ioTracks[socket.groupId].forEach(track => {
          if (track.userId != socket.userId) newTracks.push(track)
        })
      }
      ioTracks[socket.groupId] = newTracks
      io.sockets.in(socket.groupId).emit('send locations', ioTracks[socket.groupId])
    })
  })
}
