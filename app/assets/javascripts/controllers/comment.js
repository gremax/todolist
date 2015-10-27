todoApp.controller('CommentController', ['$scope', '$http', 'projectFactory', 'toastr',
  function($scope, $http, projectFactory, toastr) {
    $scope.submitComment = function(task) {
      projectFactory.setTaskId(task.id);
      projectFactory.submitComment($scope.commentData).success(function() {
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

    $scope.deleteComment = function(commentData) {
      var confirmation = confirm('Are you sure?');
      if (confirmation) {
        projectFactory.deleteComment(commentData).success(function() {
          projectFactory.getTaskComments().success(function(data) {
            $scope.task.comments = data;
          });
        });
      };
    };
}]);
