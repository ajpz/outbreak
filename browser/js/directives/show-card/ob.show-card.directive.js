app.directive('showCard', function($rootScope, InfectionLevelArray) {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/show-card/ob.show-card.directive.html',
    scope: {},
    link: function(scope, element, attr) {

      scope.isCurrentlyDrawPhase = false;
      scope.isCurrentlyInfectionPhase = false;
      scope.isCurrentlyDiscardPhase = false;

      scope.cardImages = [];
      scope.infectionImages = [];
      scope.discardImages = [];

      var numCardsDrawn = 0;
      var numInfectionsDrawn = 0;

      $rootScope.$on('renderDrawEvent', function(event, payload) {

        scope.isCurrentlyDrawPhase = true;

        if(payload.message) {
          setTimeout(payload.callback, 2000);
        } else {
          numCardsDrawn++;
          scope.cardImages = []; //TODO: FIGURE THIS OUT
          payload.drawnCards.forEach(function(cardObj) {
            scope.cardImages.push(cardObj.cardFront);
          });

          setTimeout(function() {
            payload.callback();
            if(numCardsDrawn === 2) {
              scope.isCurrentlyDrawPhase = false;
              numCardsDrawn = 0;
              scope.cardImages = [];
            }
          }, 2000);

        }
      })

      $rootScope.$on('renderInfectionEvent', function(event, payload) {
        scope.isCurrentlyInfectionPhase = true;

        if(payload.currentPhase !== 'draw') {

          if(payload.message) {
            setTimeout(function() {
              payload.callback();
            }, 2000);
          } else {
            numInfectionsDrawn++;

            scope.infectionImages = [];//TODO: FIGURE THIS OUT
            payload.drawnInfections.forEach(function(cardObj) {
              scope.infectionImages.push(cardObj.infectionCardFront);
            });
            setTimeout(function() {
              payload.callback();

              if(numInfectionsDrawn === payload.infectionRate) {
                scope.isCurrentlyInfectionPhase = false;
                numInfectionsDrawn = 0;
                scope.infectionImages = [];
              }
            }, 2000);
          };

        } else {
            // in draw phase, with epidemic drawn -- show infection card briefly
            scope.infectionImages = [];//TODO: FIGURE THIS OUT
            payload.drawnInfections.forEach(function(cardObj) {
              scope.infectionImages.push(cardObj.infectionCardFront);
            });
            setTimeout(function() {
              scope.infectionImages = [];
              scope.isCurrentlyInfectionPhase = false;
            },2000)

        }
      })
    }
  }
})
