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

    $scope.getAvatar = function(user) {
      if(user.image) {
        return user.image;
      } else {
        var email = md5(user.email);
        return 'http://www.gravatar.com/avatar/' + hash + '?s=30&d=identicon'
      }
    };
}]);
