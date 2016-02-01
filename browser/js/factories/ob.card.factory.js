app.factory('CardFactory', function(Cities, Events, Epidemic) {
    return {
      createADeck : function(cardObject) {
        let deck = _.toArray(cardObject)
        //per joe's suggestion, use the lodash toArray method to convert the object of cards to an array
        return shuffle(deck);
      },
      //To-do: figure out whether to mutate or create new...
      shuffleDeck: function(cardDeck) {
        return shuffle(cardDeck);
        //this will mutate the card deck
      },
      pickCardFromTop: function(cardDeck) {
        let clonedDeck = _.clone(cardDeck);
        return clonedDeck.pop();
      },
      pickCardFromBottom: function(cardDeck) {
        let clonedDeck = _.clone(cardDeck);
        return clonedDeck.shift();
      },
      addCardsToTop: function(infectionDeck, discardDeck) {
        discardDeck.forEach(function(card){
          infectionDeck.push(card)
        })
        // return infectionDeck.concat(discardDeck);
        return infectionDeck;
      },
      isEmpty: function(deck) {
          return !deck.length;
      }
    };
});
