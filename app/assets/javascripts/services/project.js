todoApp.factory('projectFactory', function($http) {
  return {
    projectId: null,
    taskId: null,

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

    setTaskId: function(id) {
      this.taskId = id;
    },

    getTaskComments: function() {
      var projectId = this.projectId;
      var taskId = this.taskId;
      return $http.get('/api/v1/projects/' + projectId + '/tasks/' + taskId +
        '/comments');
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
    },

    submitComment: function(commentData) {
      console.log(commentData);
      var projectId = this.projectId;
      var taskId = this.taskId;
      return $http({
        method: 'POST',
        url: '/api/v1/projects/' + projectId + '/tasks/' + taskId + '/comments',
        params: commentData
      });
    },

    deleteComment: function(commentData) {
      var projectId = this.projectId;
      var taskId = this.taskId;
      return $http.delete('/api/v1/projects/' + projectId + '/tasks/' + taskId +
        '/comments/' + commentData.id);
    }
  };
});
