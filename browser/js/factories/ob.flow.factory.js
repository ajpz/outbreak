app.factory("FlowFactory", function(InfectionFactory, CardFactory, $rootScope, InfectionLevelArray){



    //TODO: epidemic needs to add another (3rd) card to the drawnCards from the infection deck
    //TODO: need to expand draw phase logic below to accomodate special case of
    //epidemic drawn first, or second

    var pickACard = function (gameState){

    let newCard = CardFactory.pickCardFromTop(gameState.playerDeck);

    if(newCard.type === "epidemicCard"){
      alert('THERE WAS AN EPIDEMIC!')
      gameState = InfectionFactory.epidemic(gameState);
      gameState.drawnCards.push(newCard);
    } else {
      let currentTurn = gameState.gamerTurn;
      gameState.gamers[currentTurn].hand.push(newCard);
      gameState.drawnCards.push(newCard);
    }
    return gameState;
  };





  $rootScope.$on('discardCardChosen', function(event, discard) {

    if(!gameState.chosenDiscards) gameState.chosenDiscards = [];

    if(gameState.gamers[gameState.gamerTurn].username === localStorage.getItem('user')) {
      var hand = gameState.gamers[gameState.gamerTurn].hand;

      gameState.gamers[gameState.gamerTurn].hand = hand.filter(function(cardObj) {
        return cardObj.key !== discard.key;
      })

      gameState.chosenDiscards.push(discard);
      // if(gameState.gamers[gameState.gamerTurn].hand.length <= 7) {
      //   gameState.currentPhase = 'infect';
      //   gameState.gamerTurn
      // }

      $rootScope.$broadcast('saveDiscardCard', gameState);
    }

  });


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
          // alert(message);
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
                gameState.currentPhase = 'discard';
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

        // if(gameState.gamers[gameState.gamerTurn].hand.length <= 7 && !gameState.chosenDiscards) {
        //   gameState.currentPhase = 'infect';
        //   $rootScope.$broadcast('phaseChanged', gameState);
        // } else {
        //   //notify players of stateChange, but only the first time we enter 'draw'
        //   //everyone browser sees this, every browser does this
        //   if(!gameState.chosenDiscards) {
        //     //TODO: alert for now, later, $broadcast to ngToast that drawing is occuring
        //     var message = 'The '+ gameState.gamers[gameState.gamerTurn].role +
        //       ' is about to discard cards.';
        //     //TODO: remove this when things works
        //     // alert(message);
        //     // get ngToast in home state controller to render message to all browsers
        //     $rootScope.$broadcast('renderDiscardEvent', {
        //       message: message,
        //       chosenDiscards: null
        //     });
        //   } else if (gameState.gamers[gameState.gamerTurn].hand.length > 7 ) {
        //     //broadcast so that show-card can display the event, show-card handles setting a timeout
        //     $rootScope.$broadcast('renderDiscardEvent', {
        //       message: null,
        //       chosenDiscards: gameState.chosenDiscards
        //     });

        //   } else if (gameState.gamers[gameState.gamerTurn].hand.length = 7) {
        //     //broadcast so that show-card can display the event, show-card handles setting a timeout
        //     $rootScope.$broadcast('renderDiscardEvent', {
        //       message: null,
        //       chosenDiscards: gameState.chosenDiscards,
        //       callback: function() {
        //         //if this browser has the turn, this browser advances phase to discard, wipes chosenDiscards, and saves to firebase
        //         if(gameState.gamers[gameState.gamerTurn].username === localStorage.getItem('user')) {
        //           gameState.currentPhase = 'infect';
        //           gameState.chosenDiscards = [];
        //           $rootScope.$broadcast('phaseChanged', gameState);
        //         }
        //       }
        //     });
        //   }
        // }


        break;

      case 'infect':
        var infectionRate = InfectionLevelArray[gameState.infectionLevelIndex];
        //notify players of stateChange, but only the first time we enter 'infect'
        //everyone browser sees this, every browser does this
        if(!gameState.drawnInfections) {
          //create drawnInfections array
          gameState.drawnInfections = [];

          //TODO: alert for now, later, $broadcast to ngToast that drawing is occuring
          var message = 'New infections are rapidly spreading! Infecting '+ infectionRate + ' cities';
          //TODO: remove this when things works
          // alert(message);
          // get ngToast in home state controller to render message to all browsers
          $rootScope.$broadcast('renderInfectionEvent', {
            message: message,
            drawnInfections: null,
            infectionRate: infectionRate,
            callback: function() {
              if(gameState.gamers[gameState.gamerTurn].username === localStorage.getItem('user')) {
                gameState = InfectionFactory.infect(gameState);
                $rootScope.$broadcast('saveInfectionCards', gameState);
              }
            }
          });
        } else if (gameState.drawnInfections.length < infectionRate) {
          //broadcast so that show-card can display the event, show-card handles setting a timeout
          $rootScope.$broadcast('renderInfectionEvent', {
            message: null,
            drawnInfections: gameState.drawnInfections,
            infectionRate: infectionRate,
            callback: function() {
              //if this browser has the turn, this browser picks a card and saves to firebase
              if(gameState.gamers[gameState.gamerTurn].username === localStorage.getItem('user')) {
                gameState = InfectionFactory(gameState);
                $rootScope.$broadcast('saveInfectionCard', gameState);
              }
            }
          });

        } else if (gameState.drawnInfections.length === infectionRate) {
          //broadcast so that show-card can display the event, show-card handles setting a timeout
          $rootScope.$broadcast('renderInfectionEvent', {
            message: null,
            drawnInfections: gameState.drawnInfections,
            infectionRate: infectionRate,
            callback: function() {
              //if this browser has the turn, this browser advances phase to discard, wipes drawnInfections, and saves to firebase
              if(gameState.gamers[gameState.gamerTurn].username === localStorage.getItem('user')) {
                gameState.currentPhase = 'actions';
                gameState.drawnInfections = [];
                gameState.gamerTurn = (gameState.gamerTurn + 1) % 4;
                $rootScope.$broadcast('phaseChanged', gameState);
              }
            }
          });
        }

        // alert('INFECT PHASE SEEN IN FLOWFACTORY')
        // gameState = InfectionFactory.infect(gameState);
        // gameState.currentPhase = 'actions';
        // gameState.gamerTurn = (gameState.gamerTurn + 1) % 4;
        // $rootScope.$broadcast('phaseChanged', gameState);

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
