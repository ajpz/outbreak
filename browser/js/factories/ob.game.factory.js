app.factory('GameFactory', function(Firebase, Cities, $firebaseObject, $rootScope, Initialize, InitFactory, FlowFactory, Reasons, $location) {

  console.log('gameFactory is registering.....')

  let fullPathArr = $location.path().split('/');
  let lobbyId = fullPathArr[fullPathArr.length-1]
  let usersInLobby;
  let playerCount;
  let inFixPhase = false;
  let localState = {};

  // homburger: 'https://radiant-fire-7882.firebaseio.com/outbreak'
  // ajpz:      'https://otterbreak.firebaseio.com/outbreak'
  // dthorne: 'https://outbreak-daniel.firebaseio.com/'
  // const ref = new Firebase('https://luminous-fire-8700.firebaseio.com/outbreak');
  // dthorne: 'https://outbreak-daniel.firebaseio.com/'

  let link = 'https://otterbreak.firebaseio.com/outbreak/'+lobbyId;

  const ref = new Firebase(link);
  let outbreak  = $firebaseObject(ref);

  const factory = {
    startTheGame: function(receivedLobby){
      usersInLobby = receivedLobby.users;
      playerCount = receivedLobby.playerCount;

      if (localStorage.getItem('user') === usersInLobby[0].username) {
        if(!outbreak.hasOwnProperty('gameState')){
          outbreak.gameState = Initialize;
          assignRoles(outbreak.gameState, usersInLobby);
          outbreak.$save()
        }
      }
    }
  };

  function assignRoles(gameState, usersInLobby){
    gameState.gamers = _.shuffle(gameState.gamers);
    gameState.gamers = gameState.gamers.slice(0,playerCount);
    usersInLobby.forEach(function(user, index){
      gameState.gamers[index].username = user.username;
      gameState.playerCount++;
    })
  }

  FlowFactory();

  outbreak.$watch(function() {

    //If gameState doesn't exist, do nothing
    if(!outbreak.hasOwnProperty('gameState')){
      return;
    };

    //if this client is the creator of this game
    if (localStorage.getItem('user') === usersInLobby[0].username) {

      switch(outbreak.gameState.status) {
        case 'initialization':
          //deal player cards and initialize infections
          if (!outbreak.gameState.playerDeck && outbreak.gameState.playerCount === playerCount) {
            console.log('$watch sees ' + playerCount + ' players, ', localStorage.getItem('user'), ' is dealing....', outbreak.gameState);
            outbreak.gameState = InitFactory.initializeGameElements(outbreak.gameState, playerCount);
            outbreak.$save();
          }
          break;
        case 'inProgress':
          if(!inFixPhase && localState) {
            if(localState.gamerTurn !== outbreak.gameState.gamerTurn) {
              if(localState.currentPhase === 'actions' && outbreak.gameState.currentPhase === 'actions') {
                console.log('GAMERTURN WAS ERRONEOUSLY ADVANCED! FIXING IT');
                inFixPhase = true;
                outbreak.gameState.gamerTurn = localState.gamerTurn;
                outbreak.$save();
              }
            }
          }
          inFixPhase = false;
          break;
      }

    }

    //compare localState to outbreak.gameState and log the keys that are different
    console.log('$watch broadcasting stateChange'+ outbreak.gameState.currentPhase, outbreak.gameState.gamerTurn);
    var lsKeys = _.reduce(localState, function(result, value, key) {
      return _.isEqual(value, outbreak.gameState[key]) ? result : result.concat(key);
    }, []);

    var gsKeys = _.reduce(outbreak.gameState, function(result, value, key) {
      if(localState[key] !== undefined) result = _.isEqual(value, localState[key]) ? result : result.concat(key);
      else result = result.concat(key);
      return result;
    }, []);

    console.log('Keys changed. Pre: ', lsKeys, ' Post: ', gsKeys);

    //create localState clone of gameState
    localState = _.cloneDeep(outbreak.gameState);

    //broadcast stateChange across this angular app with gameState as payload
    $rootScope.$broadcast("stateChange", {gameState: outbreak.gameState});


  });


  // Listen below for app events!
  /////////////////////////////////////////////////////

  $rootScope.$on("counter", function(event, payload) {
    console.log('>>>>>>>>counter', payload)
    for (let key in payload) {
      outbreak.gameState[key] = payload[key];
    }
    outbreak.$save()
  });

  $rootScope.$on('saveDrawnCard', function(event, payload){
    console.log('>>>>>>>>saveDrawnCard', payload);
    for(let key in payload){
      outbreak.gameState[key] = payload[key];
    }
    outbreak.$save()
  });

  $rootScope.$on('saveDiscardCard', function(event, payload){
    console.log('>>>>>>>>saveDiscardCard', payload);
    for(let key in payload){
      outbreak.gameState[key] = payload[key];
    }
    outbreak.$save()
  });

  $rootScope.$on('saveInfectionCard', function(event, payload){
    console.log('>>>>>>>>>>>saveInfectionCard', payload)
    for(let key in payload){
      outbreak.gameState[key] = payload[key];
    }
    outbreak.$save()
  });

  $rootScope.$on('phaseChanged', function(event, payload) {
    console.log('>>>>>>>>>>>>phaseChanged emitted', payload)
    for (let key in payload) {
      outbreak.gameState[key] = payload[key];
    }
    outbreak.$save()
  });

  $rootScope.$on("go", function(event, payload) {
    console.log(">>>>>>>>>>>>>>goooooooooooo", payload);
    for (let key in payload) {
      if (outbreak.gameState.hasOwnProperty(key)) {
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
    console.log(">>>>>>>>treat", payload);
    for (let key in payload) {
      if (outbreak.gameState.hasOwnProperty(key)) {
        outbreak.gameState[key] = payload[key];
      } else {
        console.log("you sent the incorrect key to save");
      }
    }
    outbreak.$save()
  });

  $rootScope.$on("build", function(event, payload) {
    console.log("in the build in game factory");
    for (let key in payload) {
      if (outbreak.gameState.hasOwnProperty(key)) {
        outbreak.gameState[key] = payload[key];
      } else {
        console.log("you sent the incorrect key to save");
      }
    }
    outbreak.$save()
  });

  $rootScope.$on("giveTo", function(event, payload) {
    console.log("in the give to in game factory");
    for (let key in payload) {
      if (outbreak.gameState.hasOwnProperty(key)) {
        outbreak.gameState[key] = payload[key];
      } else {
        console.log("you sent the incorrect key to save");
      }
    }
    outbreak.$save()
  });

  $rootScope.$on("takeFrom", function(event, payload) {
    console.log("taking a card away in the gaming factory");
    for (let key in payload) {
      if (outbreak.gameState.hasOwnProperty(key)) {
        outbreak.gameState[key] = payload[key];
      } else {
        console.log("you sent the incorrect key to save");
      }
    }
    outbreak.$save();
  });

  $rootScope.$on("cureDisease", function(event, payload) {
    console.log("curing a disease");
    for (let key in payload) {
      if (outbreak.gameState.hasOwnProperty(key)) {
        outbreak.gameState[key] = payload[key];
      } else {
        console.log("you sent the incorrect key to save");
      }
    }
    outbreak.$save();
  });

  $rootScope.$on("undo", function(event, payload) {
    console.log("undoing now");
    for (let key in payload) {
      if (outbreak.gameState.hasOwnProperty(key)) {
        outbreak.gameState[key] = payload[key];
      } else {
        console.log("you sent the incorrect key to save");
      }
    }
    outbreak.$save();
  });

  $rootScope.$on("changeToDraw", function(event, payload) {
    console.log(">>>>>>>>>change to draw phase", payload);
    for (let key in payload) {
      if (outbreak.gameState.hasOwnProperty(key)) {
        outbreak.gameState[key] = payload[key];
      } else {
        console.log("you sent the incorrect key to save");
      }
    }
    outbreak.$save();
  });


  $rootScope.$on("medicAbility", function(event, payload) {
    console.log("change to draw phase");
    for (let key in payload) {
      if (outbreak.gameState.hasOwnProperty(key)) {
        outbreak.gameState[key] = payload[key];
      } else {
        console.log("you sent the incorrect key to save");
      }
    }
    outbreak.$save();
  });

  $rootScope.$on("cubesReduced", function(event, payload) {
    console.log("change to draw phase");
    for (let key in payload) {
      if (outbreak.gameState.hasOwnProperty(key)) {
        outbreak.gameState[key] = payload[key];
      } else {
        console.log("you sent the incorrect key to save");
      }
    }
    outbreak.$save();
  });

  $rootScope.$on("genericUpdates", function(event, payload) {
    console.log(">>>>>>>>>generic updates", payload)
    for (let key in payload) {
      outbreak.gameState[key] = payload[key];
    }
    outbreak.$save()
  });


  /////////////////////////
  return factory;
});
