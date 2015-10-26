todoApp.controller('RegistrationController', ['$scope', '$auth', 'toastr',
  function($scope, $auth, toastr) {
    $scope.$on('auth:registration-email-success', function(ev, message) {
      toastr.success('Welcome aboard!');
    });

    $scope.$on('auth:oauth-registration', function(ev, message) {
      toastr.success('Successfully authenticated from Facebook account.');
    });

    $scope.handleRegBtnClick = function() {
      $auth.submitRegistration($scope.registrationForm)
        .then(function() { 
          $auth.submitLogin({
            email: $scope.registrationForm.email,
            password: $scope.registrationForm.password
          });
        })
        .catch(function(response) {
          console.log(response);
          angular.forEach(response.data.errors.full_messages, function(msg) {
            toastr.error(msg);
          })
        })
    };
}]);
