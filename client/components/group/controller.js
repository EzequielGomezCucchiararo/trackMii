angular.module('app')
  .controller('GroupCtrl', ['$rootScope', '$scope', '$http', '$routeParams', 'DataFactory', GroupCtrl])

function GroupCtrl ($rootScope, $scope, $http, $routeParams, DataFactory) {
  let vm = this
  let mailInfo = {}

  vm.groupId = $routeParams.groupId
  vm.groupName = $routeParams.groupName
  console.log(vm.groupName)

  mailInfo.groupId = vm.groupId

  // Get members list
  DataFactory.getMembers(vm.groupId)
    .then(response => { vm.members = response.members })

  // Send mail invitation
  vm.sendEmail = () => {
    mailInfo.address = vm.emailAddress
    vm.emailAddress = ''
    DataFactory.sendEmail(mailInfo)
      .then(response => { vm.successMessage = 'Invitation has been sent !' })
  }
}
