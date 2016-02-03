app.directive("outbreakLevel", function($rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/outbreak-level-directive/ob.outbreak-level.html',
    scope: {},
    link: function(scope, element) {
      scope.outbreakLevel = 0;
      //the database should initialize the outbreak level so the above line should not be necessary
      
      // test data:
      // var gameState = {
      //   outbreakLevel: 4
      // }
      scope.changeTheLevel = function(gameState) {
        scope.outbreakLevel = gameState.outbreakLevel;
        var elem = $(element).find("#level_" + scope.outbreakLevel);
        for (var i = 1; i < 8; i++) {
          if (i !== scope.outbreakLevel) {
            var elem = $(element).find("#level_" + i)
            elem.children("img").attr("src", 'http://i.imgur.com/GLfit2U.png')
          }
        }
      }

      // scope.changeTheLevel(gameState)

      $rootScope.$on('stateChange', function(event, payload) {
        let gameState = payload.gameState;
        if (scope.outbreakLevel !== gameState.outbreakLevel) {
          scope.changeTheLevel(gameState);
        }
      })

    }
  };
});
