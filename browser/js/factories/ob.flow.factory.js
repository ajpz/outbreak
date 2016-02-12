app.factory("FlowFactory", function(InfectionFactory, CardFactory, $rootScope, InfectionLevelArray){

    //TODO: epidemic needs to add another (3rd) card to the drawnCards from the infection deck
    //TODO: need to expand draw phase logic below to accomodate special case of
    //epidemic drawn first, or second

  var gameState;
  var previousLengthOfDrawnCards = null;
  var previousLengthOfInfectedCards = null;

  //picks a card from the player deck - handles both epidemics & city cards
  var pickACard = function (gameState){
    let newCard = CardFactory.pickCardFromTop(gameState.playerDeck);

    if (!gameState.playerDeck.length) {
      gameState.status = "gameOver";
      gameState.gameOver.win = false;
      gameState.gameOver.lossType = "noMoreCards";
    }

    if(newCard.type === "epidemicCard"){
      gameState = InfectionFactory.epidemic(gameState);
      gameState.drawnCards.push(newCard);
    } else {
      let currentTurn = gameState.gamerTurn;
      gameState.gamers[currentTurn].hand.push(newCard);
      gameState.drawnCards.push(newCard);
    }
    return gameState;
  };


  //waits on user to make discard selections
  $rootScope.$on('discardCardChosen', function(event, discard) {

    if(!gameState.chosenDiscards) gameState.chosenDiscards = [];

    if(gameState.gamers[gameState.gamerTurn].username === localStorage.getItem('user')) {
      var hand = gameState.gamers[gameState.gamerTurn].hand;

      gameState.gamers[gameState.gamerTurn].hand = hand.filter(function(cardObj) {
        return cardObj.key !== discard.key;
      })

      gameState.chosenDiscards.push(discard);
      $rootScope.$broadcast('saveDiscardCard', gameState);
    }

  });


	$rootScope.$on("stateChange", function(event, payload){
    //create local working copy of state
    gameState = _.cloneDeep(payload.gameState);

    // currentPhase will determine what FlowFactory will do
    switch (gameState.currentPhase) {
      case 'draw':

        //make toasts for EPIDEMICS!
        if(gameState.drawnCards && (gameState.drawnCards[gameState.drawnCards.length - 1].type === 'epidemicCard')) {
          $rootScope.$broadcast('renderEpidemicEvent', {message: "EPIDEMIC IN EFFECT!", duration: 5000});
          $rootScope.$broadcast('renderEpidemicEvent', {message: "The infection rate marker has advanced.", duration: 6000});
          $rootScope.$broadcast('renderEpidemicEvent', {message: "Drawing an infection card from the bottom of the deck and adding 3 disease units to that city.", duration: 7000});
          $rootScope.$broadcast('renderEpidemicEvent', {message: "Shuffling the infection discard deck and returning to the top of the infection deck.", duration: 8000});
        }

        //render Infection card drawn during an EPIDEMIC!
        if(gameState.drawnInfections) {
          $rootScope.$broadcast('renderInfectionEvent', {
            message: null,
            drawnInfections: gameState.drawnInfections,
            currentPhase: gameState.currentPhase
          })
          gameState.drawnInfections = [];
        }

        //notify players of stateChange, but only the first time we enter 'draw'
        //everyone browser sees this, every browser does this
        if(!gameState.drawnCards && !previousLengthOfDrawnCards) {
          //create drawnCards array
          gameState.drawnCards = [];
          previousLengthOfDrawnCards = 0;

          var message = 'The '+ gameState.gamers[gameState.gamerTurn].role +
            ' is about to draw new player cards.';

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
        } else if (gameState.drawnCards.length === 1 && previousLengthOfDrawnCards === 0) {
          previousLengthOfDrawnCards++;
          //broadcast so that show-card can display the event, show-card handles setting a timeout
          $rootScope.$broadcast('renderDrawEvent', {
            message: null,
            drawnCards: gameState.drawnCards,
            callback: function() {
              //if this browser has the turn, this browser picks a card and saves to firebase
              if(gameState.gamers[gameState.gamerTurn].username === localStorage.getItem('user')) {
                gameState = pickACard(gameState);
                gameState.drawnInfections = [];
                $rootScope.$broadcast('saveDrawnCard', gameState);
              }
            }
          });

        } else if (gameState.drawnCards.length === 2 && previousLengthOfDrawnCards === 1) {
          previousLengthOfDrawnCards = null;
          //broadcast so that show-card can display the event, show-card handles setting a timeout
          $rootScope.$broadcast('renderDrawEvent', {
            message: null,
            drawnCards: gameState.drawnCards,
            callback: function() {
              //if this browser has the turn, this browser advances phase to discard, wipes drawnCards, and saves to firebase
              if(gameState.gamers[gameState.gamerTurn].username === localStorage.getItem('user')) {
                gameState.currentPhase = 'discard';
                gameState.drawnCards = [];
                gameState.drawnInfections = [];
                $rootScope.$broadcast('phaseChanged', gameState);
              }
            }
          });
        }

        break;

      case 'discard':

        if(gameState.gamers[gameState.gamerTurn].hand.length <= 7 && !gameState.chosenDiscards) {
          gameState.currentPhase = 'infect';

          $rootScope.$broadcast('phaseChanged', gameState);

        } else {
          //notify players of stateChange, but only the first time we enter 'draw'
          //everyone browser sees this, every browser does this
          if(!gameState.chosenDiscards) {
            //TODO: alert for now, later, $broadcast to ngToast that drawing is occuring
            var message = 'The '+ gameState.gamers[gameState.gamerTurn].role +
              ' is about to DISCARD cards. Please select ' + (gameState.gamers[gameState.gamerTurn].hand.length - 7) + ' card(s) to discard.';

            $rootScope.$broadcast('renderDiscardEvent', {
              message: message,
              chosenDiscards: null
            });
          } else if (gameState.gamers[gameState.gamerTurn].hand.length > 7 ) {
            //broadcast so that show-card can display the event, show-card handles setting a timeout
            var message = 'The '+ gameState.gamers[gameState.gamerTurn].role +
              ' has discarded ' + gameState.chosenDiscards[gameState.chosenDiscards.length - 1].name + '.';

            $rootScope.$broadcast('renderDiscardEvent', {
              message: message,
              chosenDiscards: gameState.chosenDiscards
            });

          } else if (gameState.gamers[gameState.gamerTurn].hand.length === 7) {
            //broadcast so that show-card can display the event, show-card handles setting a timeout
            var message = 'The '+ gameState.gamers[gameState.gamerTurn].role +
              ' has discarded ' + gameState.chosenDiscards[gameState.chosenDiscards.length - 1].name + '.';

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
        // logic for the one quiet night event card
        // the set up for this is played in the navbar.js
        if (gameState.eventCardInEffect){
          if (gameState.eventCardQueue[0] === "oneQuietNight"){
            gameState.eventCardQueue.shift();
          }
          gameState.currentPhase = 'actions';
          gameState.drawnInfections = [];
          gameState.gamerTurn = (gameState.gamerTurn + 1) % 4;
          // the assumption is to turn eventCardInEffect
          // how and when do I know to eventInEffect should be turned to false
          $rootScope.$broadcast('genericUpdates', {
            message : 'One Quiet night was played. The infection state will be skipped.',
            currentPhase : gameState.currentPhase,
            drawnInfections : gameState.drawnInfections,
            gamerTurn : gameState.gamerTurn,
            eventCardQueue : gameState.eventCardQueue,
            eventCardInEffect : false
          });
          break;
        }

        //if an outbreak occured, make toast!
        if(gameState.outbreaksDuringTurn) {
          Object.keys(gameState.outbreaksDuringTurn).forEach(function(epicenter){
            var message = 'An OUTBREAK hit ' + epicenter + '. Infections have spread to ';
            gameState.outbreaksDuringTurn[epicenter].forEach(function(cityHit) {
              message += cityHit + ', ';
            })
            message = message.slice(0, message.length-1);
            message += '.'
            $rootScope.$broadcast('outbreak', { message: message });
          });
          gameState.outbreaksDuringTurn = {};
        };

        var infectionRate = InfectionLevelArray.levels[gameState.infectionLevelIndex];
        //notify players of stateChange, but only the first time we enter 'infect'
        //everyone browser sees this, every browser does this
        if(!gameState.drawnInfections && previousLengthOfInfectedCards === null) {
          //create drawnInfections array
          previousLengthOfInfectedCards = 0;

          var message = 'New infections are rapidly spreading! Infecting '+ infectionRate + ' cities';

          $rootScope.$broadcast('renderInfectionEvent', {
            message: message,
            drawnInfections: null,
            infectionRate: infectionRate,
            callback: function() {
              if(gameState.gamers[gameState.gamerTurn].username === localStorage.getItem('user')) {
                gameState.drawnInfections = [];
                gameState = InfectionFactory.infect(gameState);
                $rootScope.$broadcast('saveInfectionCard', gameState);
              }
            }
          });
        } else if (gameState.drawnInfections && gameState.drawnInfections.length < infectionRate && previousLengthOfInfectedCards !== gameState.drawnInfections.length) {
          //broadcast so that show-card can display the event, show-card handles setting a timeout
          previousLengthOfInfectedCards++;

          $rootScope.$broadcast('renderInfectionEvent', {
            message: null,
            drawnInfections: gameState.drawnInfections,
            infectionRate: infectionRate,
            callback: function() {
              //if this browser has the turn, this browser picks a card and saves to firebase
              if(gameState.gamers[gameState.gamerTurn].username === localStorage.getItem('user')) {
                gameState = InfectionFactory.infect(gameState);
                $rootScope.$broadcast('saveInfectionCard', gameState);
              }
            }
          });

        } else if (gameState.drawnInfections && gameState.drawnInfections.length === infectionRate && previousLengthOfInfectedCards === (gameState.drawnInfections.length - 1)) {

          previousLengthOfInfectedCards = null;
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
        break;
    }
	});

  return function() {
    console.log("the FlowFactory has been instantiated")
  };
});
