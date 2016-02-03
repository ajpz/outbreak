app.directive("stillAvailable", function($rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/still-available/ob.still-available.html',
    scope: {},
    link: function(scope) {
      scope.outbreakLevel = 0;
      //the database should initialize the outbreak level so the above line should not be necessary


      //TODO: THIS WILL NOT WORK. DON'T KNOW WHY THIS WAS WRITTEN
      scope.changeTheLevel = function(gameState) {
        scope.outbreakLevel = gameState.outbreakLevel;
        $("#radio_" + scope.outbreakLevel).prop("checked", true)
      }

      $rootScope.$on('stateChange', function(event, payload) {
        let gameState = payload.gameState;
        scope.changeTheLevel(gameState);
      })

    }
  };
});
