app.factory("FlowFactory", function(InfectionFactory, CardFactory, $rootScope){
	$rootScope.$on("stateChange", function(event, payload){
		let gameState = payload.gameState;
		if(gameState.currentPhase === "draw"){
			for(let i=0; i<2; i++){
				gameState = pickACard(gameState);
			}
		}else if(gameState.currentPhase === "infect"){
			gameState = InfectionFactory.infect(gameState);
		}
		$rootScope.$broadcast('phaseChanged', {gameState: gameState});

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