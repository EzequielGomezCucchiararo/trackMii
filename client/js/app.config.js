angular.module('app')
  .config(['$httpProvider', InterceptorHandler])
  .config(['$routeProvider', RoutesHandler])

// Interceptor Handler
function InterceptorHandler ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor')
}

// Routes Provider Handler
function RoutesHandler ($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: '../components/login/template.html',
      controller: 'LoginCtrl as vm'
    })
    .when('/register', {
      templateUrl: '../components/register/template.html',
      controller: 'RegisterCtrl as vm'
    })
    .when('/restore-password', {
      templateUrl: '../components/restore-password/template.html',
      controller: 'RestorePassCtrl as vm'
    })
    .when('/home', {
      templateUrl: '../components/home/template.html',
      controller: 'HomeCtrl as vm',
      secure: true
    })
    .when('/groups/:groupId', {
      templateUrl: '../components/group/template.html',
      controller: 'GroupCtrl as vm',
      secure: true
    })
    .when('/:groupId/track', {
      templateUrl: 'components/track/template.html',
      controller: 'TrackCtrl as vm',
      secure: true
    })
    .otherwise({ redirectTo: '/login' })
}
