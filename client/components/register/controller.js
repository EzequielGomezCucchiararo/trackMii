(function () {
  'use strict'

  angular
    .module('app')
    .controller('RegisterController', RegisterController)

  // Inject dependencies
  RegisterController.$inject = [ 'AuthFactory' ]

  // Controller function
  function RegisterController (AuthFactory) {
    let vm = this

    // Register function
    vm.register = function () {
      const username = vm.username
      const password = vm.password
      const password2 = vm.password2
      password === password2 ? AuthFactory.register({ username, password })
                             : vm.errorMessage = 'Passwords doesn\'t match'
    }
  }
})()
