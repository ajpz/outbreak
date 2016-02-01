app.factory('GameFactory', function(Firebase, Cities, $firebaseObject, $rootScope, CitiesCardFactory, InfectionFactory, Initialize) {
  // factory is returned at the end
	const factory = {};
	//factory.gameState = {};
	//const gameState = factory.gameState;
  /**
   * This link is currently from Victor's account.
   * Use your own for testing by making an account and  appending /gameState on to it
   */
  const ref = new Firebase('https://radiant-fire-7882.firebaseio.com/outbreak');
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


        //_.merge(gameState, data); // avoid lodash methods to the firebase object, affects the save{
        //store as this because this makes it easier to look for properties that are specific to the game state
        data.gameState = Initialize;
        data.gameState.playerDeck = CitiesCardFactory.createPlayerDeck();
        data.gameState.infectionDeck = InfectionFactory.createInfectionDeck();
        localStorage.setItem("user", Initialize.gamers[0].username);
        console.log("after insertion");
        console.log(data);
        data.$save()
          .then(function(){
            console.log(fbObj);
            localState = fbObj.gameState;
            initialize(localState);

          });
      } else {
        console.log(data);
        console.log("it is not null");
        // might be excessive
        localStorage.setItem("user", data.gameState.gamers[data.gameState.playerCount].username);
        data.gameState["playerCount"] = data.gameState["playerCount"] + 1;
        data.$save()
          .then(function(){
            console.log(fbObj);
            localState = fbObj.gameState;
            initialize(localState);
          });
      }
    });

  function initialize() {
    $rootScope.$broadcast('gamerTurnChanged', { username : localState.gamers[localState.gamerTurn].username });
  }


  /**
   * Firebase has 5 event types in .on
   * value, child_added, child_changed, child_removed, child_moved
   * notes : when initGame is called, child added event runs cb 17 times
   * each time representing the keys in the gameState
   */

  //ref.on('value', function(snapshot) {
  //  // gets called when the app is initiated
  //  console.log("changes in the val updated area");
  //  console.log(Object.keys(data));
  //  if (data.hasOwnProperty("gameState")){
  //
  //    data.$loaded(function(fbObj){
  //      return fbObj;
  //    })
  //    .then(function() {
  //      // so clients also have the right game state;
  //      $rootScope.$broadcast("counterSaved", _.cloneDeep(data.gameState));
  //    })
  //
  //  } else {
  //    // this happens when you start the site, the async process of getting data
  //    // from firebase has not completed
  //    console.log("does not have a game state");
  //  }
  //});
  /**
  ref.child("gameState/infectionLevelIndex").on('value', function(snapshot) {
    console.log("infection counter changed");
    console.log(snapshot.val());
    $rootScope.$broadcast("counterSaved", _.cloneDeep(
      {
        infectionLevelIndex : snapshot.val()  || gameState.infectionLevelIndex,
        currentUser : gameState.currentUser
      }
    )
    );
  });

  ref.child("gameState/currentPhase").on("value", function() {
    console.log("in current phase change");
  });
   */
  const statusRef = ref.child('gameState/status');
  const currentPhaseRef = ref.child('gameState/currentPhase');
  const epidemicInEffectRef = ref.child('gameState/epidemicInEffect');
  const eventCardInEffectRef = ref.child('gameState/eventCardInEffect');
  const proposedActionsRef = ref.child('gameState/proposedActions');
  const playerDeckRef = ref.child('gameState/playerDeck');
  const playerDeckDiscardRef = ref.child('gameState/playerDeckDiscard');
  const infectionDeckRef = ref.child('gameState/infectionDeck');
  const infectionDeckDiscardRef = ref.child('gameState/infectionDeckDiscard');
  const isCuredRef = ref.child('gameState/isCured');
  const isEradicatedRef = ref.child('gameState/isEradicated');
  const outbreakLevelRef = ref.child('gameState/outbreakLevel');
  const infectionLevelIndexRef = ref.child('gameState/infectionLevelIndex');
  const researchCenterLocationsRef = ref.child('gameState/researchCenterLocations');
  const gamerTurnRef = ref.child('gameState/gamerTurn');
  const citiesRef = ref.child('gameState/cities');
  const gamersRef = ref.child('gameState/gamers');

  statusRef.on('value', function(snapshot) {
    if (localState) {
      $rootScope.$broadcast("statusChanged", {status: snapshot.val()});
    }
  });

  currentPhaseRef.on('value', function(snapshot) {
    if (localState) {
      $rootScope.$broadcast('currentPhaseChanged', {currentPhase: snapshot.val()});
    }
  });

  epidemicInEffectRef.on('value', function(snapshot) {
    if (localState) {
      $rootScope.$broadcast('epidemicInEffectChanged', {epidemicInEffect: snapshot.val()});
    }
  });

  eventCardInEffectRef.on('value', function(snapshot) {
    if (localState){
      $rootScope.$broadcast('eventCardInEffectChanged', { eventCardInEffect : snapshot.val() });
    }
  });

  proposedActionsRef.on('value', function(snapshot) {
    if (localState) {
      $rootScope.$broadcast('proposedActionsChanged', {proposedActions: snapshot.val()});
    }
  });

  playerDeckRef.on('value', function(snapshot) {
    if (localState){
      $rootScope.$broadcast('playerDeckChanged', { playerDeck : snapshot.val() });
    }
  });

  playerDeckDiscardRef.on('value', function(snapshot) {
    if (localState) {
      $rootScope.$broadcast('playerDeckDiscardChanged', {playerDeckDiscard: snapshot.val()});
    }
  });

  infectionDeckRef.on('value', function(snapshot) {
    if (data.hasOwnProperty("gameState")) {
      $rootScope.$broadcast('infectionDeckChanged', {infectionDeck: snapshot.val()});
    }
  });

  infectionDeckDiscardRef.on('value', function(snapshot) {
    if (localState) {
      $rootScope.$broadcast('infectionDeckDiscardChanged', {infectionDeckDiscard: snapshot.val()});
    }
  });

  isCuredRef.on('value', function(snapshot) {
    if (localState) {
      $rootScope.$broadcast('isCuredChanged', {isCured: snapshot.val()});
    }
  });

  isEradicatedRef.on('value', function(snapshot) {
    if (localState){
      $rootScope.$broadcast('isEradicatedChanged', { isEradicated : snapshot.val() });
    }
  });

  outbreakLevelRef.on('value', function(snapshot) {
    if (localState) {
      $rootScope.$broadcast('outbreakLevelChanged', {outbreakLevel: snapshot.val()});
    }
  });

  infectionLevelIndexRef.on('value', function(snapshot) {
    if (localState) {
      $rootScope.$broadcast('infectionLevelIndexChanged', {infectionLevelIndex: snapshot.val()});
    }
  });

  researchCenterLocationsRef.on('value', function(snapshot) {
    if (localState) {
      $rootScope.$broadcast('researchCenterLocationsChanged', {researchCenterLocations: snapshot.val()});
    }
  });

  gamerTurnRef.on('value', function(snapshot) {
    if (localState){
      $rootScope.$broadcast('gamerTurnChanged', { username : data.gameState.gamers[snapshot.val()].username });
    }
  });

  citiesRef.on('value', function(snapshot) {
    if (localState) {
      $rootScope.$broadcast('citiesChanged', {cities: snapshot.val()});
    }
  });

  gamersRef.on('value', function(snapshot) {
    if (localState) {
      $rootScope.$broadcast('gamersChanged', {gamers: snapshot.val()});
    }
  })



  // front end specific events
  ///////////////////////////

  $rootScope.$on("counter", function(event, payload) {
    console.log("counter");
    data.gameState.infectionLevelIndex = payload.infectionLevelIndex;
    data.gameState.gamerTurn = (data.gameState.gamerTurn + 1) % 4;
    data.$save();
  })

  /////////////////////////
	return factory;
});
