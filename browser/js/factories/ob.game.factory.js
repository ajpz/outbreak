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

  const ref = new Firebase('https://luminous-fire-8700.firebaseio.com/outbreak');

  let outbreak  = $firebaseObject(ref);
  FlowFactory();

  outbreak.$watch(function() {

    //Initialize basic game state if none exists
    if (!outbreak.hasOwnProperty('gameState')) {
      console.log('$watch has no gameState, intializing....')
      outbreak.gameState = Initialize;
      localStorage.setItem('user', Initialize.gamers[0].username);
      outbreak.gameState.playerCount++;
      console.log('--->set the localStorage user to ', localStorage.getItem('user'));
      outbreak.$save();
      return;
    }

    //Initialize browser localStorage if 'user' doesn't exists
    if(!localStorage.getItem('user')) {
      console.log('$watch no user yet, setting to playerCount ', outbreak.gameState)
      localStorage.setItem('user', outbreak.gameState.gamers[outbreak.gameState.playerCount].username);
      console.log('--->set the localStorage user to ', localStorage.getItem('user'));
      outbreak.gameState.playerCount++;
      console.log('--->and increment the playerCount to ', outbreak.gameState.playerCount);
      outbreak.$save();
      return;
    }

    //Once 4 gamers have joined the game (playerCount of 4) create decks and deal cards
    if(!outbreak.gameState.playerDeck && outbreak.gameState.playerCount === 4 && (localStorage.getItem('user') === outbreak.gameState.gamers[0].username)) {
      console.log('$watch sees 4 players, ', localStorage.getItem('user'), ' is dealing....', outbreak.gameState);
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

  $rootScope.$on('phaseChanged', function(event, payload) {
    for(let key in payload){
      outbreak.gameState[key] = payload[key];
    }
    outbreak.$save()
  });

  $rootScope.$on('discardCard', function(event, payload) {
    //console.log('heard discard...', payload);
    outbreak.gameState = payload.updatedState;
    outbreak.$save();
  });

  $rootScope.$on("go", function(event, payload) {
    //console.log("in the goooooooooooo");
    for(let key in payload){
      if (outbreak.gameState.hasOwnProperty(key)){
        outbreak.gameState[key] = payload[key];
      } else {
        console.log("you sent the incorrect key to save");
      }
    }
    outbreak.$save()
  });

  // as you become more sure that this format of updating is the same,
  // you can create a general $on event name
  $rootScope.$on("treat", function(event, payload) {
    //console.log("in the treat");
    for(let key in payload){
      if (outbreak.gameState.hasOwnProperty(key)){
        outbreak.gameState[key] = payload[key];
      } else {
        console.log("you sent the incorrect key to save");
      }
    }
    outbreak.$save()
  });

  $rootScope.$on("build", function(event, payload) {
    //console.log("in the build in game factory");
    for(let key in payload){
      if (outbreak.gameState.hasOwnProperty(key)){
        outbreak.gameState[key] = payload[key];
      } else {
        console.log("you sent the incorrect key to save");
      }
    }
    outbreak.$save()
  });

  $rootScope.$on("giveTo", function(event, payload) {
    //console.log("in the give to in game factory");
    for(let key in payload){
      if (outbreak.gameState.hasOwnProperty(key)){
        outbreak.gameState[key] = payload[key];
      } else {
        console.log("you sent the incorrect key to save");
      }
    }
    outbreak.$save()
  });

  $rootScope.$on("takeFrom", function(event, payload) {
    //console.log("taking a card away in the gaming factory");
    for(let key in payload){
      if (outbreak.gameState.hasOwnProperty(key)){
        outbreak.gameState[key] = payload[key];
      } else {
        console.log("you sent the incorrect key to save");
      }
    }
    outbreak.$save();
  });

  $rootScope.$on("cureDisease", function(event, payload) {
    //console.log("curing a disease");
    for(let key in payload){
      if (outbreak.gameState.hasOwnProperty(key)){
        outbreak.gameState[key] = payload[key];
      } else {
        console.log("you sent the incorrect key to save");
      }
    }
    outbreak.$save();
  });

  $rootScope.$on("undo", function(event, payload) {
    //console.log("undoing now");
    for(let key in payload){
      if (outbreak.gameState.hasOwnProperty(key)){
        outbreak.gameState[key] = payload[key];
      } else {
        console.log("you sent the incorrect key to save");
      }
    }
    outbreak.$save();
  });

  $rootScope.$on("updateGamerTurn", function(event, payload) {
    //console.log("changing turns");
    for(let key in payload){
      if (outbreak.gameState.hasOwnProperty(key)){
        outbreak.gameState[key] = payload[key];
      } else {
        console.log("you sent the incorrect key to save");
      }
    }
    outbreak.$save();
  });

  $rootScope.$on("changeToDraw", function(event, payload){
    //console.log("change to draw phase");
    for(let key in payload){
      if (outbreak.gameState.hasOwnProperty(key)){
        outbreak.gameState[key] = payload[key];
      } else {
        console.log("you sent the incorrect key to save");
      }
    }
    outbreak.$save();
  });

  /////////////////////////
	return factory;
});


app.run(function(GameFactory) {
  console.log('GameFactory injected.');
})
