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
          // alert(payload.message);
          setTimeout(payload.callback, 2000);
        } else {
          numCardsDrawn++;

          payload.drawnCards.forEach(function(cardObj) {
            scope.cardImages.push(cardObj.cardFront);
          });

          setTimeout(function() {
            scope.cardImages = [];
            payload.callback();
            if(numCardsDrawn === 2) {
              scope.isCurrentlyDrawPhase = false;
              numCardsDrawn = 0;
            }
          }, 2000);

        }
      })

      $rootScope.$on('renderDiscardEvent', function(event, payload) {

        scope.isCurrentlyDiscardPhase = true;

        if(payload.message) {
          alert(payload.message);
        } else {

          payload.chosenDiscards.forEach(function(cardObj) {
            scope.discardImages.push(cardObj.cardFront);
          });

          if(payload.callback) {
            setTimeout(function() {
              scope.isCurrentlyDiscardPhase = false;
              scope.discardImages = [];
              payload.callback();
            }, 2000);
          }
        }

      })

      $rootScope.$on('renderInfectionEvent', function(event, payload) {
        scope.isCurrentlyInfectionPhase = true;

        if(payload.message) {
          // alert(payload.message);
          console.log('>>>>setting timeout for message callback')
          setTimeout(function() {
            console.log('infection message timeout being invoked')
            payload.callback();
          }, 2000);
          console.log('>>>>after setting timeout for message callback')
        } else {
          numInfectionsDrawn++;
          console.log(">>>> in renderInfectionEvent else")

          scope.infectionImages = [];//TODO: FIGURE THIS OUT
          payload.drawnInfections.forEach(function(cardObj) {
            scope.infectionImages.push(cardObj.infectionCardFront);
          });

          setTimeout(function() {
            console.log(">>>> in renderInfectionEvent else CALLBACK")

            scope.infectionImages = [];//TODO: FIGURE THIS OUT
            if(numInfectionsDrawn === payload.infectionRate) {
              scope.isCurrentlyInfectionPhase = false;
              numInfectionsDrawn = 0;
            }
            payload.callback();
          }, 2000);

        }

      })


    }
  }
})
