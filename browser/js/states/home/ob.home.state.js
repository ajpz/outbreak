app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/states/home/ob.home.template.html',
        resolve: {
        	loggedInUser: function(AuthService){
                console.log('in state')
        		return AuthService.getLoggedInUser(true)
        	},
            environment: function(FindEnvironmentFactory) {
                FindEnvironmentFactory.getEnvironment()
                    .then(function(environment) {
                        console.log(environment)
                    })
            }

        },
        controller: 'HomeCtrl'
    });
});