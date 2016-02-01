app.factory('InitializationFactory', function($rootScope, CitiesCardFactory, InfectionFactory, CardFactory, SetToGameState) {

  //TODO: GameFactory to remove all references to CitiesCardFactory and InfectionFactory

  const createPlayerDeck = CitiesCardFactory.createPlayerDeck;
  const createInfectionDeck = InfectionFactory.createInfectionDeck;
  const dealPlayerCards = function(workingState) {
    const cardNumMap = { "2": 4, "3": 3, "4": 2 };
    let gamers = workingState.gamers;
    let numCards = cardNumMap[workingState.gamers.length.toString()];

    for (let num = 1; num <= numCards; num++ ) {
      for (let i = 0; i < gamers.length; i++) {

        let dealtCard = CardFactory.pickCardFromTop(workingState.playerDeck);
        gamers[i].hand.push(dealtCard);

      }

    }
    return workingState;
  };


  return {


    initializeGameElements: function(workingState) {
      SetToGameState(createPlayerDeck(workingState));  // returns deck
      SetToGameState(createInfectionDeck(workingState)); // returns deck
      SetToGameState(dealPlayerCards(workingState)); //


    },
    giveUserARole: function() {

    }
  }
});

  $rootScope.$on('statusChanged', function(event, payload) {

    switch(localState.status) {

      case 'initialization' :
        localState = InitializationFactory.initializeGameElements(_.cloneDeep(localState));
        localState.$save();
        break;

      case 'inProgress' :

        break;

      case 'gameOver' ;

        break;
    }
  });


  var saveToFirebase = function(workingState) {

    localState = workingState;
    return localState.$save()
      .then(function(localState){
        return localState;
      })

  };
