app.controller("LoginCtrl", function($scope, AuthService, $state,loggedInUser){
	
    if(!!loggedInUser){
        $state.go('home')
    }


	$scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {
        $scope.error = null;

        AuthService.login(loginInfo)
        .then(function (nowLoggedInUser) {
            localStorage.setItem('user', nowLoggedInUser.username)
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };
    $scope.isLoggedIn = function(){
        return AuthService.isAuthenticated();
    }
})