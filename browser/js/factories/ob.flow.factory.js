app.factory("FlowFactory", function(InfectionFactory, CardFactory, $rootScope, InfectionLevelArray){

    //TODO: need to expand draw phase logic below to accomodate special case of
    //epidemic drawn first, or second

  var previousLengthOfDrawnCards = null;
  var previousLengthOfInfectedCards = null;
  var infectionRate;

  var currState;

  /****************************************
   * HELPER FUNCTIONS
  *****************************************/

  var advanceGamePhase = function(nextPhase, shouldAdvanceTurn) {
    //if this browser isn't active, do nothing.
    if(currState.gamers[currState.gamerTurn].username !== localStorage.getItem('user')) return;
    //set updated phase
    currState.currentPhase = nextPhase;
    //if the player turn is changing, advance it as well
    if(shouldAdvanceTurn) currState.gamerTurn = (currState.gamerTurn + 1) % currState.gamers.length;
    //reset all card-tracking arrays to empty
    currState.drawnCards = [];
    currState.drawnInfections = [];
    currState.chosenDiscards = [];
    //save to Firebase
    $rootScope.$broadcast('phaseChanged', currState);
  };

  var handlePossibleOutbreak = function() {
    if(currState.outbreaksDuringTurn) {
      //write message
      Object.keys(currState.outbreaksDuringTurn).forEach(function(epicenter){
        var message = 'An OUTBREAK hit ' + epicenter + '. Infections have spread to ' +
          currState.outbreaksDuringTurn[epicenter].join(', ') + '.';
        $rootScope.$broadcast('outbreak', { message: message });
      });
      //reset outbreaksDuringTurn
      currState.outbreaksDuringTurn = {};
    };
  };

  //helper function to handle epidemics drawn during city card draw phase
  var handlePossibleEpidemic = function() {
    //if no cards drawn yet, do nothing
    if(!currState.drawnCards) return;
    //if an epidemic card was drawn last
    if(currState.drawnCards[currState.drawnCards.length - 1].type === 'epidemicCard') {
      if(previousLengthOfDrawnCards === currState.drawnCards.length - 1) {
        //broadcast to gameState so that notification "toasts" can be made
        $rootScope.$broadcast('renderEpidemicEvent', {message: "EPIDEMIC IN EFFECT!", duration: 5000});
        $rootScope.$broadcast('renderEpidemicEvent', {message: "The infection rate marker has advanced.", duration: 6000});
        $rootScope.$broadcast('renderEpidemicEvent', {message: "Drawing an infection card from the bottom of the deck and adding 3 disease units to that city.", duration: 7000});
        $rootScope.$broadcast('renderEpidemicEvent', {message: "Shuffling the infection discard deck and returning to the top of the infection deck.", duration: 8000});
      }
    }
    //broadcast the infection card that was draw to show-card.directive
    if(currState.drawnInfections) {
      $rootScope.$broadcast('renderInfectionEvent', {
        message: null,
        drawnInfections: currState.drawnInfections,
        currentPhase: currState.currentPhase
      })
      //if an outbreak occured, make toast!
      handlePossibleOutbreak();
      //reset drawnInfections
      currState.drawnInfections = [];
    }
  };

  var handlePossibleEventCard = function() {
    // logic for the one quiet night event card
    // the set up for this is played in the navbar.js
    if (currState.eventCardInEffect){
      if (currState.eventCardQueue[0] === "oneQuietNight"){
        currState.eventCardQueue.shift();
        currState.currentPhase = 'actions';
        currState.drawnInfections = [];
        currState.gamerTurn = (currState.gamerTurn + 1) % currState.gamers.length;
        // the assumption is to turn eventCardInEffect
        // how and when do I know to eventInEffect should be turned to false
        $rootScope.$broadcast('genericUpdates', {
          message : 'One Quiet night was played. The infection state will be skipped.',
          currentPhase : currState.currentPhase,
          drawnInfections : currState.drawnInfections,
          gamerTurn : currState.gamerTurn,
          eventCardQueue : currState.eventCardQueue,
          eventCardInEffect : false
        });
        return true;
      }
    }
    return false;
  };

  //picks a card from the player deck - handles both epidemics & city cards
  var pickAPlayerCard = function (){
    //if this browser isn't active, do nothing.
    if(currState.gamers[currState.gamerTurn].username !== localStorage.getItem('user')) return;
    //pick a card
    let newCard = CardFactory.pickCardFromTop(currState.playerDeck);
    //if playerDeck is now empty, it's gameOver
    if (!currState.playerDeck.length) {
      currState.status = "gameOver";
      currState.gameOver.win = false;
      currState.gameOver.lossType = "noMoreCards";
    }
    // handle epidemic cards
    if(newCard.type === "epidemicCard"){
      InfectionFactory.epidemic(currState);
      currState.drawnCards.push(newCard);
    } else {
      //handle regular city cards
      currState.gamers[currState.gamerTurn].hand.push(newCard);
      currState.drawnCards.push(newCard);
    }
    //save to Firebase
    $rootScope.$broadcast('saveDrawnCard', currState);
  };

  //picks a card from the infection deck
  var pickAnInfectionCard = function() {
    //if this browswer isn't active, do nothing.
    if(currState.gamers[currState.gamerTurn].username !== localStorage.getItem('user')) return;
    //otherwise, infect based on the drawn card and then save to Firebase
    InfectionFactory.infect(currState);
    $rootScope.$broadcast('saveInfectionCard', currState);

  };

  /****************************************
   * $rootScope listeners
  *****************************************/

  //listens on a user making a discard selection
  $rootScope.$on('discardCardChosen', function(event, discard) {
    //if this browswer isn't active, do nothing.
    if(currState.gamers[currState.gamerTurn].username !== localStorage.getItem('user')) return;
    //intialize chosenDiscards array
    if(!currState.chosenDiscards) currState.chosenDiscards = [];
    //remove discarded card from the player's currentHand
    var currentHand = currState.gamers[currState.gamerTurn].hand;
    currState.gamers[currState.gamerTurn].hand = currentHand.filter(function(cardObj) {
      return cardObj.key !== discard.key;
    })
    // add discard to chosenDiscards array and save to Firebase
    currState.chosenDiscards.push(discard);
    $rootScope.$broadcast('saveDiscardCard', currState);

  });


	$rootScope.$on("stateChange", function(event, payload){
    var packet;
    currState = _.cloneDeep(payload.gameState);

    switch (currState.currentPhase) {

      case 'draw':
        handlePossibleEpidemic();
        //notify players of stateChange, but only the first time we enter 'draw'
        if(!currState.drawnCards && !previousLengthOfDrawnCards) {
          currState.drawnCards = [];
          previousLengthOfDrawnCards = 0;
          //create packet for broadcast to show-card directive
          //show-card will set a timeout before picking a first card
          packet = {
            message: 'The '+ currState.gamers[currState.gamerTurn].role +
              ' is about to draw new player cards.',
            drawnCards: null
          };
        } else if (currState.drawnCards.length === 1 && previousLengthOfDrawnCards === 0) {
          previousLengthOfDrawnCards++;
          //create packet for broadcast to show-card directive
          //show-card will display the drawn card and set a timeout before picking second card
          packet = {
              message: null,
              drawnCards: _.cloneDeep(currState.drawnCards)
            }
        } else if (currState.drawnCards.length === 2 && previousLengthOfDrawnCards === 1) {
          previousLengthOfDrawnCards = null;
          //create packet for broadcast to show-card directive
          //show-card will display the drawn card and set a timeout before advancing phase to discard
          packet = {
            message: null,
            drawnCards: _.cloneDeep(currState.drawnCards)
          }
        }
        //broadcast packet to show-card (display cards)and game.controller (toast)
        if(packet) $rootScope.$broadcast('renderDrawEvent', packet);
        break;

      case 'discard':
        if(currState.gamers[currState.gamerTurn].hand.length <= 7 && !currState.chosenDiscards) {
          //if hand doesn't need to discard, move on to infect
          advanceGamePhase('infect', false);
        } else {
          //notify players of stateChange, but only the first time we enter 'discard' phase
          if(!currState.chosenDiscards) {
            packet = {
              message: 'The '+
                currState.gamers[currState.gamerTurn].role +
                ' is about to DISCARD cards. Please select ' +
                (currState.gamers[currState.gamerTurn].hand.length - 7) +
                ' card(s) to discard.'
            }
          } else if (currState.gamers[currState.gamerTurn].hand.length > 7 ) {
            //create packet so we can make a message toast identifying discard
            packet = {
              message: 'The '+
                currState.gamers[currState.gamerTurn].role +
                ' has discarded ' +
                currState.chosenDiscards[currState.chosenDiscards.length - 1].name + '.'
            };
          } else if (currState.gamers[currState.gamerTurn].hand.length === 7) {
            //create packet so we can make a message toast identifying discard
            packet = {
              message: 'The '+
                currState.gamers[currState.gamerTurn].role +
                ' has discarded ' +
                currState.chosenDiscards[currState.chosenDiscards.length - 1].name + '.'
            };
            //advance phase to infection
            setTimeout(advanceGamePhase.bind(null, 'infect', false), 2000);
          }
          //broadcast packet to show-card (display cards)and game.controller (toast)
          if(packet) $rootScope.$broadcast('renderDiscardEvent', packet);
        }
        break;

      case 'infect':
        //if 'OneQuietNight' is played, skip the infection step
        if(handlePossibleEventCard()) break;
        //if an outbreak occured, make toast!
        handlePossibleOutbreak();
        //notify players of stateChange, but only the first time we enter 'infect'
        if(!currState.drawnInfections && previousLengthOfInfectedCards === null) {
          currState.drawnInfections = [];
          previousLengthOfInfectedCards = 0;
          infectionRate = InfectionLevelArray.levels[currState.infectionLevelIndex];
          //create packet for broadcast to show-card directive
          //show-card will display the drawn card and set a timeout before picking first card
          packet = {
            message: 'New infections are rapidly spreading! Infecting '+ infectionRate + ' cities',
            drawnInfections: null,
            infectionRate: infectionRate
          };
        } else if (currState.drawnInfections && currState.drawnInfections.length < infectionRate && previousLengthOfInfectedCards === currState.drawnInfections.length - 1) {
          previousLengthOfInfectedCards++;
          //create packet for broadcast to show-card directive
          //show-card will display the drawn card and set a timeout before picking next card
          packet = {
            message: null,
            drawnInfections: _.cloneDeep(currState.drawnInfections),
            infectionRate: infectionRate
          };
        } else if (currState.drawnInfections && currState.drawnInfections.length === infectionRate && previousLengthOfInfectedCards === (currState.drawnInfections.length - 1)) {
          previousLengthOfInfectedCards = null;
          //create packet for broadcast to show-card directive
          //show-card will display the drawn card and set a timeout before advancing phase to actions
          packet = {
            message: null,
            drawnInfections: _.cloneDeep(currState.drawnInfections),
            infectionRate: infectionRate
          };
        }
        //broadcast packet to show-card (display cards)and game.controller (toast)
        if(packet) $rootScope.$broadcast('renderInfectionEvent', packet);
        break;
    }
	});

  /****************************************
   * export singleton for injection
  *****************************************/

  return {
    pickAPlayerCard: pickAPlayerCard,
    pickAnInfectionCard: pickAnInfectionCard,
    advanceGamePhaseToDiscard: advanceGamePhase.bind(null, 'discard', false),
    advanceGamePhaseToInfect: advanceGamePhase.bind(null, 'infect', false),
    advanceGamePhaseToActions: advanceGamePhase.bind(null, 'actions', true)
  }
});
