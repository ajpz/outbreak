app.factory('CardFactory', function(Cities, Events, Epidemic) {
    return {
      createADeck : function(cardObject) {
       let deck = [];
        for (var key in cardObject) {
          deck.push(cardObject[key]);
        };
        return _.shuffle(deck);
      },
      shuffleDeck: function(cardDeck) {
          return _.shuffle(cardDeck);
      },
      pickCardFromTop: function(cardDeck) {
          return cardDeck.pop();
      },
      pickCardFromBottom: function(cardDeck) {
          return cardDeck.shift();
      },
      addCardsToTop: function(infectionDeck, discardDeck) {
          return infectionDeck.concat(discardDeck);
      },
      isEmpty: function(deck) {
          return !deck.length;
      }
    };
});
