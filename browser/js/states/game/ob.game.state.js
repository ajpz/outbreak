app.config(function($stateProvider) {

    $stateProvider.state('game', {
        url: '/game/:id',
        templateUrl: 'js/states/game/ob.game.template.html',
        controller: 'GameCtrl',
        resolve: {
            lobby: function(LobbyFactory, $stateParams) {
                console.log('in lobby resolve')
                return LobbyFactory.getALobby($stateParams.id);
            }
        }

    });

});
