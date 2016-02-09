app.directive("infectionRate", function($rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/infection-rate/ob.infection-rate.html',
    scope: {},
    link: function(scope, element) {
      scope.infectionLevelIndex = 0;

      let pictures = [
        "http://i.imgur.com/R4h0sLR.png",
        "http://i.imgur.com/R4h0sLR.png",
        "http://i.imgur.com/R4h0sLR.png",
        "http://i.imgur.com/Id5CmJy.png",
        "http://i.imgur.com/Id5CmJy.png",
        "http://i.imgur.com/z5c5067.png",
        "http://i.imgur.com/z5c5067.png"
      ]

      let blankPicture = "http://i.imgur.com/5I0tivz.png"

      scope.changeTheIndex = function(gameState) {
        scope.infectionLevelIndex = gameState.infectionLevelIndex;

        for (let i = 0; i < 7; i++) {
          let elem = $(element).find("#index_" + i)
          if (i !== scope.infectionLevelIndex) {
            elem.children("img").attr("src", blankPicture)
          } else {
            elem.children("img").attr("src", pictures[i])
          }
        }
      }

      scope.infectionRate = {
        tooltip: 'The Infection Rate dictates how many infection cards are flipped over during each Infect Cities stage, controlling the rate at which diseases spread.'
      }

      $rootScope.$on('stateChange', function(event, payload) {
        let gameState = payload.gameState;
        scope.changeTheIndex(gameState);

      })

    }
  };
});
