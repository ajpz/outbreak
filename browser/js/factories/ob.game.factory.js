app.factory('GameFactory', function(Firebase, Cities, $firebaseObject, $rootScope, Initialize, InitFactory) {
  // factory is returned at the end
	const factory = {};
	//factory.gameState = {};
	//const gameState = factory.gameState;
  /**
   * This link is currently from Victor's account.
   * Use your own for testing by making an account and  appending /gameState on to it
   */
   // 'https://outbreak.firebaseio.com/'
  const ref = new Firebase('https://outbreak.firebaseio.com/');
  let outbreak  = $firebaseObject(ref);

  outbreak.$watch(function() {

    if (!outbreak.hasOwnProperty('gameState')) {
      console.log('$watch has no gameState, intializing....')
      outbreak.gameState = Initialize;
      localStorage.setItem('user', Initialize.gamers[0].username);
      outbreak.$save();
      return;
    }

    if(!localStorage.getItem('user')) {
      console.log('$watch no user yet, setting to playerCount ', outbreak.gameState)
      localStorage.setItem('user', outbreak.gameState.gamers[outbreak.gameState.playerCount].username);
      outbreak.gameState["playerCount"] = (outbreak.gameState["playerCount"] + 1) % 4;
      outbreak.$save();
      return;
    }

    // if(outbreak.gameState.playerCount === 4) {
    //   outbreak.gameState = InitFactory.initializeGameElements(outbreak.gameState);
    //   outbreak.$save();
    // }

    // initial snapshot on load does not exist
    // however, this is useful thereafter when you want to broadcast latest changes
    console.log('$watch broadcasting stateChange', outbreak.gameState);
    $rootScope.$broadcast("stateChange", {gameState : outbreak.gameState });

  });


  // front end specific events
  /////////////////////////////////////////////////////

  $rootScope.$on("counter", function(event, payload) {
    for(let key in payload){
      outbreak.gameState[key] = payload[key];
    }
    outbreak.$save()
    // this will now lead teh ref.on('value') to kick off updates to ALL client browsers including the
    // browser that broadcast this change
  });


  /////////////////////////
	return factory;
});
