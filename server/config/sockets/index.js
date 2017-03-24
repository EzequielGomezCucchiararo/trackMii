module.exports = function (io) {
  let ioTracks = {}

  io.sockets.on('connection', function (socket) {
    console.log(`Socket connected`)

  // when server detect a new track
    socket.on('new track', track => {
      socket.groupId = track.groupId
      socket.coords = track.coords
      if (socket.userId == track.userId) {
        let newTracks = []
        ioTracks[socket.groupId].forEach(newTrack => {
          console.log(newTrack)
          if (newTrack.userId == track.userId) {
            newTrack.coords = track.coords
          }
          newTracks.push(newTrack)
        })
        ioTracks[socket.groupId] = newTracks
      } else {
        socket.userId = track.userId
        ioTracks[socket.groupId] ? ioTracks[socket.groupId].push(track) : ioTracks[socket.groupId] = [track]
      }
      io.sockets.in(socket.groupId).emit('send locations', ioTracks[socket.groupId])
    })

  // when the user disconnects.. perform this
    socket.on('leaveGroup', () => {
      socket.leave(socket.groupId)
      socket.broadcast.emit('broadcast', socket.username + ' is disconnected')
      let newTracks = []
      if (ioTracks[socket.groupId]) {
        ioTracks[socket.groupId].forEach(track => {
          if (track.userId != socket.userId) newTracks.push(track)
        })
      }
      ioTracks[socket.groupId] = newTracks
    })

  // when the user disconnects.. perform this
    socket.on('joinGroup', (user) => {
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
