app.factory("FlowFactory", function(InfectionFactory, CardFactory, $rootScope){
	$rootScope.$on("stateChange", function(event, payload){
		let gameState = payload.gameState;
		if(gameState.currentPhase === "draw"){
			for(let i=0; i<2; i++){
				gameState = pickACard(gameState);
      }
      gameState.currentPhase = 'discard';
      $rootScope.$broadcast('phaseChanged', gameState);
		} else if (gameState.currentPhase === "discard") {
      if(gameState.gamers[gameState.gamerTurn].hand.length <= 7) {
        gameState.currentPhase = 'infect';
        $rootScope.$broadcast('phaseChanged', gameState);
      }
    } else if(gameState.currentPhase === "infect"){
      gameState = InfectionFactory.infect(gameState);
      gameState.currentPhase = 'actions';
      gameState.gamerTurn = (gamerState.gamerTurn + 1) % 4;
      $rootScope.$broadcast('phaseChanged', gameState);
		}

	});


	function pickACard(gameState){
		let newCard = CardFactory.pickCardFromTop(gameState.playerDeck);
		if(newCard.type === "epidemicCard"){
			gameState = InfectionFactory.epidemic(gameState);
		}else{
			let currentTurn = gameState.gamerTurn;
			gameState.gamers[currentTurn].hand.push(newCard);
		}
		return gameState;
	};

	return function(){
		console.log("the FlowFactory has been instantiated")
	};
});
