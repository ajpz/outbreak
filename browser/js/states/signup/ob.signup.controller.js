app.controller("SignupCtrl", function($scope, AuthService, $state, loggedInUser){
    if(!!loggedInUser){
        $state.go('home')
    }
	$scope.account = {};
    $scope.error = null;

    $scope.signup = function (accountInfo) {
        console.log('signup')
        $scope.error = null;

        AuthService.signup(accountInfo).then(function () {
            localStorage.setItem('user', accountInfo.username)
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Something went wrong.';
        });

    };
    $scope.isLoggedIn = function(){
        return AuthService.isAuthenticated();
    }
})