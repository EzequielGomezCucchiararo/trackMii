(function () {
  'use strict'

  angular
    .module('app')
    .factory('socketio', socketio)

  socketio.$inject = [ '$rootScope' ]

  function socketio ($rootScope) {
    let socket = io.connect()
    let service = { on, emit }

    return service

    // //////////

    function on (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments
        $rootScope.$apply(function () {
          callback.apply(socket, args)
        })
      })
    }

    function emit (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args)
          }
        })
      })
    }
  }
})()
