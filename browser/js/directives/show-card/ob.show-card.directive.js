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
          console.log('\n\n>>>>>SHOWING PAYLOAD MESSAGE', payload.message)
          setTimeout(payload.callback, 2000);
        } else {
          numCardsDrawn++;
          console.log('\n\n>>>>>RENDER DRAW EVENT ELSE CLAUSE', numCardsDrawn)
          scope.cardImages = []; //TODO: FIGURE THIS OUT
          payload.drawnCards.forEach(function(cardObj) {
            scope.cardImages.push(cardObj.cardFront);
          });

          setTimeout(function() {
            console.log('\n\n>>>>>>>in SET TIMEOUT CALLBACK IN RENDER DRAW EVENT')
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

        //



        //

        console.log('in renderInfectionEvent top')
        if(payload.currentPhase !== 'draw') {

          if(payload.message) {
            // alert(payload.message);
            console.log('>>>>setting timeout for message callback')
            setTimeout(function() {
              console.log('infection message timeout being invoked')
              payload.callback();
            }, 2000);
            console.log('>>>>after setting timeout for message callback')
          } else {
            // $rootScope.$broadcast('zoomToInfectionCity', {cityKey :
            numInfectionsDrawn++;
            console.log(">>>> in renderInfectionEvent else")

            scope.infectionImages = [];//TODO: FIGURE THIS OUT
            payload.drawnInfections.forEach(function(cardObj) {
              scope.infectionImages.push(cardObj.infectionCardFront);
            });

            setTimeout(function() {
              console.log(">>>> in renderInfectionEvent else CALLBACK")

              if(numInfectionsDrawn === payload.infectionRate) {
                scope.isCurrentlyInfectionPhase = false;
                numInfectionsDrawn = 0;
                scope.infectionImages = [];
              }
              payload.callback();
            }, 3000);
          };

        } else {
            console.log('in renderInfectionEvent else epidemic')
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
