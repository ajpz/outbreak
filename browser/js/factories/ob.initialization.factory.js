app.factory('InitFactory', function(CitiesCardFactory, InfectionFactory, CardFactory, LobbyFactory) {

  //TODO: GameFactory to remove all references to CitiesCardFactory and InfectionFactory
  // console.log(lobbyId)
  let fullPathArr = $location.path().split('/');
  let lobbyId = fullPathArr[fullPathArr.length-1]

  const cardNumMap = { "2": 4, "3": 3, "4": 2 };
  const numEpidemicMap = { Introductory: 4, Standard: 5, Heroic: 6 };

  const addEpidemicCardsToCitiesAndEventsDeck = CitiesCardFactory.addEpidemicCardsToCitiesAndEventsDeck;
  const createInfectionDeck = InfectionFactory.createInfectionDeck;
  const createDeckWithCitiesAndEvents = CitiesCardFactory.createDeckWithCitiesAndEvents;
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
      //create a deck consisting of only city and event cards
      let deck = createDeckWithCitiesAndEvents();
      workingState.playerDeck = deck;
      //deal out those cards to the games
      workingState = dealCardsToGamers(workingState);
      //add the epidemic cards to the deck with players and events
      workingState.playerDeck = addEpidemicCardsToCitiesAndEventsDeck(deck);
      workingState.infectionDeck = createInfectionDeck();
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
