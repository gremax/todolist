var todoApp = angular.module('todoApp', ['ngResource']);

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
  this.projects = Project.query();

  this.addProject = function(){
    Project.save(this.project, function(resource){
      resource.tasks = [];
      todo.projects.push(resource);
      todo.project = {};
    }, function(response){
       console.log('Error' + response.status);
    });
  };

  this.delProject = function(project){
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
}]);

/**
 * TaskController
 * */

todoApp.controller('TaskController', ['Task', function(Task){
  var taskCtrl = this;

  this.addTask = function(project){
    Task.save({project_id: project.id, task: this.task}, function(resource){
      project.tasks.push(resource);
      taskCtrl.task = {};
    }, function(response){
       console.log('Error ' + response.status);
    });
  };

  this.delTask = function(project, task){
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

  this.completeTask = function(project, task){
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
