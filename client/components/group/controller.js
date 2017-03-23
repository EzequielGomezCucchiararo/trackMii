angular.module('app')
  .controller('GroupCtrl', ['$rootScope', '$scope', '$timeout', '$http', '$routeParams', 'DataFactory', GroupCtrl])

function GroupCtrl ($rootScope, $scope, $timeout, $http, $routeParams, DataFactory) {
  let vm = this
  let mailInfo = {}
  vm.onlineUSers = []

  vm.groupId = $routeParams.groupId
  vm.groupName = $routeParams.groupName
  console.log(vm.groupName)

  mailInfo.groupId = vm.groupId

  // Get members list
  DataFactory.getMembers(vm.groupId)
    .then(response => {
      if ($rootScope.locations) {
        vm.onlineUSers = $rootScope.locations.map(track => {
          return track.userId
        })
      }
      vm.members = response.members
    })

  // Send mail invitation
  vm.sendEmail = () => {
    mailInfo.address = vm.emailAddress
    vm.emailAddress = ''
    vm.successMessage = 'Invitation has been sent !'
    $timeout(() => {
      vm.successMessage = ''
    }, 3000)
    DataFactory.sendEmail(mailInfo)
  }

  vm.inOnline = (memberId) => {
    if (vm.onlineUSers.indexOf(memberId) !== -1) {
      return true
    }
    return false
  }
}
