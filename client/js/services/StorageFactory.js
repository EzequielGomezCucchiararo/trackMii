angular.module('app')
  .factory('StorageFactory', ['$window', StorageFactory])

function StorageFactory ($window) {
  const store = $window.localStorage
  const key = 'auth-token'

  return {
    readToken,
    saveToken,
    removeToken
  }

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
