todoApp.controller('CommentController', ['$scope', '$http', 'projectFactory', 'toastr', 'Upload',
  function($scope, $http, projectFactory, toastr, Upload) {
    $scope.submitComment = function(task) {
      projectFactory.setTaskId(task.id);
      projectFactory.submitComment($scope.commentData).success(function(data) {
        console.log(data);
        if($scope.files) {
          for (var i = 0; i < $scope.files.length; i++) {
            var file = $scope.files[i];
            Upload.upload({
              url: '/api/v1/comments/' + data.id + '/attachments',
              method: 'POST',
              file: file
            }).success(function(data) {
              $scope.files = [];
              projectFactory.getTaskComments();
            });
          }
        };
        $scope.commentData = {};
        projectFactory.getTaskComments().success(function(data) {
          toastr.success('Comment successfully created.');
          $scope.task.comments = data;
        });
      })
      .catch(function(response) {
        toastr.error('Comment can\'t be blank.');
      });
    };

    $scope.deleteComment = function(taskId, commentData) {
      var confirmation = confirm('Are you sure?');
      if (confirmation) {
        projectFactory.deleteComment(commentData).success(function() {
          projectFactory.getTaskComments(taskId).success(function(data) {
            $scope.task.comments = data;
          });
        });
      };
    };

    $scope.deleteAttach = function(index) {
      if (index > -1) {
        $scope.files.splice(index, 1);
      }
    };
}]);
