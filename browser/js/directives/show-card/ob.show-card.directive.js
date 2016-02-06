app.directive('showCard', function($rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/show-card/ob.show-card.directive.html',
    scope: {},
    link: function(scope, element, attr) {

      scope.isCurrentlyDrawPhase = false;
      scope.cardImages = [];

      $rootScope.$on('stateChange', function(event, payload) {

        if(payload.gameState.currentPhase === 'draw') {
          scope.isCurrentlyDrawPhase = true;
        }


      });

      $rootScope.$on('drawCard', function(event, payload) {
        scope.cardImages.push(payload.cardImage);
      });


    }
  }
})
