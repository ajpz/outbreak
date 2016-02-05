app.factory('CardFactory', function(Cities, Events, Epidemic) {
    return {

      createADeck : function(cardObject) {
        let deck = _.toArray(cardObject)
        //per joe's suggestion, use the lodash toArray method to convert the object of cards to an array
        return shuffle(deck);
      },
      shuffleDeck: function(cardDeck) {
        //this will mutate the card deck
        return shuffle(cardDeck);
      },
      pickCardFromTop: function(cardDeck) {
        //this mutates deck, and returns top card
        return cardDeck.pop();

      },
      pickCardFromBottom: function(cardDeck) {
        //this mutates deck, and returns bottom card
        return cardDeck.shift();
      },
      addCardsToTop: function(infectionDeck, discardDeck) {
        //this mutates deck
        discardDeck.forEach(function(card){
          infectionDeck.push(card)
        })
        return infectionDeck;
      },
      isEmpty: function(deck) {
          return !deck.length;
      }

    };
});
