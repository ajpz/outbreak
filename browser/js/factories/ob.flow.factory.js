app.factory("FlowFactory", function(InfectionFactory, CardFactory, $rootScope, InfectionLevelArray){

    //TODO: epidemic needs to add another (3rd) card to the drawnCards from the infection deck
    //TODO: need to expand draw phase logic below to accomodate special case of
    //epidemic drawn first, or second

  var gameState;

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
    console.log('in dscardCardChosen with ', discard.name);

    if(!gameState.chosenDiscards) gameState.chosenDiscards = [];
    if(gameState.gamers[gameState.gamerTurn].username === localStorage.getItem('user')) {
      var hand = gameState.gamers[gameState.gamerTurn].hand;

      gameState.gamers[gameState.gamerTurn].hand = hand.filter(function(cardObj) {
        return cardObj.key !== discard.key;
      })

      gameState.chosenDiscards.push(discard);
      console.log('<><><><><><>< BROADCASTING FROM discardCardChosen')
      $rootScope.$broadcast('saveDiscardCard', gameState);
    }

  });


	$rootScope.$on("stateChange", function(event, payload){
    //create local working copy of state
    gameState = _.cloneDeep(payload.gameState);

    // currentPhase will determine what FlowFactory will do
    switch (gameState.currentPhase) {


      case 'draw':
      console.log('\n>>>>>>>Remaining player cards: ', gameState.playerDeck.length);
        //notify players of stateChange, but only the first time we enter 'draw'
        //everyone browser sees this, every browser does this
        if(!gameState.drawnCards) {
          //create drawnCards array
          gameState.drawnCards = [];

          var message = 'The '+ gameState.gamers[gameState.gamerTurn].role +
            ' is about to draw new player cards.';

          $rootScope.$broadcast('renderDrawEvent', {
            message: message,
            drawnCards: null,
            callback: function() {
              if(gameState.gamers[gameState.gamerTurn].username === localStorage.getItem('user')) {
                gameState = pickACard(gameState);
                console.log('<><><><><><>< BROADCASTING FROM DRAW 1')
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
                console.log('<><><><><><>< BROADCASTING FROM DRAW 2')
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
                console.log('<><><><><><>< BROADCASTING FROM DRAW 3')
                $rootScope.$broadcast('phaseChanged', gameState);
              }
            }
          });
        }

        break;

      case 'discard':
        // alert('DISCARD PHASE SEEN IN FLOWFACTORY')

        // if(gameState.gamers[gameState.gamerTurn].hand.length <= 7) {
        //   gameState.currentPhase = 'infect';
        //   $rootScope.$broadcast('phaseChanged', gameState);
        // }

        if(gameState.gamers[gameState.gamerTurn].hand.length <= 2 && !gameState.chosenDiscards) {
          gameState.currentPhase = 'infect';
          console.log('in discard event but switching to infect')
          $rootScope.$broadcast('phaseChanged', gameState);
        } else {
          //notify players of stateChange, but only the first time we enter 'draw'
          //everyone browser sees this, every browser does this
          if(!gameState.chosenDiscards) {
            console.log('in beginning of discard -- nothing on state yet')
            //TODO: alert for now, later, $broadcast to ngToast that drawing is occuring
            var message = 'The '+ gameState.gamers[gameState.gamerTurn].role +
              ' is about to discard cards.';

            $rootScope.$broadcast('renderDiscardEvent', {
              message: message,
              chosenDiscards: null
            });
          } else if (gameState.gamers[gameState.gamerTurn].hand.length > 2 ) {
            //broadcast so that show-card can display the event, show-card handles setting a timeout
            console.log('hand is greater than 2, chosenDiscards are ', gameState.chosenDiscards);
            var message = 'The '+ gameState.gamers[gameState.gamerTurn].role +
              ' has discarded ';
            gameState.chosenDiscards.forEach(function(discard) {
                message = message + discard.name + ' ';
              })

            $rootScope.$broadcast('renderDiscardEvent', {
              message: message,
              chosenDiscards: gameState.chosenDiscards
            });

          } else if (gameState.gamers[gameState.gamerTurn].hand.length = 2) {
            //broadcast so that show-card can display the event, show-card handles setting a timeout
            console.log('hand is 2, chosenDiscards are ', gameState.chosenDiscards);
            var message = 'The '+ gameState.gamers[gameState.gamerTurn].role +
              ' has discarded ';
            gameState.chosenDiscards.forEach(function(discard) {
                message = message + discard.name + ' ';
              })

            $rootScope.$broadcast('renderDiscardEvent', {
              message: message,
              chosenDiscards: gameState.chosenDiscards,
              callback: function() {
                //if this browser has the turn, this browser advances phase to discard, wipes chosenDiscards, and saves to firebase
                if(gameState.gamers[gameState.gamerTurn].username === localStorage.getItem('user')) {
                  gameState.currentPhase = 'infect';
                  gameState.chosenDiscards = [];
                  console.log('<><><><><><>< BROADCASTING FROM DISCARD 1')
                  $rootScope.$broadcast('phaseChanged', gameState);
                }
              }
            });
          }
        }


        break;

      case 'infect':
        var infectionRate = InfectionLevelArray.levels[gameState.infectionLevelIndex];
        //notify players of stateChange, but only the first time we enter 'infect'
        //everyone browser sees this, every browser does this
        console.log('\n\nEntering infect with ', gameState.drawnInfections)
        if(!gameState.drawnInfections) {
          //create drawnInfections array
          gameState.drawnInfections = [];
          console.log('\n\n..........in infect with no drawnInfections')
          var message = 'New infections are rapidly spreading! Infecting '+ infectionRate + ' cities';

          $rootScope.$broadcast('renderInfectionEvent', {
            message: message,
            drawnInfections: null,
            infectionRate: infectionRate,
            callback: function() {
              console.log('\n\n..........in infect with no drawnInfections CALLBACK')

              if(gameState.gamers[gameState.gamerTurn].username === localStorage.getItem('user')) {
                console.log('before infect: ', gameState.drawnInfections)
                gameState = InfectionFactory.infect(gameState);
                console.log('after infect: ', gameState.drawnInfections)
                console.log('<><><><><><>< BROADCASTING FROM INFECT 1')
                $rootScope.$broadcast('saveInfectionCard', gameState);
              }
            }
          });
        } else if (gameState.drawnInfections.length < infectionRate) {
          //broadcast so that show-card can display the event, show-card handles setting a timeout
          console.log('\n\n..........in infect with drawnInfections less than')

          $rootScope.$broadcast('renderInfectionEvent', {
            message: null,
            drawnInfections: gameState.drawnInfections,
            infectionRate: infectionRate,
            callback: function() {
              console.log('\n\n..........in infect with drawnInfections less than CALLBACK')

              //if this browser has the turn, this browser picks a card and saves to firebase
              if(gameState.gamers[gameState.gamerTurn].username === localStorage.getItem('user')) {
                gameState = InfectionFactory.infect(gameState);
                console.log('<><><><><><>< BROADCASTING FROM INFECT 2')
                $rootScope.$broadcast('saveInfectionCard', gameState);
              }
            }
          });

        } else if (gameState.drawnInfections.length === infectionRate) {
          console.log('\n\n..........in infect with drawnInfections equal to')

          //broadcast so that show-card can display the event, show-card handles setting a timeout
          $rootScope.$broadcast('renderInfectionEvent', {
            message: null,
            drawnInfections: gameState.drawnInfections,
            infectionRate: infectionRate,
            callback: function() {
              console.log('\n\n..........in infect with drawnInfections equal to CALLBACK')
              //if this browser has the turn, this browser advances phase to discard, wipes drawnInfections, and saves to firebase
              if(gameState.gamers[gameState.gamerTurn].username === localStorage.getItem('user')) {
                gameState.currentPhase = 'actions';
                gameState.drawnInfections = [];
                gameState.gamerTurn = (gameState.gamerTurn + 1) % 4;
                console.log('<><><><><><>< BROADCASTING FROM INFECT 3')
                $rootScope.$broadcast('phaseChanged', gameState);
              }
            }
          });
        }
        break;
    }
	});

  return function() {
    console.log("the FlowFactory has been instantiated")
  };
});
