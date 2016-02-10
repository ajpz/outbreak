app.controller("LoginCtrl", function($scope, AuthService, $state){
	console.log("login ctrl");

	$scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
            $state.go('home');
            console.log(AuthService.isAuthenticated())
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };
    $scope.isLoggedIn = function(){
        return AuthService.isAuthenticated();
    }
})