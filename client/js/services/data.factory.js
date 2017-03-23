(function () {
  'use strict'

  angular
    .module('app')
    .factory('DataFactory', DataFactory)

  DataFactory.$inject = [ '$http' ]

  function DataFactory ($http) {
    let service = {
      getListAsMember,
      getListAsAdmin,
      joinGroup,
      createGroup,
      getMembers,
      sendEmail
    }

    return service

    // //////////

    function getListAsMember (userId) {
      const url = '/groups/listAsMember/' + userId
      return $http.get(url)
                  .then(response => response.data, error => error)
    }

    function getListAsAdmin (userId) {
      const url = '/groups/listAsAdmin/' + userId
      return $http.get(url)
                  .then(response => response.data, error => error)
    }

    function joinGroup (group) {
      const url = '/groups/join'
      return $http.post(url, group)
                  .then(response => response.data, error => error)
    }

    function createGroup (group) {
      const url = '/groups/add'
      return $http.post(url, group)
                  .then(response => response.data, error => error)
    }

    function getMembers (groupId) {
      const url = '/group/' + groupId
      return $http.get(url)
                  .then(response => response.data, error => error)
    }

    function sendEmail (mailInfo) {
      const url = '/group/sendEmail'
      return $http.post(url, mailInfo)
                  .then(response => response.data, error => error)
    }
  }
})()
