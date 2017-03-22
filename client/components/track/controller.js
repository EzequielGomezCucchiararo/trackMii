angular.module('app')
  .controller('TrackCtrl', ['$window', '$scope', 'NgMap', '$state', '$stateParams', 'socketio', TrackCtrl])

function TrackCtrl ($window, $scope, NgMap, $state, $stateParams, socketio) {
  let vm = this
  const username = localStorage.getItem('username')
  const userId = localStorage.getItem('userId')

  vm.groupId = $stateParams.groupId
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

  vm.leaveGroup = (e) => {
    socketio.emit('leaveGroup')
    $state.go('group', {groupId: vm.groupId})
  }

  socketio.on('send locations', (locations) => {
    vm.tracks = locations
    console.log(vm.tracks)
  })

  socketio.on('broadcast', (msg) => {
    vm.alertMessage = msg
  })
}
