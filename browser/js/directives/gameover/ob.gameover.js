app.directive("gameOver", function($rootScope, Reasons) {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/gameover/ob.gameover.html',
    scope: {},
    link: function(scope, element) {
      scope.win = false;
      scope.lose = false;

      $rootScope.$on('stateChange', function(event, payload) {
        let gameState = payload.gameState;
        scope.win = (gameState.status === 'gameOver' && gameState.gameOver.win)
        scope.lose = (gameState.status === 'gameOver' && !gameState.gameOver.win)
        scope.reason = Reasons[gameState.gameOver.lossType];

      })

    }
  };
});
