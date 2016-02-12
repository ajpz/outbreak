app.config(function ($stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/states/login/ob.login.template.html',
        controller: 'LoginCtrl'
    });
});