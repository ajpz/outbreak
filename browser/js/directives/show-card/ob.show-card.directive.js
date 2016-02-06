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

      // $rootScope.$on('stateChange', function(event, payload) {

      //   if(payload.gameState.currentPhase === 'draw') {
      //     scope.isCurrentlyDrawPhase = true;
      //   }


      // });

      // $rootScope.$on('drawCard', function(event, payload) {
      //   scope.cardImages.push(payload.cardImage);
      // });
      var numCardsDrawn = 0;
      var numInfectionsDrawn = 0;

      $rootScope.$on('renderDrawEvent', function(event, payload) {
        scope.isCurrentlyDrawPhase = true;
        if(payload.message) {
          alert(payload.message);
          setTimeout(payload.callback, 2000);
        } else {
          numCardsDrawn++;

          payload.drawnCards.forEach(function(cardObj) {
            scope.cardImages.push(cardObj.cardFront);
          });

          setTimeout(function() {
            payload.callback();
            if(numCardsDrawn === 2) {
              scope.isCurrentlyDrawPhase = false;
              numCardsDrawn = 0;
            }
            scope.cardImages = [];
          }, 5000);

        }
      })

      $rootScope.$on('renderDiscardEvent', function(event, payload) {

        scope.isCurrentlyDiscardPhase = true;

        if(payload.message) {
          alert(payload.message);
        } else {

          payload.chosenDiscards.forEach(function(cardObj) {
            scope.infectionImages.push(cardObj.cardFront);
          });

          if(payload.callback) {
            setTimeout(function() {
              payload.callback();
              scope.isCurrentlyDiscardPhase = false;
              scope.discardImages = [];
            }, 5000);
          }
        }

      })

      $rootScope.$on('renderInfectionEvent', function(event, payload) {
        scope.isCurrentlyInfectionPhase = true;
        if(payload.message) {
          alert(payload.message);
          setTimeout(payload.callback, 2000);
        } else {
          numInfectionsDrawn++;

          payload.drawnInfections.forEach(function(cardObj) {
            scope.infectionImages.push(cardObj.cardFront);
          });

          setTimeout(function() {
            payload.callback();
            if(numInfectionsDrawn === payload.infectionRate) {
              scope.isCurrentlyInfectionPhase = false;
              numInfectionsDrawn = 0;
            }
            scope.infectionImages = [];
          }, 5000);

        }

      })


    }
  }
})
