angular.module('app')
  .factory('DataFactory', ['$http', DataFactory])

function DataFactory ($http) {
  return {
    getListAsMember,
    getListAsAdmin,
    joinGroup,
    createGroup,
    getMembers,
    sendEmail
  }

  function getListAsMember (userId) {
    const url = '/groups/listAsMember/' + userId
    return $http.get(url)
                .then(response => {
                  return response.data
                }, error => {
                  return error
                })
  }

  function getListAsAdmin (userId) {
    const url = '/groups/listAsAdmin/' + userId
    return $http.get(url)
                .then(response => {
                  return response.data
                }, error => {
                  return error
                })
  }

  function joinGroup (group) {
    const url = '/groups/join'
    return $http.post(url, group)
                .then(response => {
                  return response
                }, (error) => {
                  return error
                }
              )
  }

  function createGroup (group) {
    const url = '/groups/add'
    return $http.post(url, group)
            .then(response => {
              return response
            }, (error) => {
              return error
            })
  }

  function getMembers (groupId) {
    const url = '/group/' + groupId
    return $http.get(url)
          .then(response => {
            return response.data
          }, (error) => {
            return error
          })
  }

  function sendEmail (mailInfo) {
    const url = '/group/sendEmail'
    return $http.post(url, mailInfo)
            .then(response => {
              return response
            }, (error) => {
              return error
            })
  }
}
