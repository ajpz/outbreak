app.controller("SignupCtrl", function($scope, AuthService, $state){

	$scope.account = {};
    $scope.error = null;

    $scope.signup = function (accountInfo) {
        console.log('signup')
        $scope.error = null;

        AuthService.signup(accountInfo).then(function () {
            localStorage.setItem('user', accountInfo.username)
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };
    $scope.isLoggedIn = function(){
        return AuthService.isAuthenticated();
    }
})