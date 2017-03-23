(function () {
  'use strict'

  angular
    .module('app')
    .factory('AuthFactory', AuthFactory)

  AuthFactory.$inject = [ '$http', '$q', '$rootScope', '$location', 'StorageFactory', 'jwtHelper' ]

  function AuthFactory ($http, $q, $rootScope, $location, StorageFactory, jwtHelper) {
    let service = {
      login,
      register,
      logout,
      isLoggedIn,
      setCredentials
    }

    return service

    // //////////

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
      return !(jwtHelper.isTokenExpired(token))
    }

    function setCredentials (token) {
      var tokenPayload = jwtHelper.decodeToken(token)
      $rootScope.loggedUser = tokenPayload
    }
  }
})()
