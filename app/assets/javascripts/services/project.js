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
