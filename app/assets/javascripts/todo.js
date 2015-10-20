var todoApp = angular.module('todoApp', [
  'ngResource',
  'ngAnimate',
  'templates',
  'Devise',
  'toastr',
  'ui.router',
  'ui.sortable',
  'ui.bootstrap.datetimepicker'
]);

todoApp.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('projects',
      {
        url: '/projects',
        templateUrl: 'projects.html',
        controller: 'ProjectController as projectCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          if (!Auth.isAuthenticated()) {
            $state.go('login');
          }
        }]
      })
      .state('login',
      {
        url: '/login',
        templateUrl: '_login.html',
        controller: 'AuthController',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (){
            $state.go('projects');
          })
        }]
      })
      .state('register',
      {
        url: '/register',
        templateUrl: '_register.html',
        controller: 'AuthController',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (){
            $state.go('projects');
          })
        }]
      });
    $urlRouterProvider.otherwise('login');
}]);

todoApp.factory('projectFactory', function($http) {
  return {
    projectId: null,

    getProjects: function() {
      return $http.get('/api/v1/projects');
    },

    setProjectId: function(id) {
      this.projectId = id;
    },

    getProjectTasks: function(id) {
      var thisId = id || this.projectId;
      return $http.get('/api/v1/projects/' + thisId + '/tasks');
    },

    submitProject: function(projectData) {
      console.log(projectData);
      return $http({
        method: 'POST',
        url: '/api/v1/projects',
        params: projectData
      });
    },

    updateProject: function(projectData) {
      console.log(projectData);
      return $http({
        method: 'PUT',
        url: '/api/v1/projects/' + projectData.id,
        params: { id: projectData.id, title: projectData.title, priority: projectData.priority }
      });
    },

    deleteProject: function(id) {
      console.log(id);
      return $http.delete('/api/v1/projects/' + id);
    },

    submitTask: function(taskData) {
      console.log(taskData);
      var projectId = this.projectId;
      return $http({
        method: 'POST',
        url: '/api/v1/projects/' + projectId + '/tasks',
        params: taskData
      });
    },

    updateTask: function(taskData) {
      console.log(taskData);
      return $http({
        method: 'PUT',
        url: '/api/v1/projects/' + taskData.project_id + '/tasks/' + taskData.id,
        params: taskData
      });
    },

    deleteTask: function(taskData) {
      return $http.delete('/api/v1/projects/' + taskData.project_id
        + '/tasks/' + taskData.id);
    }
  };
});

todoApp.controller('ProjectController', ['$scope', '$http', 'projectFactory',
  function($scope, $http, projectFactory) {
    $scope.projectData = {};

    $scope.getProjects = function() {
      projectFactory.getProjects().success(function(data) {
        $scope.projects = data;
      });
    };

    $scope.submitProject = function() {
      projectFactory.submitProject($scope.projectData).success(function() {
        $scope.projectData = {};
        $scope.getProjects();
      });
    };

    $scope.deleteProject = function(id) {
      var confirmation = confirm('Are you sure?');
      if(confirmation) {
        projectFactory.deleteProject(id).success(function() {
          $scope.getProjects();
        });      
      }
    };

    $scope.projectEdit = function(){
      $(event.target).closest('div').toggleClass('editing');
    };

    $scope.editProjectOnEnter = function(project){
      if(event.keyCode == 13 && project.title){
        projectFactory.updateProject(project);
        $scope.projectEdit();
      }
    };

    $scope.toggleProjectEdit = function(){
      $(event.target).parent('div').siblings().toggleClass('editing');
    };

    $scope.sortableOptions = {
      stop: function(e, ui) {
        _.map($scope.projects, function(project, index) {
          projectFactory.updateProject({id: project.id, priority: index}) 
        })
      },
      axis: 'y'
    };

    $scope.getProjects();
}]);

todoApp.controller('TaskController', ['$scope', '$http', 'projectFactory',
  function($scope, $http, projectFactory) {
    $scope.submitTask = function(projectId) {
      projectFactory.setProjectId(projectId);
      projectFactory.submitTask($scope.taskData).success(function() {
        $scope.taskData = {};
        projectFactory.getProjectTasks(projectId).success(function(data) {
          $scope.project.tasks = data;
        }); 
      });
    };

    $scope.updateTask = function(taskData) {
      projectFactory.updateTask(taskData);
    };

    $scope.deleteTask = function(taskData) {
      var confirmation = confirm('Are you sure?');
      if (confirmation) {
        projectFactory.deleteTask(taskData).success(function() {
          projectFactory.getProjectTasks().success(function(data) {
            $scope.project.tasks = data;
          });
        });
      };
    };

    $scope.taskEdit = function(){
      $(event.target).closest('div').toggleClass('editing');
    };

    $scope.editTaskOnEnter = function(task){
      if(event.keyCode == 13 && task.title){
        $scope.updateTask(task);
        $scope.taskEdit();
      }
    };

    $scope.toggleTaskEdit = function(){
      $(event.target).closest('tr').find('td.task-title div').
        toggleClass('editing');
    };

    $scope.setDue = function(task){
      $scope.updateTask(task);
      $scope.optionsTask = false;
    };
}]);

todoApp.controller('NavController', ['$scope', '$state', 'Auth', 'toastr',
  function($scope, $state, Auth, toastr) {
    $scope.signedIn = Auth.isAuthenticated;
    $scope.logout = Auth.logout;

    Auth.currentUser().then(function (user){
      $scope.user = user;
    });

    $scope.$on('devise:new-registration', function (e, user){
      $scope.user = user;
      toastr.success('Welcome aboard!');
    });

    $scope.$on('devise:login', function (e, user){
      $scope.user = user;
      toastr.success('Signed in successfully.');
    });

    $scope.$on('devise:logout', function (e, user){
      $scope.user = {};
      $state.go('login');
    });
}]);

todoApp.controller('AuthController', ['$scope', '$state', 'Auth', function($scope, $state, Auth) {
  $scope.login = function() {
    Auth.login($scope.user).then(function(){
      $state.go('projects');
    });
  };

  $scope.register = function() {
    Auth.register($scope.user).then(function(){
      $state.go('projects');
    });
  };
}]);
