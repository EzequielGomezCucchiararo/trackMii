angular.module('app')
  .controller('GroupCtrl', ['$scope', '$http', '$stateParams', 'DataFactory', GroupCtrl])

function GroupCtrl ($scope, $http, $stateParams, DataFactory) {
  let vm = this
  let mailInfo = {}

  vm.groupId = $stateParams.groupId
  vm.groupName = $stateParams.groupName

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
