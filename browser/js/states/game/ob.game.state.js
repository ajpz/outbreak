app.config(function ($stateProvider) {

    $stateProvider.state('game', {
        url: '/game',
        templateUrl: 'js/states/game/ob.game.template.html',
        controller: 'GameCtrl'
    });

});