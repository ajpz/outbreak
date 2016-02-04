app.factory('GameFactory', function(Firebase, Cities, $firebaseObject, $rootScope, Initialize, InitFactory, FlowFactory) {
  // factory is returned at the end
	const factory = {};
	//factory.gameState = {};
	//const gameState = factory.gameState;
  /**
   * This link is currently from Victor's account.
   * Use your own for testing by making an account and  appending /gameState on to it
   */
   // homburger: 'https://radiant-fire-7882.firebaseio.com/outbreak'
   // ajpz:      'https://outbreaktest.firebaseio.com/outbreak'
   // dthorne: 'https://outbreak-daniel.firebaseio.com/'
  const ref = new Firebase('https://outerbreak-jonathan.firebaseio.com/');
  let outbreak  = $firebaseObject(ref);
  FlowFactory();

  outbreak.$watch(function() {

    //Initialize basic game state if none exists
    if (!outbreak.hasOwnProperty('gameState')) {
      console.log('$watch has no gameState, intializing....')
      outbreak.gameState = Initialize;
      localStorage.setItem('user', Initialize.gamers[0].username);
      outbreak.$save();
      return;
    }

    //Initialize browser localStorage if 'user' doesn't exists
    if(!localStorage.getItem('user')) {
      console.log('$watch no user yet, setting to playerCount ', outbreak.gameState)
      localStorage.setItem('user', outbreak.gameState.gamers[outbreak.gameState.playerCount].username);
      outbreak.gameState["playerCount"] = (outbreak.gameState["playerCount"] + 1) % 4;
      outbreak.$save();
      return;
    }

    //Once 4 gamers have joined the game (playerCount of 3) create decks and deal cards
    if(outbreak.gameState.playerCount === 3 && !outbreak.gameState.playerDeck) {
      console.log('there are 4 players, dealing....', outbreak.gameState);
      outbreak.gameState = InitFactory.initializeGameElements(outbreak.gameState);
      outbreak.$save();
      return;
    }

    //Broadcast stateChange to rest of app
    console.log('$watch broadcasting stateChange', outbreak.gameState);
    $rootScope.$broadcast("stateChange", {gameState : outbreak.gameState });

  });


  // Listen below for app events!
  /////////////////////////////////////////////////////

  $rootScope.$on("counter", function(event, payload) {
    for(let key in payload){
      outbreak.gameState[key] = payload[key];
    }
    outbreak.$save()
  });


  /////////////////////////
	return factory;
});
