app.config(function ($stateProvider) {
    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/states/signup/ob.signup.template.html',
        resolve: {
        	loggedInUser: function(AuthService){
        		return AuthService.getLoggedInUser(true)
        	}
        },
        controller: 'SignupCtrl'
    });
});