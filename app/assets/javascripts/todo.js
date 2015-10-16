var todoApp = angular.module('todoApp', ['ngResource', 'ui.sortable', 'ui.bootstrap.datetimepicker']);

/**
 * Configuration
 * */

todoApp.config(['$httpProvider', function($httpProvider){
  $httpProvider.defaults.headers.common['X-CSRF-Token'] =
    $('meta[name=csrf-token]').attr('content');
}]);

/**
 * Controllers
 * */

/**
 * TodoController - Main controller
 * */

todoApp.controller('TodoController', ['Project', function(Project){
  var todo = this;
  todo.projects = Project.query();

  /**
   * Add a project
   * */

  todo.addProject = function(){
    Project.save(todo.project, function(resource){
      resource.tasks = [];
      todo.projects.push(resource);
      todo.project = {};
    }, function(response){
      console.log('Error ' + response.status);
    });
  };

  /**
   * Update a project title
   * */

  todo.updateProject = function(project, title){
    Project.update({id: project.id, title: title}, function(resource){
    }, function(response){
      console.log('Error ' + response.status);
    });
  }

  /**
   * Inline edit
   * */

  todo.toggleEdit = function(){
    $(event.target).parent('div').siblings().toggleClass('editing');
  }

  todo.dblclickEdit = function(){
    $(event.target).closest('div').toggleClass('editing');
  }

  todo.editOnEnter = function(project){
    if(event.keyCode == 13 && project.title){
      todo.updateProject(project, project.title);
      todo.dblclickEdit();
    }
  }

  /**
   * Delete a project
   * */

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

  /**
   * Sortable
   * */

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

  /**
   * Add a task
   * */

  taskCtrl.addTask = function(project){
    Task.save({project_id: project.id, task: taskCtrl.task}, function(resource){
      project.tasks.push(resource);
      taskCtrl.task = {};
    }, function(response){
       console.log('Error ' + response.status);
    });
  };

  /**
   * Update a task title
   * */

  taskCtrl.updateTask = function(task, title){
    Task.update({project_id: task.project_id, id: task.id, title: title}, function(resource){
    }, function(response){
      console.log('Error ' + response.status);
    });
  }

  /**
   * Inline edit
   * */

  taskCtrl.toggleEdit = function(){
    $(event.target).closest('tr').find('td.task-title div').toggleClass('editing');
  }

  taskCtrl.dblclickEdit = function(){
    $(event.target).closest('div').toggleClass('editing');
  }

  taskCtrl.editOnEnter = function(task){
    if(event.keyCode == 13 && task.title){
      taskCtrl.updateTask(task, task.title);
      taskCtrl.dblclickEdit();
    }
  }

  /**
   * Delete a task
   * */

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

  /**
   * Complete a task
   * */

  taskCtrl.completeTask = function(project, task){
    Task.update({project_id: project.id, id: task.id}, {complete: task.complete}, function(resource){
      console.log('Complete');
    }, function(response){
      console.log('Error ' + response.status)
    });
  };

  /**
   * Set due date
   * */

  taskCtrl.setDue = function(task){
    Task.update({project_id: task.project_id, id: task.id}, {due_date: task.due_date});
    $scope.optionsTask = false;
  };
}]);

/**
 * Factories
 * */

todoApp.factory('Project', ['$resource', function($resource){
  return $resource('/api/v1/projects/:id', { id: '@id' },
    {
      'update':  { method: 'PUT' },
      'destroy': { method: 'DELETE' }
    }
  );
}]);

todoApp.factory('Task', ['$resource', function($resource){
  return $resource('/api/v1/projects/:project_id/tasks/:id', { project_id: '@project_id', id: '@id' },
    {
      'update':  { method: 'PUT' },
      'destroy': { method: 'DELETE' }
    }
  );
}]);
