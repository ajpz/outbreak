app.factory('InitFactory', function(CitiesCardFactory, InfectionFactory, CardFactory, LobbyFactory, $location) {

  let fullPathArr = $location.path().split('/');
  let lobbyId = fullPathArr[fullPathArr.length-1]

  const cardNumMap = { "2": 4, "3": 3, "4": 2 };
  const numEpidemicMap = { Amateur: 4, Standard: 5, Heroic: 6 };

  const addEpidemicCards = CitiesCardFactory.addEpidemicCardsToCitiesAndEventsDeck;
  const createBasicDeck = CitiesCardFactory.createDeckWithCitiesAndEvents;


  const dealCardsToGamers = function(workingState) {
    let gamers = workingState.gamers;
    let numCards = cardNumMap[workingState.gamers.length.toString()];

    for (let num = 1; num <= numCards; num++ ) {
      for (let i = 0; i < gamers.length; i++) {

        let dealtCard = CardFactory.pickCardFromTop(workingState.playerDeck);
        if(!gamers[i].hand) gamers[i].hand = [];
        gamers[i].hand.push(dealtCard);

      }
    }
    return workingState;
  };



  return {
    initializeGameElements: function(workingState, difficulty) {
      workingState.playerDeck = createBasicDeck();
      workingState = dealCardsToGamers(workingState);
      workingState.playerDeck = addEpidemicCards(workingState.playerDeck, numEpidemicMap[difficulty]);
      workingState.infectionDeck = InfectionFactory.createInfectionDeck();
      workingState = InfectionFactory.initialize(workingState);
      workingState.status = 'inProgress';
      return workingState;
    },
    giveUserARole: function() {
      //write this when we implement multiple players and a true lobby
      //should have role-array with all 7 characters
      //should randomly pop-off roles and send them to GameFactory
      //GameFactory will assigned these roles, to users as they join the game
    }
  }
});
