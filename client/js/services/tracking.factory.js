(function () {
  'use strict'

  angular
    .module('app')
    .factory('TrackingFactory', TrackingFactory)

  TrackingFactory.$inject = [ ]

  function TrackingFactory () {
    let service = {
      getCurrentLocation
    }

    return service

    // //////////

    function getCurrentLocation (socketio, track, groupId, username) {
      navigator.geolocation.getCurrentPosition(function (position) {
        track.coords.latitude = position.coords.latitude
        track.coords.longitude = position.coords.longitude
        socketio.emit('new track', track)
        socketio.emit('joinGroup', { groupId, username })
      })
    }
  }
})()
