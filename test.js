socket.on('new track', track => {
  // if (socket.userId == track.userId) {
  //   ioTracks[socket.groupId].map(trackToCheck => {
  //     if (trackToCheck.userId == track.userId) {
  //       trackToCheck.coords = track.coords
  //       return trackToCheck
  //     } else {
  //       return trackToCheck
  //     }
  //   })
  // } else {
  if (socket.userId == track.userId) {

  }
  socket.userId = track.userId
  socket.groupId = track.groupId
  socket.coords = track.coords
  ioTracks[socket.groupId] ? ioTracks[socket.groupId].push(track) : ioTracks[socket.groupId] = [track]
  // }
})
