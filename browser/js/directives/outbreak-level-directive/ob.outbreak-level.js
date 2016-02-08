app.directive("outbreakLevel", function($rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/outbreak-level-directive/ob.outbreak-level.html',
    scope: {},
    link: function(scope, element) {
      scope.outbreakLevel = 0;
      //the database should initialize the outbreak level so the above line should not be necessary

      // test data:
      // let gameState = {
      //   outbreakLevel: 4
      // }
      let litUpPicture = "http://i.imgur.com/B92RfV5.png"
      let blankPicture = "http://i.imgur.com/GLfit2U.png"

      scope.changeTheLevel = function(gameState) {
        scope.outbreakLevel = gameState.outbreakLevel;

        for (let i=1; i<8; i++) {
          let elem = $(element).find("#level_" + i)
          if (i !== scope.outbreakLevel) {
            elem.children("img").attr("src", blankPicture)
          }else{
            elem.children("img").attr("src", litUpPicture)
          }
        }
      }

      // scope.changeTheLevel(gameState)

      $rootScope.$on('stateChange', function(event, payload) {
        let gameState = payload.gameState;
        scope.changeTheLevel(gameState);
      })

    }
  };
});
