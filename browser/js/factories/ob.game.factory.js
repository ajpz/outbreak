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
  const ref = new Firebase('');
  let data  = $firebaseObject(ref);
  let localState;

  /**
   *  initGameStateInFirebase
   *  sets up an object in firebase called gameState
   *  gameState is the object of properties representing the game state
   *  if the object exists already, it will not be created again.
   *  To handle currently, just delete the gameState object when testing
   */
  data.$loaded(function(fbObj){
    console.log(fbObj);
    console.log(Object.keys(fbObj));
    if (fbObj.$value === null) {
      data.gameState = Initialize;
      data.gameState.playerDeck = CitiesCardFactory.createPlayerDeck();
      data.gameState.infectionDeck = InfectionFactory.createInfectionDeck();
      // hard coded first user is based on the gamers array
      localStorage.setItem("user", Initialize.gamers[0].username);
      data.$save()
        .then(function(){
          localState = fbObj.gameState;
          initialize(localState);

        });
    } else {
      localStorage.setItem("user", data.gameState.gamers[data.gameState.playerCount].username);
      data.gameState["playerCount"] = (data.gameState["playerCount"] + 1) % 4;
      // all computers that connect after the 4th computer will be assigned the consecutive numbers
      data.$save()
        .then(function(){
          console.log(fbObj);
          localState = fbObj.gameState;
          initialize(localState);
        });
    }
  });

  function initialize(localState) {
    $rootScope.$broadcast('initialize', {gameState : localState });
  }


  /**
   * Firebase has 5 event types in .on
   * value, child_added, child_changed, child_removed, child_moved
   * notes : when initGame is called, child added event runs cb 17 times
   * each time representing the keys in the gameState
   */


  /**
   * All changes will go through me!!!!!!!
   */
  ref.on('value', function(snapshot) {
    if (data.hasOwnProperty("gameState")){
      // initial snapshot on load does not exist
      // however, this is useful thereafter when you want to broadcast latest changes
      let currentSnap = snapshot.val();
      if (currentSnap){
        for (let key in currentSnap){
          data[key] = currentSnap[key];
        }
      }
      data.$save().then(function(){
        $rootScope.$broadcast("stateChange", {gameState : data.gameState });
      })
    }
  });


  // front end specific events
  /////////////////////////////////////////////////////

  $rootScope.$on("counter", function(event, payload) {
    for(let key in payload){
      data.gameState[key] = payload[key];
    }
    data.$save()
    // this will now lead teh ref.on('value') to kick off updates to ALL client browsers including the
    // browser that broadcast this change
  });


  /////////////////////////
	return factory;
});
