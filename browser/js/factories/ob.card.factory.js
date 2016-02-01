app.factory('CardFactory', function(Cities, Events, Epidemic) {
    function createADeck(cardObject) {
      let deck = [];
      for (var key in cardObject) {
        deck.push(cardObject[key]);
      };
      return _.shuffle(deck);
    }
    // need test for this file
    return {
        // setting a default easy mode of 4 if no value is passed for numberOfEpidemicCards
        createPlayerDeck: function(numOfEpidemics = 4) {
        	var epidemicCards = [];
        	for(let j=0; j< numOfEpidemics; j++){
        		epidemicCards.push(Epidemic);
        	}
          var cityCards = createADeck(Cities);
          var eventCards = createADeck(Events);
          //concat eventCards and cardDeck
          var cityAndEventDeck = eventCards.concat(cityCards);
          //shuffle deck
          cityAndEventDeck = _.shuffle(cityAndEventDeck);
          //grab length of epidemicCards array
          var numEpidemicCards = epidemicCards.length;
          //you have to equally distribute the epidemic cards among the cityAndEventDeck, so we have to divide the city and event cards into equal-length decks (sub-arrays)
          //step one is to calculate how long each one of sub-arrays should be
          var lengthOfSubDecks = Math.floor(cityAndEventDeck.length / numEpidemicCards);
          var deckToReturn = [];
          //loop through the cityAndEventDeck, incrementing by the length of the sub-array each time
          for (let i = 0; i < cityAndEventDeck.length - lengthOfSubDecks; i += lengthOfSubDecks) {
              //pop off an epidemic card and grab it
              let individualEpidemicCard = epidemicCards.pop();
              //create the sub-array by slicing the cityAndEventDeck from the current index to the index+length of how long a sub-array should be
              let subDeck = cityAndEventDeck.slice(i, i + lengthOfSubDecks);
              //add the individual epidemic card to the sub-array
              subDeck = subDeck.concat(individualEpidemicCard);
              //shuffle the sub-array
              subDeck = _.shuffle(subDeck);
              //concat the sub-deck (i.e., sub-array) to the big deck
              deckToReturn = deckToReturn.concat(subDeck);
          }
          //concat the remaining elements at the end of the cityAndEventDeck to the deckToReturn
          deckToReturn = deckToReturn.concat(cityAndEventDeck.slice(deckToReturn.length - numEpidemicCards));
          //return the deck, which now has been shuffled and has epidemic cards distributed equally throughout it
          return deckToReturn;
        },
        createInfectionDeck: function() {
        	return createADeck(Cities);
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
        // addCardsToTop: function(infectionDeck, discardDeck) {
        //     return infectionDeck.concat(discardDeck);
        // },
        isEmpty: function(deck) {
            return !deck.length;
        }
    };
});
