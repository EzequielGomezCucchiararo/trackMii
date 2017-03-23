(function () {
  'use strict'

  angular
    .module('app')
    .factory('StorageFactory', StorageFactory)

  StorageFactory.$inject = [ '$window' ]

  function StorageFactory ($window) {
    const store = $window.localStorage
    const key = 'auth-token'

    let service = {
      readToken,
      saveToken,
      removeToken
    }

    return service

    // //////////

    function readToken () {
      return store.getItem(key)
    }

    function saveToken (token) {
      return !!store.setItem(key, token)
    }

    function removeToken () {
      return store.removeItem(key)
    }
  }
})()
