angular.module('app')
  .controller('LoginCtrl', ['$location', 'AuthFactory', LoginCtrl])

function LoginCtrl ($location, AuthFactory) {
  let vm = this

  vm.login = function () {
    const username = vm.username
    const password = vm.password
    AuthFactory.login({ username, password })
      .then(AuthFactory.setCredentials)
      .then(() => $location.path('/home'))
  }
}
