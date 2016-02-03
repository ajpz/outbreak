app.factory('GameFactory', function(Firebase, Cities, $firebaseObject, $rootScope, CitiesCardFactory, InfectionFactory, Initialize) {
  // factory is returned at the end
	const factory = {};
	//factory.gameState = {};
	//const gameState = factory.gameState;
  /**
   * This link is currently from Victor's account.
   * Use your own for testing by making an account and  appending /gameState on to it
   */
   // 'https://radiant-fire-7882.firebaseio.com/outbreak'
  const ref = new Firebase('https://outbreaktest.firebaseio.com/outbreak');
  let outbreak  = $firebaseObject(ref);
  let localState;

  /**
   *  initGameStateInFirebase
   *  sets up an object in firebase called gameState
   *  gameState is the object of properties representing the game state
   *  if the object exists already, it will not be created again.
   *  To handle currently, just delete the gameState object when testing
   */
  outbreak.$loaded(function(fbObj){  // can't use .val() when using $loaded with AngularFire object
    console.log('$loaded........', fbObj.$value, fbObj);
    if (fbObj.$value === null) {  //null at first, undefined thereafter
      outbreak.gameState = Initialize;
      // outbreak.gameState.playerDeck = CitiesCardFactory.createPlayerDeck();
      // outbreak.gameState.infectionDeck = InfectionFactory.createInfectionDeck();
      // hard coded first user is based on the gamers array
      localStorage.setItem("user", Initialize.gamers[0].username);
      console.log('$loaded saving for the first time', Initialize.gamers[0].username)
      outbreak.$save()
        .then(function(){
          localState = fbObj.gameState;
          console.log('$loaded save completed, now initializing to localState', localState);
          // initialize(localState);

        });
    } else {
      console.log('$loaded in else statement ', outbreak.gameState, outbreak.gameState === fbObj.$value)
      localStorage.setItem("user", outbreak.gameState.gamers[outbreak.gameState.playerCount].username);
      outbreak.gameState["playerCount"] = (outbreak.gameState["playerCount"] + 1) % 4;
      // all computers that connect after the 4th computer will be assigned the consecutive numbers
      outbreak.$save()
        //saving the updated playerCount info
        .then(function(){
          localState = fbObj.gameState;
          console.log('$loaded save completed, now initializing to localState', localState);
          // initialize(localState);
        });
    }
  });

  /**
   *  Listen on Firebase
   *  broadcast throughout app when state changes
   */

  outbreak.$watch(function() {
    console.log('$watch fired')
    if (outbreak.hasOwnProperty("gameState")){
      console.log('$watch has gameState', gameState);
      // initial snapshot on load does not exist
      // however, this is useful thereafter when you want to broadcast latest changes
      $rootScope.$broadcast("stateChange", {gameState : outbreak.gameState });
    } else {
      console.log('$watch has no gameState')
    }
  });

  function initialize(localState) {
    $rootScope.$broadcast('initialize', {gameState : localState });
  }


  // front end specific events
  /////////////////////////////////////////////////////

  $rootScope.$on("counter", function(event, payload) {
    console.log('$counter heard with payload ', payload)
    for(let key in payload){
      outbreak.gameState[key] = payload[key];
    }
    console.log('$counter listener is saving to firebase....')
    outbreak.$save()
    // this will now lead teh ref.on('value') to kick off updates to ALL client browsers including the
    // browser that broadcast this change
  });


  /////////////////////////
	return factory;
});
