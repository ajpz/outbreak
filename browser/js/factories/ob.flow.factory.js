app.factory("FlowFactory", function(InfectionFactory, CardFactory, $rootScope) {
  $rootScope.$on("stateChange", function(event, payload) {
    let gameState = payload.gameState;
    if (gameState.currentPhase === "draw") {
      alert('DRAW PHASE SEEN IN FLOWFACTORY')
      for (let i = 0; i < 2; i++) {
        gameState = pickACard(gameState);
      }
      gameState.currentPhase = 'discard';
      $rootScope.$broadcast('phaseChanged', gameState);
    } else if (gameState.currentPhase === "discard") {
      alert('DISCARD PHASE SEEN IN FLOWFACTORY')
      if (gameState.gamers[gameState.gamerTurn].hand.length <= 7) {
        gameState.currentPhase = 'infect';
        $rootScope.$broadcast('phaseChanged', gameState);
      }
    } else if (gameState.currentPhase === "infect") {
      alert('INFECT PHASE SEEN IN FLOWFACTORY')
      gameState = InfectionFactory.infect(gameState);
      gameState.currentPhase = 'actions';
      console.log("\n\n\n\n\n CUBES IN FLOW ", gameState.remainingCubes);
      // $rootScope.$broadcast("cubesReduced", {remainingCubes: gameState.remainingCubes});
      gameState.gamerTurn = (gameState.gamerTurn + 1) % 4;
      $rootScope.$broadcast('phaseChanged', gameState);
    }

  });


  function pickACard(gameState) {
    let newCard = CardFactory.pickCardFromTop(gameState.playerDeck);
    if (newCard.type === "epidemicCard") {
      alert('THERE WAS AN EPIDEMIC!')
      gameState = InfectionFactory.epidemic(gameState);
    } else {
      let currentTurn = gameState.gamerTurn;
      gameState.gamers[currentTurn].hand.push(newCard);
    }
    return gameState;
  };

  return function() {
    console.log("the FlowFactory has been instantiated")
  };
});
