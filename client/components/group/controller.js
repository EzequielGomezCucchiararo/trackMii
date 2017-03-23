(function () {
  'use strict'

  angular
    .module('app')
    .controller('GroupController', GroupController)

  GroupController.$inject = [ '$rootScope', '$scope', '$timeout', '$http', '$routeParams', 'DataFactory' ]

  function GroupController ($rootScope, $scope, $timeout, $http, $routeParams, DataFactory) {
    let vm = this
    let mailInfo = {}

    mailInfo.groupId = vm.groupId

    vm.groupId = $routeParams.groupId
    vm.groupName = $routeParams.groupName
    vm.onlineUSers = []

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
    }

    vm.inOnline = (memberId) => {
      if (vm.onlineUSers.indexOf(memberId) !== -1) {
        return true
      }
      return false
    }

    // Get members list func
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
