app.factory('InfectionFactory', function(SetToGameState, GameFactory, CardFactory, Cities, InfectionLevelArray) {

  //TODO: change GameState to have cities array with key, not name
  //TODO: what does GameFactory inject?

  //How does setToGameState update deck? GameFactory reveals a method to update parts/ all of the state
  const gameState = GameFactory.gameState;
  const targets = gameState.cities; // TODO: what is getter/setter?
  const infectionLevelArray = _.cloneDeep(InfectionLevelArray.levels);

  const pickCardFromTop = function() {
    return CardFactory.pickCardFromTop(gameState.infectionDeck);
  };

  const pickCardFromBottom = function() {
    return CardFactory.pickCardFromBottom(gameState.infectionDeck);
  };

  const discardCard = function(card) {
    gameState.infectionDeckDiscard.push(card);
  };

  const shuffleDiscardAndAddToInfectionDeck = function() {
    const discardDeck = gameState.infectionDeckDiscard;
    CardFactory.shuffleDeck(discardDeck);
    gameState.infectionDeck = gameState.infectionDeck.concat(discardDeck);
    //discardDeck = [];
  };

  const getInfectionLevel = function() {
    return infectionLevelArray[gameState.infectionLevelIndex];
  };

  const incrementInfectionLevelIndex = function() {
      gameState.infectionLevelIndex++;
  };

  const addInfectionToACity = function(infectionCard, num, alreadyHit) {
    var color = infectionCard.color,
        alreadyHit = alreadyHit || [],
        // target is a ref to GameFactory.cities.<cityKey> --> an object
        // with properties of 'red', 'blue', 'yellow', 'black'
        // each a count of the respective infection color
        target = targets.filter(function(target) {
                    return target.key === infectionCard.key;
                  })[0];

    // check to see if the target has 3 of the given color --> outbreak?
    if(target[color] === 3) {
      // add the current key, i.e. newYork, to the alreadyHit array
      // to prevent outbreaks from looping recursively
      alreadyHit.push(target.key);
      // increment outBreakLevel on gameState
      gameState.outBreakLevel++;
      // grab the connections of the current key
      var nextKeys = Cities[target.key].connections;
      // add 1 infection of give color to each key
      nextKeys.forEach(function(nextKey) {
        // check to see whether the target.key was 'alreadyHit'
        // don't infect if it's already part of this outbreak
        if(alreadyHit.indexOf(nextKey) === -1)
          addInfectionToACity(Cities[nextKey], 1, alreadyHit);
      });
    } else {
      // else, simply increment color's virust count
      target[color] += num;
    }
  };

  return {
    //initialize: setToGameState(function() {
    //  for (var num = 3, card; num > 0; num--) {
    //    for(var i = 0; i < 3; i++) {
    //      card = pickCardFromTop();
    //      addInfectionToACity(card, num);
    //      discardCard(card);
    //    }
    //  };
    //}),
    //infect: setToGameState(function() {
    //  for(var i = 0, card; i < 2; i++) {
    //    card = pickCardFromTop();
    //    addInfectionToACity(card, getInfectionLevel());
    //    discardCard(card);
    //  }
    //}),
    //epidemic: setToGameState(function() {
    //  incrementInfectionLevelIndex();
    //  var card = pickCardFromBottom();
    //  addInfectionToACity(card, 3);
    //  discardCard(card);
    //  shuffleDiscardAndAddToInfectionDeck();
    //})
  }
});
