angular.module('app')
  .controller('HomeCtrl', ['$rootScope', '$window', '$state', '$stateParams', '$http', 'AuthFactory', 'DataFactory', HomeCtrl])

function HomeCtrl ($rootScope, $window, $state, $stateParams, $http, AuthFactory, DataFactory) {
  let vm = this
  let groupToAdd = {}
  let groupToJoin = {}

  vm.username = $stateParams.username
  vm.userId = $rootScope.loggedUser.id
  vm.showGroupCheck = true
  vm.activeMember = 'active'
  vm.activeAdmin = ''

  // Get group list as member
  DataFactory.getListAsMember(vm.userId)
    .then(response => { vm.groupsAsMember = response })

  // Get group list as admin
  DataFactory.getListAsAdmin(vm.userId)
    .then(response => { vm.groupsAsAdmin = response })

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

  // Logout
  vm.logout = () => {
    AuthFactory.logout()
    $state.go('login')
  }

  // Toggle asAdmin / asMember lists
  vm.toggleGroup = () => {
    vm.activeMember = (vm.activeMember === 'active') ? '' : 'active'
    vm.activeAdmin = (vm.activeAdmin === 'active') ? '' : 'active'
    vm.showGroupCheck = !vm.showGroupCheck
  }

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
}
