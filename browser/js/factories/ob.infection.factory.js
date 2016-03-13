app.factory('InfectionFactory', function(CardFactory, Cities) {

  //mutates the state by adding discarded infections back to the top of the infection deck
  const shuffleDiscardAndAddToInfectionDeck = function(state) {
    CardFactory.shuffleDeck(state.infectionDeckDiscard);
    state.infectionDeck = state.infectionDeck.concat(state.infectionDeckDiscard);
    state.infectionDeckDiscard = [];
  };

  //mutates the state by adding infections to cities
  const addInfectionToACity = function(infectionCard, num, state, outbreakColor) {
    var color = outbreakColor || infectionCard.color,
        // target is a ref to GameFactory.cities.<cityKey> --> an object
        // with properties of 'red', 'blue', 'yellow', 'black'
        // each a count of the respective infection color
        target = state.cities.find(city => city.key === infectionCard.key);

    //Will there be an outbreak? i.e. infection count > 3 after addition?
    if((target[color] + num) > 3) {
      //if needed, create an object to store outbreaks during turn
      if(!state.outbreaksDuringTurn) state.outbreaksDuringTurn = {};

      //Add this outbreak to the tracking object
      state.outbreaksDuringTurn[target.key] = [];

      // max out target's disease count at 3
      target[color] = 3;
      state.outbreakLevel++;

      //outbreak level of 8, means it's gameOver
      if (state.outbreakLevel === 8){
        //the game is over
        state.status = "gameOver";
        state.gameOver.win = false;
        state.gameOver.lossType = "outbreakLevel8";
      }

      //for each of the target's connections, increment the outbreak disease color
      Cities[target.key].connections.forEach(function(connection) {
        // check to see whether the connection was already hit by an outbreak
        if(!state.outbreaksDuringTurn.hasOwnProperty(connection)) {
          //push this connection onto the outbreak city's array
          state.outbreaksDuringTurn[target.key].push(Cities[connection].name);
          // add 1 infection of given color to the connection
          addInfectionToACity(Cities[connection], 1, state, color);
        }
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
      var card = CardFactory.pickCardFromTop(state.infectionDeck);
      //firebase doesn't save empty objects, create drawnInfections array and infectionDeckDiscard
      if(!state.drawnInfections) state.drawnInfections = [];
      if(!state.infectionDeckDiscard) state.infectionDeckDiscard = [];
      //store reference to the infection card drawn this round
      state.drawnInfections.push(card);
      //infect the city
      addInfectionToACity(card, 1, state);
      //store reference to the discarded infection card
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
