app.directive('showCard', function($rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/show-card/ob.show-card.directive.html',
    scope: {},
    link: function(scope, element, attr) {

      scope.isCurrentlyDrawPhase = false;
      scope.cardImages = [];

      // $rootScope.$on('stateChange', function(event, payload) {

      //   if(payload.gameState.currentPhase === 'draw') {
      //     scope.isCurrentlyDrawPhase = true;
      //   }


      // });

      // $rootScope.$on('drawCard', function(event, payload) {
      //   scope.cardImages.push(payload.cardImage);
      // });
      var numCardsDrawn = 0;

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


    }
  }
})
