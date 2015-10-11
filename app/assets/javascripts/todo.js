var todoApp = angular.module('todoApp', ['ngResource', 'ui.sortable']);

/**
 * Configuration
 * */

todoApp.config(['$httpProvider', function($httpProvider){
  $httpProvider.defaults.headers.common['X-CSRF-Token'] =
    $('meta[name=csrf-token]').attr('content');
}]);

/**
 * Controllers
 */

/**
 * TodoController - Main controller
 * */

todoApp.controller('TodoController', ['Project', function(Project){
  var todo = this;
  todo.projects = Project.query();

  todo.addProject = function(){
    Project.save(todo.project, function(resource){
      resource.tasks = [];
      todo.projects.push(resource);
      todo.project = {};
    }, function(response){
       console.log('Error' + response.status);
    });
  };

  todo.delProject = function(project){
    var confirmation = confirm('Are you sure?');

    if (confirmation) {
      Project.remove({id: project.id}, function(resource){
        var indexOf = todo.projects.indexOf(project);
        if (indexOf !== -1){
          todo.projects.splice(indexOf, 1);
        };
        console.log('Deleted!');
      }, function(response){
        console.log('Error ' + response.status);
      });
    };
  };

  todo.sortableOptions = {
    stop: function(e, ui) {
      _.map(todo.projects, function(project, index) {
        Project.update({id: project.id}, {priority: index}, function(resource){
          console.log('update projects priority');
        }, function(response){
          console.log('Error ' + response.status)
        });
      });
    },
    'ui-floating': false,
    axis: 'y'
  };
}]);

/**
 * TaskController
 * */

todoApp.controller('TaskController', ['Task', function(Task){
  var taskCtrl = this;

  taskCtrl.addTask = function(project){
    Task.save({project_id: project.id, task: taskCtrl.task}, function(resource){
      project.tasks.push(resource);
      taskCtrl.task = {};
    }, function(response){
       console.log('Error ' + response.status);
    });
  };

  taskCtrl.delTask = function(project, task){
    var confirmation = confirm('Are you sure?');

    if (confirmation) {
      Task.remove({project_id: project.id, id: task.id}, function(resource){
        var indexOf = project.tasks.indexOf(task);
        if (indexOf !== -1){
          project.tasks.splice(indexOf, 1);
        };
        console.log('Deleted!');
      }, function(response){
        console.log('Error ' + response.status);
      });
    };
  };

  taskCtrl.completeTask = function(project, task){
    Task.update({project_id: project.id, id: task.id}, {complete: task.complete}, function(resource){
      console.log('Complete');
    }, function(response){
      console.log('Error ' + response.status)
    });
  };
}]);

/**
 * Factories
 * */

todoApp.factory('Project', ['$resource', function($resource){
  return $resource('/api/v1/projects/:id', { id: '@id' },
    {
      'update':  { method: 'PATCH' },
      'destroy': { method: 'DELETE' }
    }
  );
}]);

todoApp.factory('Task', ['$resource', function($resource){
  return $resource('/api/v1/projects/:project_id/tasks/:id', { project_id: '@project_id', id: '@id' },
    {
      'update':  { method: 'PATCH' },
      'destroy': { method: 'DELETE' }
    }
  );
}]);