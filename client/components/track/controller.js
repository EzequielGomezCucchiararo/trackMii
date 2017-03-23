(function () {
  'use strict'

  angular
    .module('app')
    .controller('TrackController', TrackController)

  TrackController.$inject = [ '$rootScope', '$window', '$scope', 'NgMap', '$location', '$routeParams', 'socketio', '$interval', '$timeout' ]

  function TrackController ($rootScope, $window, $scope, NgMap, $location, $routeParams, socketio, $interval, $timeout) {
    let vm = this

    let updateTracksCheck = true

    vm.alertMessage = ''
    vm.groupId = $routeParams.groupId
    vm.groupName = $routeParams.groupName
    vm.refreshInterval = 3000
    vm.sendInterval = 3000
    vm.track = {userId: vm.userId, username: vm.username, groupId: vm.groupId}
    vm.track.coords = {}
    vm.tracks = []
    vm.userId = $rootScope.loggedUser.id
    vm.username = $rootScope.loggedUser.username

    // get current position
    navigator.geolocation.getCurrentPosition(function (position) {
      vm.track.coords.latitude = position.coords.latitude
      vm.track.coords.longitude = position.coords.longitude
      socketio.emit('new track', vm.track)
      socketio.emit('joinGroup', {groupId: vm.groupId, username: vm.username})
    })

    vm.startTracking = () => {
      vm.toggleTrackBtn = !vm.toggleTrackBtn
      vm.trackInterval = $interval(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
          vm.track.coords.latitude = position.coords.latitude
          vm.track.coords.longitude = position.coords.longitude
          console.log('envío', vm.track.coords)
          socketio.emit('new track', vm.track)
          socketio.emit('joinGroup', {groupId: vm.groupId, username: vm.username})
        })
      }, vm.sendInterval)
    }

    vm.stopTracking = () => {
      vm.toggleTrackBtn = !vm.toggleTrackBtn
      $interval.cancel(vm.trackInterval)
      vm.trackInterval = undefined
    }

    vm.setNewIntervals = () => {
      vm.toggleSettings()
      vm.stopTracking()
      vm.startTracking()
    }

    vm.changeMapCenter = (coords) => {
      vm.track.coords.latitude = coords.latitude
      vm.track.coords.longitude = coords.longitude
    }

    vm.toggleOnlineUsers = () => {
      vm.toggleOnlineUsersCheck = !vm.toggleOnlineUsersCheck
    }

    vm.toggleSettings = () => {
      vm.toggleSettingsCheck = !vm.toggleSettingsCheck
    }

    vm.leaveGroup = () => {
      socketio.emit('leaveGroup')
      socketio.emit('disconnect')
      $location.path('/groups/' + vm.groupId)
    }

    socketio.on('send locations', (locations) => {
      if (updateTracksCheck) {
        console.log('recibo', locations)
        vm.tracks = locations
        updateTracksCheck = !updateTracksCheck
        startRefreshConfig()
      }
    })

    socketio.on('broadcast', (msg) => {
      vm.alertMessage = msg
      $timeout(() => {
        vm.alertMessage = ''
      }, 3000)
    })

    function startRefreshConfig () {
      $timeout(() => {
        updateTracksCheck = !updateTracksCheck
      }, vm.refreshInterval)
    }
  }
})()
