(function () {
  angular
  .module('app')
  .factory('AuthFactory', [
    '$http', '$q', '$rootScope', '$location', 'StorageFactory', 'jwtHelper', AuthFactory
  ])

  function AuthFactory ($http, $q, $rootScope, $location, StorageFactory, jwtHelper) {
    return {
      login,
      register,
      logout,
      isLoggedIn,
      setCredentials
    }

    function login (credentials) {
      const url = '/api/login'
      return $http.post(url, credentials)
      .then(response => response.data.token)
      .then(token => {
        StorageFactory.saveToken(token)
        return token
      })
    }

    function register (credentials) {
      const url = '/api/register'
      return $http.post(url, credentials)
      .then($location.path('/login'))
    }

    function logout () {
      delete $rootScope.loggedUser
      StorageFactory.removeToken()
    }

    function isLoggedIn () {
      const token = StorageFactory.readToken()
      if (!token) return false
      const tokenPayload = jwtHelper.decodeToken(token)
      return !(jwtHelper.isTokenExpired(token))
    }

    function setCredentials (token) {
      var tokenPayload = jwtHelper.decodeToken(token)
      $rootScope.loggedUser = tokenPayload
    }
  }
})()
