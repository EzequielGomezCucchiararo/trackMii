angular.module('app')
  .controller('RegisterCtrl', ['AuthFactory', RegisterCtrl])

function RegisterCtrl (AuthFactory) {
  let vm = this

  vm.register = function () {
    const username = vm.username
    const password = vm.password
    AuthFactory.register({ username, password })
  }
}
