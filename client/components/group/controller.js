(function () {
  'use strict'

  angular
    .module('app')
    .controller('GroupController', GroupController)

  // Inject dependencies
  GroupController.$inject = [ '$rootScope', '$scope', '$timeout', '$http', '$routeParams', 'DataFactory' ]

  // Controller function
  function GroupController ($rootScope, $scope, $timeout, $http, $routeParams, DataFactory) {
    let vm = this
    let mailInfo = {}

    vm.groupId = $routeParams.groupId
    vm.groupName = $routeParams.groupName
    vm.onlineUSers = []

    mailInfo.groupId = vm.groupId
    getMembers()

    // Send mail invitation
    vm.sendEmail = () => {
      mailInfo.address = vm.emailAddress
      vm.emailAddress = ''
      vm.successMessage = 'Invitation has been sent !'
      $timeout(() => {
        vm.successMessage = ''
      }, 3000)
      DataFactory.sendEmail(mailInfo)
      console.log(mailInfo)
    }

    vm.inOnline = (memberId) => {
      if (vm.onlineUSers.indexOf(memberId) !== -1) {
        return true
      }
      return false
    }

    // Get members list function
    function getMembers () {
      return DataFactory.getMembers(vm.groupId)
                        .then(response => {
                          if ($rootScope.locations) {
                            vm.onlineUSers = $rootScope.locations.map(track => track.userId)
                          }
                          vm.members = response.members
                        })
    }
  }
})()
