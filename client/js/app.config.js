(function () {
  'use strict'

  angular
    .module('app')
    .config([ '$httpProvider', interceptor ])
    .config([ '$routeProvider', config ])

    // Interceptor Handler
  function interceptor ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor')
  }

  // Routes Provider Handler
  function config ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: '../components/login/template.html',
        controller: 'LoginController as vm'
      })
      .when('/register', {
        templateUrl: '../components/register/template.html',
        controller: 'RegisterController as vm'
      })
      .when('/restore-password', {
        templateUrl: '../components/restore-password/template.html',
        controller: 'RestorePassController as vm'
      })
      .when('/home', {
        templateUrl: '../components/home/template.html',
        controller: 'HomeController as vm',
        secure: true
      })
      .when('/groups/:groupId', {
        templateUrl: '../components/group/template.html',
        controller: 'GroupController as vm',
        secure: true
      })
      .when('/:groupId/track', {
        templateUrl: 'components/track/template.html',
        controller: 'TrackController as vm',
        secure: true
      })
      .otherwise({ redirectTo: '/login' })
  }
})()
