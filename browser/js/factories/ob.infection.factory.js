app.factory('InfectionFactory', function(CardFactory, Cities, InfectionLevelArray) {

  //TODO: change GameState to have cities array with key, not name
  //TODO: what does GameFactory inject?

  //How does setToGameState update deck? GameFactory reveals a method to update parts/ all of the state

  const infectionLevelArray = _.cloneDeep(InfectionLevelArray.levels);

  const shuffleDiscardAndAddToInfectionDeck = function(state) {
    CardFactory.shuffleDeck(state.infectionDeckDiscard);
    state.infectionDeck = state.infectionDeck.concat(state.infectionDeckDiscard);
    state.infectionDeckDiscard = [];
  };

  const addInfectionToACity = function(infectionCard, num, state, alreadyHit, outbreakColor) {
    var color = outbreakColor || infectionCard.color,
        alreadyHit = alreadyHit || [],
        // target is a ref to GameFactory.cities.<cityKey> --> an object
        // with properties of 'red', 'blue', 'yellow', 'black'
        // each a count of the respective infection color
        target = state.cities.filter(function(target) {
                    return target.key === infectionCard.key;
                  })[0];
    // check to see if the target has 3 of the given color --> outbreak?
    if(target[color] === 3) {
      // add the current key, i.e. newYork, to the alreadyHit array
      // to prevent outbreaks from looping recursively
      alreadyHit.push(target.key);
      // increment outbreakLevel on state
      state.outbreakLevel++;
      // grab the connections of the current key
      var nextKeys = Cities[target.key].connections;
      // add 1 infection of give color to each key
      nextKeys.forEach(function(nextKey) {
        // check to see whether the target.key was 'alreadyHit'
        // don't infect if it's already part of this outbreak
        if(alreadyHit.indexOf(nextKey) === -1)
          addInfectionToACity(Cities[nextKey], 1, state, alreadyHit, color);
      });
    } else {
      // else, simply increment color's virust count
      target[color] += num;
    }
  };

  return {
    //TODO: wrap exposed function below in a decorator function that
    //  will kick off Firebase save. This can occur through mutator
    //  or otherwise....

    createInfectionDeck : () => {
      return CardFactory.createADeck(Cities);
    },
    initialize: function(state) {
      for (var infectionRate = 3, card; infectionRate > 0; infectionRate--) {
        for(var i = 0; i < 3; i++) {
          card = CardFactory.pickCardFromTop(state.infectionDeck);
          addInfectionToACity(card, infectionRate, state);
          state.infectionDeckDiscard.push(card);
        }
      };
      return state;
    },
    infect: function(state) {
      for(var i = 0, card; i < 2; i++) {
        let infectionRate = infectionLevelArray[state.infectionLevelIndex];
        card = CardFactory.pickCardFromTop(state.infectionDeck);
        addInfectionToACity(card, infectionRate, state);
        state.infectionDeckDiscard.push(card);
      }
      return state;
    },
    epidemic: function(state) {
      //1) increment infectionLevelIndex
      state.infectionLevelIndex++;
      //2) pick card from bottom of infectionDeck and infect with 3 virus
      let card = CardFactory.pickCardFromBottom(state.infectionDeck);
      addInfectionToACity(card, 3, state);
      state.infectionDeckDiscard.push(card);
      //3) shuffle discards and add to top of infectionDeck
      shuffleDiscardAndAddToInfectionDeck(state);
      return state;
    }
  }
});