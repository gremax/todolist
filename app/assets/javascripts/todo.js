var todoApp = angular.module('todoApp', [
  'ngResource',
  'ngAnimate',
  'templates',
  'toastr',
  'ui.router',
  'ui.sortable',
  'ui.bootstrap.datetimepicker',
  'ng-token-auth'
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

todoApp.config(function(toastrConfig) {
  angular.extend(toastrConfig, {
    positionClass: 'toast-top-left',
    preventOpenDuplicates: true
  });
});

todoApp.run(['$auth', '$state', function($auth, $state) {
  $auth.validateUser()
    .then(function(response) {
      $state.go('projects');
    });
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

todoApp.controller('ProjectController', ['$scope', '$http', 'projectFactory', 'toastr',
  function($scope, $http, projectFactory, toastr) {
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

    $scope.projectEdit = function() {
      $(event.target).closest('div').toggleClass('editing');
    };

    $scope.editProjectOnEnter = function(project) {
      if(!project.title) {
        toastr.error('Project name can\'t be blank.');
      };
      if(event.keyCode == 13 && project.title) {
        projectFactory.updateProject(project);
        $scope.projectEdit();
      }
    };

    $scope.toggleProjectEdit = function() {
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

todoApp.controller('TaskController', ['$scope', '$http', 'projectFactory', 'toastr',
  function($scope, $http, projectFactory, toastr) {
    $scope.submitTask = function(projectId) {
      projectFactory.setProjectId(projectId);
      projectFactory.submitTask($scope.taskData).success(function() {
        $scope.taskData = {};
        projectFactory.getProjectTasks(projectId).success(function(data) {
          $scope.project.tasks = data;
        });
      })
      .catch(function(response) {
        toastr.error('Task can\'t be blank.');
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

    $scope.taskEdit = function() {
      $(event.target).closest('div').toggleClass('editing');
    };

    $scope.editTaskOnEnter = function(task) {
      if(!task.title) {
        toastr.error('Task title can\'t be blank.');
      };
      if(event.keyCode == 13 && task.title) {
        $scope.updateTask(task);
        $scope.taskEdit();
      };
    };

    $scope.toggleTaskEdit = function() {
      $(event.target).closest('tr').find('td.task-title div').
        toggleClass('editing');
    };

    $scope.setDue = function(task) {
      $scope.updateTask(task);
      $scope.optionsTask = false;
    };

    $scope.sortableOptions = {
      stop: function(e, ui) {
        _.map($scope.project.tasks, function(task, index) {
          projectFactory.updateTask({project_id: task.project_id, id: task.id, priority: index}) 
        })
      },
      items: 'tr:not(.not-sortable)',
      axis: 'y'
    };

}]);

todoApp.controller('SessionController', ['$scope', '$state', '$auth', 'toastr',
  function($scope, $state, $auth, toastr) {
    $scope.$on('auth:login-error', function (ev, message) {
      toastr.error(message.errors[0]);
    });

    $scope.$on('auth:login-success', function() {
      $state.go('projects');
      toastr.success('Signed in successfully.');
    });

    $scope.handleSignOutBtnClick = function() {
      $auth.signOut()
        .then(function(resp) {
          $state.go('signin');
          toastr.success('Bye!');
        });
    };
}]);

todoApp.controller('RegistrationController', ['$scope', '$auth', 'toastr',
  function ($scope, $auth, toastr) {
    $scope.$on('auth:registration-email-success', function(ev, message) {
      toastr.success('Welcome aboard!');
    });

    $scope.$on('auth:oauth-registration', function(ev, message) {
      toastr.success('Successfully authenticated from Facebook account.');
    });

    $scope.handleRegBtnClick = function() {
      $auth.submitRegistration($scope.registrationForm)
        .then(function() { 
          $auth.submitLogin({
            email: $scope.registrationForm.email,
            password: $scope.registrationForm.password
          });
        })
        .catch(function(response) {
          console.log(response);
          angular.forEach(response.data.errors.full_messages, function(msg) {
            toastr.error(msg);
          })
        })
    };
}]);
