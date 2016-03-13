app.factory("FlowFactory", function(InfectionFactory, CardFactory, $rootScope, InfectionLevelArray){

    //TODO: need to expand draw phase logic below to accomodate special case of
    //epidemic drawn first, or second

  var previousLengthOfDrawnCards = null;
  var previousLengthOfInfectedCards = null;
  var infectionRate;

  var currState;

  var advanceGamePhase = function(nextPhase, shouldAdvanceTurn) {
    if(currState.gamers[currState.gamerTurn].username !== localStorage.getItem('user')) return;

    currState.currentPhase = nextPhase;
    if(shouldAdvanceTurn) currState.gamerTurn = (currState.gamerTurn + 1) % currState.gamers.length;
    currState.drawnCards = [];
    currState.drawnInfections = [];
    currState.chosenDiscards = [];
    $rootScope.$broadcast('phaseChanged', currState);
  };

  var handlePossibleOutbreak = function() {
    if(currState.outbreaksDuringTurn) {
      //write message
      Object.keys(currState.outbreaksDuringTurn).forEach(function(epicenter){
        var message = 'An OUTBREAK hit ' + epicenter + '. Infections have spread to ';
        message = message + currState.outbreaksDuringTurn[epicenter].join(', ') + '.';
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
      // let currentTurn = currState.gamerTurn;
      currState.gamers[currState.gamerTurn].hand.push(newCard);
      currState.drawnCards.push(newCard);
    }
    console.log('>>>>>>>>>>>>broadcasting saveDrawnCard ', currState.drawnCards)
    $rootScope.$broadcast('saveDrawnCard', currState);
  };

  //picks a card from the infection deck
  var pickAnInfectionCard = function() {
    //if this browswer isn't active, do nothing.
    if(currState.gamers[currState.gamerTurn].username !== localStorage.getItem('user')) return;

    InfectionFactory.infect(currState);
    console.log('>>>>>>>>>>>>broadcasting saveInfectionCard ')
    $rootScope.$broadcast('saveInfectionCard', currState);

  };


  //listens on a user making a discard selection
  $rootScope.$on('discardCardChosen', function(event, discard) {
    //if this browswer isn't active, do nothing.
    if(currState.gamers[currState.gamerTurn].username !== localStorage.getItem('user')) return;

    //intialize chosenDiscards array
    if(!currState.chosenDiscards) currState.chosenDiscards = [];

    // if(currState.gamers[currState.gamerTurn].username === localStorage.getItem('user')) {

    //remove discarded card from the player's currentHand
    var currentHand = currState.gamers[currState.gamerTurn].hand;
    currState.gamers[currState.gamerTurn].hand = currentHand.filter(function(cardObj) {
      return cardObj.key !== discard.key;
    })

    currState.chosenDiscards.push(discard);
    console.log('>>>>>>>>>>>>>>broadcasting saveDiscardCard')
    $rootScope.$broadcast('saveDiscardCard', currState);
    // }

  });


	$rootScope.$on("stateChange", function(event, payload){
    var packet;

    console.log('FF TOP: [currentPhase, drawnCards, previousLengthOfDrawnCards] ', payload.gameState.currentPhase, payload.gameState.drawnCards, previousLengthOfDrawnCards);
    //create local working copy of state
    // prevState = currState;
    currState = _.cloneDeep(payload.gameState);
    // if(!prevState) prevState = _.cloneDeep(payload.gameState);

    switch (currState.currentPhase) {

      case 'draw':

        handlePossibleEpidemic();

        //notify players of stateChange, but only the first time we enter 'draw'
        if(!currState.drawnCards && !previousLengthOfDrawnCards) {
          //create drawnCards array
          currState.drawnCards = [];
          previousLengthOfDrawnCards = 0;

          packet = {
            message: 'The '+ currState.gamers[currState.gamerTurn].role +
              ' is about to draw new player cards.',
            drawnCards: null,
            callback: pickAPlayerCard
          };

        } else if (currState.drawnCards.length === 1 && previousLengthOfDrawnCards === 0) {

          previousLengthOfDrawnCards++;

          //broadcast so that show-card directive can display the event, show-card handles setting a timeout
          packet = {
              message: null,
              drawnCards: _.cloneDeep(currState.drawnCards),
              callback: pickAPlayerCard
            }

        } else if (currState.drawnCards.length === 2 && previousLengthOfDrawnCards === 1) {

          previousLengthOfDrawnCards = null;

          packet = {
            message: null,
            drawnCards: _.cloneDeep(currState.drawnCards),
            callback: advanceGamePhase.bind(null, 'discard', false),
          }

        }
        $rootScope.$broadcast('renderDrawEvent', packet);

        break;

      case 'discard':

        if(currState.gamers[currState.gamerTurn].hand.length <= 7 && !currState.chosenDiscards) {
          advanceGamePhase('infect', false);
        } else {
          //notify players of stateChange, but only the first time we enter 'discard' phase
          //everyone browser sees this, every browser does this
          if(!currState.chosenDiscards) {
            packet = {
              message: 'The '+
                currState.gamers[currState.gamerTurn].role +
                ' is about to DISCARD cards. Please select ' +
                (currState.gamers[currState.gamerTurn].hand.length - 7) +
                ' card(s) to discard.',
              chosenDiscards: null
            }

          } else if (currState.gamers[currState.gamerTurn].hand.length > 7 ) {
            packet = {
              message: 'The '+
                currState.gamers[currState.gamerTurn].role +
                ' has discarded ' +
                currState.chosenDiscards[currState.chosenDiscards.length - 1].name +
                '.',
              chosenDiscards: _.cloneDeep(currState.chosenDiscards)
            };

          } else if (currState.gamers[currState.gamerTurn].hand.length === 7) {
            //broadcast so that show-card can display the event, show-card handles setting a timeout
            packet = {
              message: 'The '+
                currState.gamers[currState.gamerTurn].role +
                ' has discarded ' +
                currState.chosenDiscards[currState.chosenDiscards.length - 1].name +
                '.',
              chosenDiscards: _.cloneDeep(currState.chosenDiscards),
              callback: advanceGamePhase.bind(null, 'infect', false)
            };
          }
          $rootScope.$broadcast('renderDiscardEvent', packet);
        }


        break;

      case 'infect':

        //if 'OneQuietNight' is played, skip the infection step
        if(handlePossibleEventCard()) break;
        //if an outbreak occured, make toast!
        handlePossibleOutbreak();

        //notify players of stateChange, but only the first time we enter 'infect'
        //everyone browser sees this, every browser does this
        if(!currState.drawnInfections && previousLengthOfInfectedCards === null) {
          //create drawnInfections array
          currState.drawnInfections = [];
          previousLengthOfInfectedCards = 0;

          infectionRate = InfectionLevelArray.levels[currState.infectionLevelIndex];

          packet = {
            message: 'New infections are rapidly spreading! Infecting '+ infectionRate + ' cities',
            drawnInfections: null,
            infectionRate: infectionRate,
            callback: pickAnInfectionCard
          };

        } else if (currState.drawnInfections && currState.drawnInfections.length < infectionRate && previousLengthOfInfectedCards === currState.drawnInfections.length - 1) {
          //broadcast so that show-card can display the event, show-card handles setting a timeout
          previousLengthOfInfectedCards++;

          packet = {
            message: null,
            drawnInfections: _.cloneDeep(currState.drawnInfections),
            infectionRate: infectionRate,
            callback: pickAnInfectionCard
          };

        } else if (currState.drawnInfections && currState.drawnInfections.length === infectionRate && previousLengthOfInfectedCards === (currState.drawnInfections.length - 1)) {

          previousLengthOfInfectedCards = null;
          //broadcast so that show-card can display the event, show-card handles setting a timeout

          packet = {
            message: null,
            drawnInfections: _.cloneDeep(currState.drawnInfections),
            infectionRate: infectionRate,
            callback: advanceGamePhase.bind(null, 'actions', true)
          };
        }
        if(packet) $rootScope.$broadcast('renderInfectionEvent', packet);
        break;
    }
	});

  return function() {
    console.log("the FlowFactory has been instantiated")
  };
});
