app.directive('showCard', function($rootScope, InfectionLevelArray) {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/show-card/ob.show-card.directive.html',
    scope: {},
    link: function(scope, element, attr) {

      //Control whether the view shows cardImages and infectionImages
      scope.isCurrentlyDrawPhase = false;
      scope.isCurrentlyInfectionPhase = false;
      // scope.isCurrentlyDiscardPhase = false;

      scope.cardImages = [];
      scope.infectionImages = [];
      // scope.discardImages = [];

      var numCardsDrawn = 0;
      var numInfectionsDrawn = 0;

      $rootScope.$on('renderDrawEvent', function(event, payload) {
        //update view for the city cards that are drawn
        scope.isCurrentlyDrawPhase = true;

        if(payload.message) {
          //Draw phase is beginning, allow time for toast notification
          setTimeout(payload.callback, 2000);
        } else {
          //a city card was drawn, add drawnCards to the scope
          numCardsDrawn++;
          scope.cardImages = [];
          payload.drawnCards.forEach(function(cardObj) {
            scope.cardImages.push(cardObj.cardFront);
          });

          //allow time for toast notification
          setTimeout(function() {
            payload.callback();
            if(numCardsDrawn === 2) {
              //if two cards have been drawn, reset scope variables
              scope.isCurrentlyDrawPhase = false;
              numCardsDrawn = 0;
              scope.cardImages = [];
            }
          }, 2000);

        }
      })

      $rootScope.$on('renderInfectionEvent', function(event, payload) {
        //update view for the infection cards that are drawn
        scope.isCurrentlyInfectionPhase = true;

        //make sure we are not in draw phase, if so, there is an epidemic
        if(payload.currentPhase !== 'draw') {
          //In infection phase
          if(payload.message) {
            //Infection phase is beginning, allow time for toast notification
            setTimeout(payload.callback, 2000);
          } else {
            //an infection card was drawn, add drawn infections to the scope
            numInfectionsDrawn++;
            scope.infectionImages = [];
            payload.drawnInfections.forEach(function(cardObj) {
              scope.infectionImages.push(cardObj.infectionCardFront);
            });

            //allow time for toast notifications
            setTimeout(function() {
              payload.callback();
              if(numInfectionsDrawn === payload.infectionRate) {
                //if the infectionRate is hit, reset scope variables
                scope.isCurrentlyInfectionPhase = false;
                numInfectionsDrawn = 0;
                scope.infectionImages = [];
              }
            }, 2000);
          };

        } else {
            //An EPIDEMIC card was drawn (during the draw phase)
            //add the resulting infections to the scope
            scope.infectionImages = [];
            payload.drawnInfections.forEach(function(cardObj) {
              scope.infectionImages.push(cardObj.infectionCardFront);
            });

            //allow time for toast notifications
            setTimeout(function() {
              scope.infectionImages = [];
              scope.isCurrentlyInfectionPhase = false;
            }, 2000)

        }
      })
    }
  }
})
