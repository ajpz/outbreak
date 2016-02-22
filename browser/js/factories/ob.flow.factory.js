app.factory("FlowFactory", function(InfectionFactory, CardFactory, $rootScope, InfectionLevelArray){

    //TODO: epidemic needs to add another (3rd) card to the drawnCards from the infection deck
    //TODO: need to expand draw phase logic below to accomodate special case of
    //epidemic drawn first, or second

  var gameState;
  var previousLengthOfDrawnCards = null;
  var previousLengthOfInfectedCards = null;
  var infectionRate;

  var currState;
  var prevState;


  var counter = 0;

  var advanceGamePhase = function(nextPhase, shouldAdvanceTurn) {
    if(currState.gamers[currState.gamerTurn].username !== localStorage.getItem('user')) return;

    currState.currentPhase = nextPhase;
    if(shouldAdvanceTurn) currState.gamerTurn = (currState.gamerTurn + 1) % currState.gamers.length;
    currState.drawnCards = [];
    currState.drawnInfections = [];
    $rootScope.$broadcast('phaseChanged', currState);
  };

  //helper function to handle epidemics drawn during city card draw phase
  var handlePossibleEpidemic = function() {

    //if no cards drawn yet, do nothing
    if(!currState.drawnCards) return;

    //if an epidemic card was drawn last
    if(currState.drawnCards[currState.drawnCards.length - 1].type === 'epidemicCard') {

      //TODO: get rid of this
      if((previousLengthOfDrawnCards === 0 && currState.drawnCards.length === 1) ||
         (previousLengthOfDrawnCards === 1 && currState.drawnCards.length === 2))

      //broadcast to gameState so that notification "toasts" can be made
      $rootScope.$broadcast('renderEpidemicEvent', {message: "EPIDEMIC IN EFFECT!", duration: 5000});
      $rootScope.$broadcast('renderEpidemicEvent', {message: "The infection rate marker has advanced.", duration: 6000});
      $rootScope.$broadcast('renderEpidemicEvent', {message: "Drawing an infection card from the bottom of the deck and adding 3 disease units to that city.", duration: 7000});
      $rootScope.$broadcast('renderEpidemicEvent', {message: "Shuffling the infection discard deck and returning to the top of the infection deck.", duration: 8000});
    }

    //broadcast the infection card that was draw to show-card.directive
    if(currState.drawnInfections) {
      $rootScope.$broadcast('renderInfectionEvent', {
        message: null,
        drawnInfections: currState.drawnInfections,
        currentPhase: currState.currentPhase
      })

      //if an outbreak occured, make toast!
      if(currState.outbreaksDuringTurn) {
        //write message
        Object.keys(currState.outbreaksDuringTurn).forEach(function(epicenter){
          var message = 'An OUTBREAK hit ' + epicenter + '. Infections have spread to ';
          message = message + currState.outbreaksDuringTurn[epicenter].join(', ') + '.';
          // currState.outbreaksDuringTurn[epicenter].forEach(function(cityHit) {
            // message += cityHit + ', ';
          // })
          // message = message.slice(0, message.length-2);
          // message += '.'
          $rootScope.$broadcast('outbreak', { message: message });
        });
        //reset outbreaksDuringTurn
        currState.outbreaksDuringTurn = {};
      };
      //reset drawnInfections
      currState.drawnInfections = [];
    }
  };

  //picks a card from the player deck - handles both epidemics & city cards
  var pickAPlayerCard = function (){
    //use closure to capture currState
    if(currState.gamers[currState.gamerTurn].username !== localStorage.getItem('user')) return;

    let newCard = CardFactory.pickCardFromTop(currState.playerDeck);

    if (!currState.playerDeck.length) {
      currState.status = "gameOver";
      currState.gameOver.win = false;
      currState.gameOver.lossType = "noMoreCards";
    }

    if(newCard.type === "epidemicCard"){
      currState = InfectionFactory.epidemic(currState);
      currState.drawnCards.push(newCard);
    } else {
      let currentTurn = currState.gamerTurn;
      currState.gamers[currentTurn].hand.push(newCard);
      currState.drawnCards.push(newCard);
    }
    // return currState;
    $rootScope.$broadcast('saveDrawnCard', currState);
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
    prevState = currState;
    currState = _.cloneDeep(payload.gameState);
    if(!prevState) prevState = currState;

    gameState = _.cloneDeep(payload.gameState);

    switch (currState.currentPhase) {

      case 'draw':
        //if there was an epidemic card drawn, handle it.
        handlePossibleEpidemic();

        //notify players of stateChange, but only the first time we enter 'draw'
        if(!currState.drawnCards && !previousLengthOfDrawnCards) {
          //create drawnCards array
          currState.drawnCards = [];
          previousLengthOfDrawnCards = 0;

          var message = 'The '+ currState.gamers[currState.gamerTurn].role +
            ' is about to draw new player cards.';

          $rootScope.$broadcast('renderDrawEvent', {
            message: message,
            drawnCards: null,
            callback: pickAPlayerCard
          });
        } else if (currState.drawnCards.length === 1 && previousLengthOfDrawnCards === 0) {

          previousLengthOfDrawnCards++;

          //broadcast so that show-card can display the event, show-card handles setting a timeout
          $rootScope.$broadcast('renderDrawEvent', {
            message: null,
            drawnCards: currState.drawnCards,
            callback: pickAPlayerCard
          });

        } else if (currState.drawnCards.length === 2 && previousLengthOfDrawnCards === 1) {

          previousLengthOfDrawnCards = null;

          var boundAdvanceGamePhase = advanceGamePhase.bind(null, 'discard', false);
          //broadcast so that show-card can display the event, show-card handles setting a timeout
          $rootScope.$broadcast('renderDrawEvent', {
            message: null,
            drawnCards: currState.drawnCards,
            callback: boundAdvanceGamePhase
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
        counter++;
        // logic for the one quiet night event card
        // the set up for this is played in the navbar.js
        if (gameState.eventCardInEffect){
          if (gameState.eventCardQueue[0] === "oneQuietNight"){
            gameState.eventCardQueue.shift();
          }
          gameState.currentPhase = 'actions';
          gameState.drawnInfections = [];
          gameState.gamerTurn = (gameState.gamerTurn + 1) % gameState.gamers.length;


          console.log('>>>>>GAMERTURN INCREMENTED: event card and broadcast counter is ', counter);
          console.log('gamerTurn is now: ', gameState.gamerTurn)
          console.log('currentPhase is now: ', gameState.currentPhase)
          gameState.gamers.forEach(function(gamer, index) {
            console.log('gamer ', index, ' is ', gamer.role, gamer.username);
          })

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
            message = message.slice(0, message.length-2);
            message += '.'
            $rootScope.$broadcast('outbreak', { message: message });
          });
          gameState.outbreaksDuringTurn = {};
        };

        //notify players of stateChange, but only the first time we enter 'infect'
        //everyone browser sees this, every browser does this
        if(!gameState.drawnInfections && previousLengthOfInfectedCards === null) {
          //create drawnInfections array
          gameState.drawnInfections = [];
          previousLengthOfInfectedCards = 0;

          infectionRate = InfectionLevelArray.levels[gameState.infectionLevelIndex];

          counter = 1;

          var message = 'New infections are rapidly spreading! Infecting '+ infectionRate + ' cities';

          $rootScope.$broadcast('renderInfectionEvent', {
            message: message,
            drawnInfections: null,
            infectionRate: infectionRate,
            callback: function() {
              if(gameState.gamers[gameState.gamerTurn].username === localStorage.getItem('user')) {
                gameState = InfectionFactory.infect(gameState);
                $rootScope.$broadcast('saveInfectionCard', gameState);
              }
            }
          });
        } else if (gameState.drawnInfections && gameState.drawnInfections.length < infectionRate && previousLengthOfInfectedCards === gameState.drawnInfections.length - 1) {
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
                gameState.gamerTurn = (gameState.gamerTurn + 1) % gameState.gamers.length;
                console.log('>>>>>GAMERTURN INCREMENTED: after infections, broadcast counter is ', counter);
                console.log('gamerTurn is now: ', gameState.gamerTurn)
                console.log('currentPhase is now: ', gameState.currentPhase)
                gameState.gamers.forEach(function(gamer, index) {
                  console.log('gamer ', index, ' is ', gamer.role, gamer.username);
                })

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
