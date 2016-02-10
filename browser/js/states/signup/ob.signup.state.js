app.config(function ($stateProvider) {
    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/states/signup/ob.signup.template.html',
        controller: 'SignupCtrl'
    });
});