app.factory('CardFactory', function(Cities, Events, Epidemic) {
    function createADeck(cardObject) {
        var arrayToReturn = [];
        for (var key in cardObject) {
		    arrayToReturn.push(cardObject[key]);
        };
        return _.shuffle(arrayToReturn);
    }

    return {
        createPlayerDeck: function(numEpidemicCards) {
        	var epidemicCards = [];
        	for(var j=0; j<numEpidemicCards; j++){
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
            for (var i = 0; i < cityAndEventDeck.length - lengthOfSubDecks; i += lengthOfSubDecks) {
                //pop off an epidemic card and grab it
                var individualEpidemicCard = epidemicCards.pop();
                //create the sub-array by slicing the cityAndEventDeck from the current index to the index+length of how long a sub-array should be
                var subDeck = cityAndEventDeck.slice(i, i + lengthOfSubDecks);
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
        	createADeck(Cities);  
        },
        shuffleDeck: function(cardDeck) {
            return _.shuffle(cardDeck);
        },
        pickCardFromTop: function(cardDeck) {
            return cardDeck.pop();
        },
        pickCardFromBottom: function(cardDeck) {
            return cardDeck.unshift();
        },
        addCardsToTop: function(infectionDeck, discardDeck) {
            return infectionDeck.concat(discardDeck);
        },
        isEmpty: function() {
            return !cardDeck.length;
        }
    };
});
