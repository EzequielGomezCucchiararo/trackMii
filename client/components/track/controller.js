angular.module('app')
  .controller('TrackCtrl', ['$rootScope', '$window', '$scope', 'NgMap', '$location', '$routeParams', 'socketio', '$interval', TrackCtrl])

function TrackCtrl ($rootScope, $window, $scope, NgMap, $location, $routeParams, socketio, $interval) {
  let vm = this

  const username = $rootScope.loggedUser.username
  const userId = $rootScope.loggedUser.id

  let updateTracksChech = true

  vm.groupId = $routeParams.groupId
  vm.groupName = $routeParams.groupName
  vm.tracks = []
  vm.track = {userId, username, groupId: vm.groupId}
  vm.track.coords = {}
  vm.alertMessage = ''
  vm.refreshInterval = 5000
  vm.sendInterval = 5000

  // get current position
  navigator.geolocation.getCurrentPosition(function (position) {
    vm.track.coords.latitude = position.coords.latitude
    vm.track.coords.longitude = position.coords.longitude
    socketio.emit('new track', vm.track)
    socketio.emit('joinGroup', {groupId: vm.groupId, username})
  })

  vm.startTracking = () => {
    vm.toggleTrackBtn = !vm.toggleTrackBtn
    vm.trackInterval = $interval(() => {
      navigator.geolocation.getCurrentPosition(function (position) {
        vm.track.coords.latitude = position.coords.latitude
        vm.track.coords.longitude = position.coords.longitude
        socketio.emit('new track', vm.track)
      })
    }, vm.sendInterval)
  }

  vm.stopTracking = () => {
    vm.toggleTrackBtn = !vm.toggleTrackBtn
    $interval.cancel(vm.trackInterval)
    vm.trackInterval = undefined
  }

  $interval(() => {
    updateTracksChech = !updateTracksChech
  }, vm.refreshInterval)

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
    $location.path('/groups/' + vm.groupId)
  }

  socketio.on('send locations', (locations) => {
    if (updateTracksChech) {
      vm.tracks = locations
    }
  })

  socketio.on('broadcast', (msg) => {
    vm.alertMessage = msg
  })
}
