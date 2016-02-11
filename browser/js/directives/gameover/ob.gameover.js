app.directive("gameOver", function($rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/gameover/ob.gameover.html',
    scope: {},
    link: function(scope, element) {

      scope.win = gameState.gameOver.win
      scope.lose = gameState.gameOver.lose

      $rootScope.$on('stateChange', function(event, payload) {
        let gameState = payload.gameState;
        scope.changeTheIndex(gameState);

      })

    }
  };
});
