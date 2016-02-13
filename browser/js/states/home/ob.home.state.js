app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/states/home/ob.home.template.html',
        resolve: {
        	loggedInUser: function(AuthService){
        		return AuthService.getLoggedInUser(true)
        	},
            environment: function(FindEnvironmentFactory) {
                return FindEnvironmentFactory.getEnvironment()
                    .then(function(environment) {
                        return environment;
                    })
            }

        },
        controller: 'HomeCtrl'
    });
});