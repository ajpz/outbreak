app.factory('InfectionFactory', function(CardFactory, Cities, InfectionLevelArray, $rootScope) {

  //TODO: remove injection of InfectionLevelArray - no longer needed

  //make local copy of the levels array
  // const infectionLevelArray = _.cloneDeep(InfectionLevelArray.levels);

  //mutates the state by adding discarded infections back to the top of the infection deck
  const shuffleDiscardAndAddToInfectionDeck = function(state) {
    CardFactory.shuffleDeck(state.infectionDeckDiscard);
    state.infectionDeck = state.infectionDeck.concat(state.infectionDeckDiscard);
    state.infectionDeckDiscard = [];
  };

  // adds infections to a city - needs to check for, and handle, outbreaks
  const addInfectionToACity = function(infectionCard, num, state, alreadyHit, outbreakColor) {
    var color = outbreakColor || infectionCard.color,
        alreadyHit = alreadyHit || [],
        // target is a ref to GameFactory.cities.<cityKey> --> an object
        // with properties of 'red', 'blue', 'yellow', 'black'
        // each a count of the respective infection color
        target = state.cities.filter(function(target) {
                    return target.key === infectionCard.key;
                  })[0];
    //create an object to store outbreaks during turn
    if(!state.outbreaksDuringTurn) state.outbreaksDuringTurn = {};

    // check to see whether sum of num and color's disease count exceeds 3
    // ... if so, that't an outbreak
    if((target[color] + num) > 3 && (alreadyHit.indexOf(target.key) === -1)) {
      console.log('OUTBREAK YO! OUTBREAK YO! OUTBREAK YO! in.....', target.key, target[color]);

      // target's disease count for this color will max out at 3
      target[color] = 3;

      //create an array to store outbreaks during turn for current outbreak
      if(!state.outbreaksDuringTurn[target.key]) state.outbreaksDuringTurn[target.key] = [];

      // add the current key, i.e. newYork, to the alreadyHit array
      // to prevent outbreaks from looping recursively
      alreadyHit.push(target.key);
      // increment outbreakLevel on state
      state.outbreakLevel++;
      // check whether outbreak level has reached 8
      if (state.outbreakLevel === 8){
        state.status = "gameOver";
        state.gameOver.win = false;
        state.gameOver.lossType = "outbreakLevel8";
      }
      // grab the connections of the current key
      var nextKeys = Cities[target.key].connections;
      // add 1 infection of give color to each key
      nextKeys.forEach(function(nextKey) {
        // check to see whether the target.key was 'alreadyHit'
        if(alreadyHit.indexOf(nextKey) === -1)
          //push this nextKey infection onto the outbreak city's array
          state.outbreaksDuringTurn[target.key].push(Cities[nextKey].name);
          // don't infect if it's already part of this outbreak
          addInfectionToACity(Cities[nextKey], 1, state, alreadyHit, color);
      });
    } else {
      // if no outbreak and there are cubes of the needed color remaining...
      if(state.remainingCubes[color] > num && state.remainingCubes[color]>0){
        //... increment the color's virus count for this city
        target[color] += num;
        //... and decrement the remaining number of that color's cubes
        state.remainingCubes[color] -= num;
      } else {
        //no remaining cubes, means it's gameOver
        state.status = 'gameOver';
        state.gameOver.win = false;
        state.gameOver.lossType =  "noMoreCubes";
      }
    }
  };

  return {
    createInfectionDeck : () => {
      //redirects to CardFactory exposed method
      return CardFactory.createADeck(Cities);
    },
    initialize: function(state) {
      //sprinkle infections on board to set-up game state
      for (var infectionRate = 3, card; infectionRate > 0; infectionRate--) {
        //Add 3 virus, then 2 virus, then 1 virus
        for(var i = 0; i < 3; i++) {
          //pick 3 infection cards and add infection count specified in outer for loop
          card = CardFactory.pickCardFromTop(state.infectionDeck);
          addInfectionToACity(card, infectionRate, state);
          //firebase doesn't save empty objects, create array if need be
          if(!state.infectionDeckDiscard) state.infectionDeckDiscard = [];
          state.infectionDeckDiscard.push(card);
        }
      };
      //be explicit: return the game state
      return state;
    },
    infect: function(state) {
      //pick infection card
      var card = CardFactory.pickCardFromTop(state.infectionDeck);
      //firebase doesn't save empty objects, create drawnInfections array
      if(!state.drawnInfections) state.drawnInfections = [];
      //store reference to the infection card drawn this round
      state.drawnInfections.push(card);
      //infect the city
      addInfectionToACity(card, 1, state);
      //firebase doesn't save empty objects, create infectionDeckDiscard array
      if(!state.infectionDeckDiscard) state.infectionDeckDiscard = [];
      state.infectionDeckDiscard.push(card);
      //be explicit, return the game state
      return state;
    },
    epidemic: function(state) {
      //1) increment infectionLevelIndex
      state.infectionLevelIndex++;
      //2) pick card from bottom of infectionDeck and infect with 3 virus
      let card = CardFactory.pickCardFromBottom(state.infectionDeck);
      addInfectionToACity(card, 3, state);
      // add drawnInfections array to capture infection card picked from bottom
      state.drawnInfections = [card];
      //discard
      state.infectionDeckDiscard.push(card);
      //3) shuffle discards and add to top of infectionDeck
      shuffleDiscardAndAddToInfectionDeck(state);
      return state;
    }
  }
});
