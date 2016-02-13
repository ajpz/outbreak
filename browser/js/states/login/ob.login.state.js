app.config(function ($stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/states/login/ob.login.template.html',
        resolve: {
        	loggedInUser: function(AuthService){
        		return AuthService.getLoggedInUser(true)
        	}
        },
        controller: 'LoginCtrl'
    });
});