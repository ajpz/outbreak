app.factory("FlowFactory", function(InfectionFactory, CardFactory, $rootScope){


    var pickACard = function (gameState){

    let newCard = CardFactory.pickCardFromTop(gameState.playerDeck);

    if(newCard.type === "epidemicCard"){
      alert('THERE WAS AN EPIDEMIC!')
      gameState = InfectionFactory.epidemic(gameState);
      gameState.cardDrawn.push(newCard);
    } else {
      let currentTurn = gameState.gamerTurn;
      gameState.gamers[currentTurn].hand.push(newCard);
      gameState.cardDrawn.push(newCard);
    }
    return gameState;
  };


	$rootScope.$on("stateChange", function(event, payload){
    //create local working copy of state
    var gameState = _.cloneDeep(payload.gameState);

    // currentPhase will determine what FlowFactory will do
    switch (gameState.currentPhase) {

      case 'draw':
        //notify players of stateChange, but only the first time we enter 'draw'
        //everyone browser sees this, every browser does this
        if(!gameState.drawnCards) {
          //create drawnCards array
          gameState.drawnCards = [];
          //TODO: alert for now, later, $broadcast to ngToast that drawing is occuring
          var message = 'The '+ gameState.gamers[gameState.gamerTurn].role +
            ' is about to draw new player cards.';
          //TODO: remove this when things works
          alert(message);
          // get ngToast in home state controller to render message to all browsers
          $rootScope.$broadcast('renderDrawEvent', {
            message: message,
            drawnCards: null,
            callback: function() {
              if(gameState.gamers[gameState.gamerTurn].username === localStorage.getItem('user')) {
                gameState = pickACard(gameState);
                $rootScope.$broadcast('saveDrawnCard', gameState);
              }
            }
          });
        } else if (gameState.drawnCards.length === 1) {
          //broadcast so that show-card can display the event, show-card handles setting a timeout
          $rootScope.$broadcast('renderDrawEvent', {
            message: null,
            drawnCards: gameState.drawnCards,
            callback: function() {
              //if this browser has the turn, this browser picks a card and saves to firebase
              if(gameState.gamers[gameState.gamerTurn].username === localStorage.getItem('user')) {
                gameState = pickACard(gameState);
                $rootScope.$broadcast('saveDrawnCard', gameState);
              }
            }
          });

        } else if (gameState.drawnCards.length === 2) {
          //broadcast so that show-card can display the event, show-card handles setting a timeout
          $rootScope.$broadcast('renderDrawEvent', {
            message: null,
            drawnCards: gameState.drawnCards,
            callback: function() {
              //if this browser has the turn, this browser advances phase to discard, wipes drawnCards, and saves to firebase
              if(gameState.gamers[gameState.gamerTurn].username === localStorage.getItem('user')) {
                gameState = gameState.currentPhase = 'discard';
                gameState.drawnCards = [];
                $rootScope.$broadcast('phaseChanged', gameState);
              }
            }
          });
        }

        break;

      case 'discard':
        alert('DISCARD PHASE SEEN IN FLOWFACTORY')
        if(gameState.gamers[gameState.gamerTurn].hand.length <= 7) {
          gameState.currentPhase = 'infect';
          $rootScope.$broadcast('phaseChanged', gameState);
        }

        break;

      case 'infect':
        alert('INFECT PHASE SEEN IN FLOWFACTORY')
        gameState = InfectionFactory.infect(gameState);
        gameState.currentPhase = 'actions';
        gameState.gamerTurn = (gameState.gamerTurn + 1) % 4;
        $rootScope.$broadcast('phaseChanged', gameState);

        break;

    }




		// let gameState = payload.gameState;
		// if(gameState.currentPhase === "draw"){
  //     alert('DRAW PHASE SEEN IN FLOWFACTORY')
		// 	for(let i=0; i<2; i++){
		// 		gameState = pickACard(gameState);
  //     }
  //     gameState.currentPhase = 'discard';
  //     $rootScope.$broadcast('phaseChanged', gameState);
		// } else if (gameState.currentPhase === "discard") {
  //     alert('DISCARD PHASE SEEN IN FLOWFACTORY')
  //     if(gameState.gamers[gameState.gamerTurn].hand.length <= 7) {
  //       gameState.currentPhase = 'infect';
  //       $rootScope.$broadcast('phaseChanged', gameState);
  //     }
  //   } else if(gameState.currentPhase === "infect"){
  //     alert('INFECT PHASE SEEN IN FLOWFACTORY')
  //     gameState = InfectionFactory.infect(gameState);
  //     gameState.currentPhase = 'actions';
  //     gameState.gamerTurn = (gameState.gamerTurn + 1) % 4;
  //     $rootScope.$broadcast('phaseChanged', gameState);
		// }

	});

	return function(){
		console.log("the FlowFactory has been instantiated")
	};
});
