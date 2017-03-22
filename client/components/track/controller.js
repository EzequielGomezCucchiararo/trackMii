angular.module('app')
  .controller('TrackCtrl', ['$rootScope', '$window', '$scope', 'NgMap', '$location', '$routeParams', 'socketio', TrackCtrl])

function TrackCtrl ($rootScope, $window, $scope, NgMap, $location, $routeParams, socketio) {
  let vm = this

  const username = $rootScope.loggedUser.username
  const userId = $rootScope.loggedUser.id

  vm.groupId = $routeParams.groupId
  vm.groupName = $routeParams.groupName
  vm.tracks = []
  vm.track = {userId, username, groupId: vm.groupId}

  vm.track.coords = {}
  vm.alertMessage = ''

  // get current position
  navigator.geolocation.getCurrentPosition(function (position) {
    vm.track.coords.latitude = position.coords.latitude
    vm.track.coords.longitude = position.coords.longitude
    socketio.emit('new track', vm.track)
    socketio.emit('joinGroup', {groupId: vm.groupId, username})
  })

  vm.changeMapCenter = (coords) => {
    vm.track.coords.latitude = coords.latitude
    vm.track.coords.longitude = coords.longitude
  }

  vm.leaveGroup = () => {
    socketio.emit('leaveGroup')
    $location.path('/groups/' + vm.groupId)
  }

  socketio.on('send locations', (locations) => {
    vm.tracks = locations
    console.log(vm.tracks)
  })

  socketio.on('broadcast', (msg) => {
    vm.alertMessage = msg
  })
}
