app.factory('InitFactory', function(CitiesCardFactory, InfectionFactory, CardFactory) {

  //TODO: GameFactory to remove all references to CitiesCardFactory and InfectionFactory

  const cardNumMap = { "2": 4, "3": 3, "4": 2 };
  const numEpidemicMap = { Introductory: 4, Standard: 5, Heroic: 6 };

  const createPlayerDeck = CitiesCardFactory.createPlayerDeck;
  const createInfectionDeck = InfectionFactory.createInfectionDeck;

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
    //TODO: needs to call CitiesCardFactory method to add epidemic cards to deck
    return workingState;
  };


  return {
    //TODO: to create time-delay for UI visualization, create promisified
    // version of SetToGameState that:
    //  1) invokes function
    //  2) SetToGameState()
    //  3) setTimeout delay before resolving
    //  4) subsequent methods are invoked once the above is finished

    initializeGameElements: function(workingState) {
      // defaults right now to 'Introductory' difficulty

      workingState.playerDeck = createPlayerDeck();
      workingState.infectionDeck = createInfectionDeck();
      workingState = InfectionFactory.initialize(workingState);
      workingState.status = 'inProgress';
      return dealCardsToGamers(workingState);
    },
    giveUserARole: function() {
      //write this when we implement multiple players and a true lobby
      //should have role-array with all 7 characters
      //should randomly pop-off roles and send them to GameFactory
      //GameFactory will assigned these roles, to users as they join the game
    }
  }
});
