app.directive("infectionDecks", function($rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/infection-decks/ob.infection-deck.html',
    scope: {},
    link: function(scope) {
      function changeNumRemainingCubes(gameState) {
        scope.infectiondecks = {
          // infectiondeck: gameState.infectionDeck.length || 0,
          // infectiondiscard: gameState.infectionDeckDiscard,
          infectiondiscardTopCard: gameState.infectionDeckDiscard[gameState.infectionDeckDiscard.length-1].infectionCardFront || 'http://i.imgur.com/I15XGV4.png',
        }
        console.log("\n\n\n\n\n\n\n\n\n"+scope.infectiondecks)
        scope.numCardsInDeck = {
          infectiondeckRemaining: gameState.infectionDeck.length || 0,
          infectiondiscardNumber: gameState.infectionDeckDiscard.length || 0
        }
      }

      $rootScope.$on('stateChange', function(event, payload) {
        let gameState = payload.gameState;
        changeNumRemainingCubes(gameState);
      });
    }
  };
});
