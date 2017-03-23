(function () {
  'use strict'

  angular
    .module('app')
    .controller('LoginController', LoginController)

  // Inject dependencies
  LoginController.$inject = [ '$location', 'AuthFactory' ]

  // Controller function
  function LoginController ($location, AuthFactory) {
    let vm = this

    // Login function
    vm.login = function () {
      const username = vm.username
      const password = vm.password
      AuthFactory.login({ username, password })
        .then(AuthFactory.setCredentials)
        .then(() => $location.path('/home'))
        .catch(() => { vm.errorMessage = 'Username or password are wrong' })
    }
  }
})()
