(function () {
  'use strict'

  angular
    .module('app')
    .controller('TrackController', TrackController)

  // Inject dependencies
  TrackController.$inject = [ '$rootScope', '$window', '$scope', 'NgMap', '$location', '$routeParams', 'socketio', '$interval', '$timeout', 'TrackingFactory' ]

  // Controller function
  function TrackController ($rootScope, $window, $scope, NgMap, $location, $routeParams, socketio, $interval, $timeout, TrackingFactory) {
    let vm = this

    let updateTracksCheck = true

    vm.alertMessage = ''
    vm.groupId = $routeParams.groupId
    vm.groupName = $routeParams.groupName
    vm.refreshInterval = 3000
    vm.sendInterval = 3000
    vm.userId = $rootScope.loggedUser.id
    vm.username = $rootScope.loggedUser.username
    vm.track = {userId: vm.userId, username: vm.username, groupId: vm.groupId}
    vm.track.coords = {}
    vm.tracks = []

    // Get current position
    TrackingFactory.getCurrentLocation(socketio, vm.track, vm.groupId, vm.username)

    // Start tracking position function
    vm.startTracking = () => {
      vm.toggleTrackBtn = !vm.toggleTrackBtn
      vm.showSettingsBtn = !vm.showSettingsBtn
      vm.trackInterval = $interval(() => {
        TrackingFactory.getCurrentLocation(socketio, vm.track, vm.groupId, vm.username)
      }, vm.sendInterval)
    }

    // Stop tracking position function
    vm.stopTracking = () => {
      vm.toggleTrackBtn = !vm.toggleTrackBtn
      vm.showSettingsBtn = !vm.showSettingsBtn
      $interval.cancel(vm.trackInterval)
      vm.trackInterval = undefined
    }

    // Set new interval parameters
    vm.setNewIntervals = () => {
      vm.toggleSettings()
      vm.stopTracking()
      vm.startTracking()
      vm.toggleTrackBtn = !vm.toggleTrackBtn
      vm.showSettingsBtn = !vm.showSettingsBtn
    }

    // Change map center to clicked user
    vm.changeMapCenter = (coords) => {
      vm.track.coords.latitude = coords.latitude
      vm.track.coords.longitude = coords.longitude
    }

    // Show/Hide online users
    vm.toggleOnlineUsers = () => {
      vm.toggleOnlineUsersCheck = !vm.toggleOnlineUsersCheck
    }

    // Show/Hide Setings Button
    vm.toggleSettings = () => {
      vm.toggleSettingsCheck = !vm.toggleSettingsCheck
      vm.showTrackBtns = !vm.showTrackBtns
    }

    // Emit leave group event to socket server and back to group page
    vm.leaveGroup = () => {
      socketio.emit('disconnect')
      $location.path('/groups/' + vm.groupId)
    }

    // Socket listener for new locations
    socketio.on('send locations', (locations) => {
      if (updateTracksCheck) {
        console.log('recibo', locations)
        vm.tracks = locations
        updateTracksCheck = !updateTracksCheck
        startRefreshConfig()
      }
    })

    // Socket listener for new notifications
    socketio.on('broadcast', (msg) => {
      vm.alertMessage = msg
      $timeout(() => {
        vm.alertMessage = ''
      }, 3000)
    })

    // Start refreshing config function
    function startRefreshConfig () {
      $timeout(() => {
        updateTracksCheck = !updateTracksCheck
      }, vm.refreshInterval)
    }
  }
})()
