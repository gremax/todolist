var todoApp = angular.module('todoApp', [
  'ngResource',
  'ngAnimate',
  'angular-loading-bar',
  'templates',
  'toastr',
  'ui.router',
  'ui.sortable',
  'ui.bootstrap.datetimepicker',
  'ng-token-auth',
  'ngFileUpload'
]);

todoApp.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$authProvider',
  function($stateProvider, $urlRouterProvider, $authProvider) {
    $stateProvider
      .state('projects',
      {
        url: '/projects',
        templateUrl: 'projects.html',
        controller: 'ProjectController as projectCtrl',
        resolve: {
          auth: ['$auth', '$state', function($auth, $state) {
            return $auth.validateUser()
              .catch(function(response) {
                $state.go('signin');
              })
          }]
        }
      })
      .state('signin',
      {
        url: '/signin',
        templateUrl: '_signin.html',
        controller: 'SessionController'
      })
      .state('signup',
      {
        url: '/signup',
        templateUrl: '_signup.html',
        controller: 'RegistrationController',
      });
    $urlRouterProvider.otherwise('signin');
    $authProvider.configure({
      apiUrl: ''
    });
}]);

todoApp.config(['toastrConfig', function(toastrConfig) {
  angular.extend(toastrConfig, {
    positionClass: 'toast-top-left',
    preventOpenDuplicates: true
  });
}]);

todoApp.run(['$auth', '$state', function($auth, $state) {
  $auth.validateUser()
    .then(function(response) {
      $state.go('projects');
    });
}]);

todoApp.directive('addProject', function() {
  return {
    restrict: 'E',
    templateUrl: '_add-project.html'
  };
});

