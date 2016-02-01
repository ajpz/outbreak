app.factory('CitiesCardFactory', function(Cities, Events, Epidemic, CardFactory) {
  return {
    createPlayerDeck: function(numOfEpidemics = 4) {
      let epidemicCards = [];
      for(let j=0; j< numOfEpidemics; j++){
        epidemicCards.push(Epidemic);
        //console.log(JSON.stringify(epidemicCards[j]));
      }
      let cityCards = CardFactory.createADeck(Cities);
      let eventCards = CardFactory.createADeck(Events);
      //concat eventCards and cardDeck
      let cityAndEventDeck = eventCards.concat(cityCards);
      //shuffle deck
      cityAndEventDeck = shuffle(cityAndEventDeck);
      //console.log(cityAndEventDeck);
      //you have to equally distribute the epidemic cards among the cityAndEventDeck, so we have to divide the city and event cards into equal-length decks (sub-arrays)
      //step one is to calculate how long each one of sub-arrays should be
      let lengthOfSubDecks = Math.floor(cityAndEventDeck.length / numOfEpidemics);
      //get the cityAndEventDeck and split it into subdecks of a certain length. map over each chunk and push onto it an epidemic card
      return _(cityAndEventDeck).chunk(lengthOfSubDecks).map(function (portionOfDeck, currentIndex) {
        // leftover chunks may cause an undefined to be pushed into the deck;
        if (epidemicCards[currentIndex]){
          portionOfDeck.push(epidemicCards[currentIndex]);
        }
        //shuffle the portion of the deck
        shuffle(portionOfDeck);
        //console.log(portionOfDeck);
        return portionOfDeck;
      }).flatten().value();
    }
  }
});
