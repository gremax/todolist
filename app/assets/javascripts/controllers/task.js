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
          projectFactory.getProjectTasks(taskData.project_id).success(function(data) {
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

    $scope.toggleComments = function() {
      $(event.target).closest('tr').find('td.task-title ul.comments').
        toggleClass('comments-on');
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
      helper: function (e, ui) {
        ui.children().each(function() {
          $(this).width($(this).width());
        });
        return ui;
      },
      items: 'tr:not(.not-sortable)',
      axis: 'y'
    };
}]);
