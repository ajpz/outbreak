app.directive("infectionDecks", function($rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/infection-decks/ob.infection-deck.html',
    scope: {},
    link: function(scope) {
      function changeNumRemainingCubes(gameState) {

        var infectionDeckLength;
        var infectionDeckDiscardLength;

        var infectionDeckDiscardImage;
        console.log()
        if(!gameState.infectionDeckDiscard) infectionDeckDiscardImage = 'http://i.imgur.com/I15XGV4.png';
        else infectionDeckDiscardImage = gameState.infectionDeckDiscard[gameState.infectionDeckDiscard.length-1].infectionCardFront;

        // setting variables for deck length remaining, need to do this as
        // firebase drops empty arrays, so need to ensure it exists at all
        if(!gameState.infectionDeck) infectionDeckLength = 0;
        else infectionDeckLength = gameState.infectionDeck.length;

        if(!gameState.infectionDeckDiscard) infectionDeckDiscardLength = 0;
        else infectionDeckDiscardLength = gameState.infectionDeckDiscard.length;

        // image of the top card on the infectionDeckDiscard
        scope.infectiondecks = {
          infectiondiscardTopCard: infectionDeckDiscardImage
        }

        // number of infection cards left in infectionDeck, and infectionDeckDiscard
        scope.numCardsInDeck = {
          infectiondeckRemaining: infectionDeckLength,
          infectiondiscardNumber: infectionDeckDiscardLength
        }
      }

      $rootScope.$on('stateChange', function(event, payload) {
        let gameState = payload.gameState;
        changeNumRemainingCubes(gameState);
      });
    }
  };
});
