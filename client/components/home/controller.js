(function () {
  'use strict'

  angular
    .module('app')
    .controller('HomeController', HomeController)

  // Inject dependencies
  HomeController.$inject = [ '$rootScope', '$window', '$location', '$routeParams', '$http', '$timeout', 'AuthFactory', 'DataFactory' ]

  // Controller function
  function HomeController ($rootScope, $window, $location, $routeParams, $http, $timeout, AuthFactory, DataFactory) {
    let vm = this
    let groupToAdd = {}
    let groupToJoin = {}

    $rootScope.currentGroup = ''

    vm.activeMember = 'active'
    vm.activeAdmin = ''
    vm.showGroupCheck = true
    vm.userId = $rootScope.loggedUser.id
    vm.username = $rootScope.loggedUser.username

    // Get the list of group (just as member)
    getListAsMember()

    // Get the list of group (as admin & as member)
    getListAsAdmin()

    // Join a new group
    vm.joinGroup = () => {
      groupToJoin.groupId = vm.joinGroupPassword
      groupToJoin.userId = vm.userId
      DataFactory.joinGroup(groupToJoin)
      .then(response => {
        vm.joinGroupPassword = ''
        $window.location.reload()
      })
    }

    // Logout
    vm.logout = () => {
      AuthFactory.logout()
      $location.path('/login')
    }

    // Toggle asAdmin / asMember lists
    vm.toggleGroup = () => {
      vm.activeMember = (vm.activeMember === 'active') ? '' : 'active'
      vm.activeAdmin = (vm.activeAdmin === 'active') ? '' : 'active'
      vm.showGroupCheck = !vm.showGroupCheck
    }

  // Create a new group
    vm.addGroup = () => {
      if (checkGroupName()) {
        DataFactory.createGroup(groupToAdd)
        .then(response => {
          vm.newGroupName = ''
          $window.location.reload()
        })
      }
    }

    // Check if group name is provided and execute the methods neeed
    function checkGroupName () {
      if (vm.newGroupName) {
        groupToAdd.groupName = vm.newGroupName
        groupToAdd.admin = vm.userId
        groupToAdd.members = [{
          username: vm.username,
          userId: vm.userId
        }]
        return true
      } else {
        vm.errorMessage = 'A name for the group is needed.'
        return false
      }
    }

    // Greet Message with hide timeout
    function msgGreeting () {
      if (!$rootScope.firstLoginGreeting) {
        $rootScope.firstLoginGreeting = true
        $timeout(() => {
          vm.successMessage = 'Welcome ' + vm.username + ' !!'
          $timeout(() => {
            vm.successMessage = ''
          }, 3000)
        }, 750)
      }
    }

    // Get group list as member func
    function getListAsMember () {
      return DataFactory.getListAsMember(vm.userId)
      .then(response => {
        $rootScope.currentGroup = response.groupName
        vm.groupsAsMember = response
        msgGreeting()
      })
    }

    // Get group list as admin func
    function getListAsAdmin () {
      return DataFactory.getListAsAdmin(vm.userId)
      .then(response => { vm.groupsAsAdmin = response })
    }
  }
})()
