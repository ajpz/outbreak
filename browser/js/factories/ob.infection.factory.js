app.factory('InfectionFactory', function(SetToGameState, GameFactory, CardFactory, Cities) {

  //TODO: change GameState to have cities array with key, not name
  //TODO: what does GameFactory inject?
  //How does setToGameState update deck?

  var targets = GameFactory.gameState.cities; // TODO: what is getter/setter?

  var pickCardFromTop = function() {
    return CardFactory.pickCardFromTop(GameFactory.infectionDeck);
  };

  var pickCardFromBottom = function() {
    return CardFactory.pickCardFromBottom(GameFactory.infectionDeck);
  };

  var discardCard = function(card) {
    GameFactory.infectionDeckDiscard.push(card);
  };

  var shuffleDiscardAndAddToInfectionDeck = function() {
    var discardDeck = GameFactory.infectionDeckDiscard;
    CardFactory.shuffleDeck(discardDeck);
    GameFactory.infectionDeck = GameFactory.infectionDeck.concat(discardDeck);
    discardDeck = [];
  };

  var getInfectionLevel = function() {
    return GameFactory.infectionArray[GameFactory.infectionLevelIndex];
  };

  var incrementInfectionLevelIndex = function() {
      GameFactory.infectionLevelIndex++;
  };

  var addInfectionToACity = function(infectionCard, num, alreadyHit) {
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
      GameFactory.outBreakLevel++;
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
    initialize: setToGameState(function() {
      for (var num = 3, card; num > 0; num--) {
        for(var i = 0; i < 3; i++) {
          card = pickCardFromTop();
          addInfectionToACity(card, num);
          discardCard(card);
        }
      };
    }),
    infect: setToGameState(function() {
      for(var i = 0, card; i < 2; i++) {
        card = pickCardFromTop();
        addInfectionToACity(card, getInfectionLevel());
        discardCard(card);
      }
    }),
    epidemic: setToGameState(function() {
      incrementInfectionLevelIndex();
      var card = pickCardFromBottom();
      addInfectionToACity(card, 3);
      discardCard(card);
      shuffleDiscardAndAddToInfectionDeck();
    })
  }
});
