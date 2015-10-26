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
      $(event.target).parents().eq(1).toggleClass('editing');
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
