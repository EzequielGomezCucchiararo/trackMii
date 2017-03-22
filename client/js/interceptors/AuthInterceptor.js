angular.module('app')
  .factory('AuthInterceptor', ['StorageFactory', AuthInterceptor])

function AuthInterceptor (StorageFactory) {
  return { request }

  function request (config) {
    const token = StorageFactory.readToken()
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = token
    }
    return config
  }
}
