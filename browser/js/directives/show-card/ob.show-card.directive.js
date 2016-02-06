app.directive('showCard', function($rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/show-card/ob.show-card.directive.html',
    scope: {},
    link: function(scope, element, attr) {

      console.log("\n\n\n\n\nDIRECTIVE IS REGISTERING");

      scope.isCurrentlyDrawPhase = false;
      scope.cardImages = [];

      $rootScope.$on('stateChange', function(event, payload) {

        if(payload.gameState.currentPhase === 'draw') {
          scope.isCurrentlyDrawPhase = true;
        }
        console.log('heard stateChange', scope.cardImages, scope.isCurrentlyDrawPhase);

        console.log('\n\nCURRENT PHASE IS ', payload.gameState.currentPhase,'\n')

        // if(!scope.isCurrentlyDrawPhase) {
        //   scope.cardImages = [];
        // }
      });

      $rootScope.$on('drawCard', function(event, payload) {
        console.log('heard drawCard ', payload.cardImage)
        scope.cardImages.push(payload.cardImage);
      });


    }
  }
})
