app.config(function ($stateProvider) {

    $stateProvider.state('game', {
        url: '/game/:id',
        templateUrl: 'js/states/game/ob.game.template.html',
        controller: 'GameCtrl',
        resolve: {
        	lobbyId: function($stateParams){
        		return $stateParams.id;
        	}
        }

    });

});