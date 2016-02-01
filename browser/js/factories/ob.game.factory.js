app.factory('GameFactory', function(Firebase, CardFactory, Cities, $firebaseObject, $rootScope) {
  // factory is returned at the end
	const factory = {};
	factory.gameState = {};
	const gameState = factory.gameState;
  /**
   * This link is currently from Victor's account.
   * Use your own for testing by making an account and  appending /gameState on to it
   */
  const ref = new Firebase('https://radiant-fire-7882.firebaseio.com/gameState');
  let data  = $firebaseObject(ref);

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
        data.gameState = gameState;
        console.log("after insertion");
        console.log(data);
        data.$save();
      } else {
        console.log("it is not null");
        // might be excessive
        for (let key in data.gameState) {
          gameState[key] = data.gameState[key];
        }
        console.log(gameState);
      }
    });


  /**
   * Firebase has 5 event types in .on
   * value, child_added, child_changed, child_removed, child_moved
   * notes : when initGame is called, child added event runs cb 17 times
   * each time representing the keys in the gameState
   */

  /**
  ref.child("gameState").on('child_added', function(childSnapshot, prevChildKey) {
    console.log("child_added");
  });
   */

  // the update method from commitToFirebase does not actually console log
  // updates only hit the child added
  /**
  ref.on('child_changed', function(childSnapshot, prevChildKey) {
    console.log("child_changed");
  });
   */

  ref.on('value', function(snapshot) {
    // gets called when the app is initiated
    console.log("changes in the val updated area");
    console.log(Object.keys(data));
    if (data.hasOwnProperty("gameState")){

      data.$loaded(function(fbObj){
        return fbObj;
      })
      .then(function() {
        // so clients also have the right game state;
        $rootScope.$broadcast("counterSaved", _.cloneDeep(data.gameState));
      })

    } else {
      // this happens when you start the site, the async process of getting data
      // from firebase has not completed
      console.log("does not have a game state");
    }
  });
  /**
  ref.child("gameState").on('child_removed', function() {
    console.log("child_removed");
  });

  ref.child("gameState").on('child_moved', function() {
    console.log("child_moved");
  });
  */
  ////////////////

  $rootScope.$on("counter", function(event, payload) {
    console.log("update the counter and update in fb");
    if (data.gameState.currentUser === "victor") {
      data.gameState.currentUser = "jonathan";
    } else {
      data.gameState.currentUser = "victor";
    }
    data.gameState.infectionLevelIndex = payload.infectionLevelIndex;
    console.log("saving on counter");
    console.log(data.gameState);
    data.$save()
    //  .then(function(){
    //  for (let key in data.gameState){
    //    gameState[key] = data.gameState[key];
    //  }
    //});
  });

  /**
   * This is a sample method, use child(nameofProperty) to update nested objects
   * otherwise, just use ref.update({ property: updatedValue });
   */
	factory.commitToFirebase = function() {
		//return ref.child("turnBelongsTo").update({"currentCity" : "New York"});
    return ref.update({prop : "yes" });
	};

  /**
   * Needs testing, hopefully we won't need to make such a big update at once
   */
  factory.updateEntireGameState = function() {
    return ref.update(gameState);
  };

  /**
   * This method is good if the property you want to update is not a nested object
   * For updating nested object, use factory.updateNested
   * @param prop examples include status, currentPhase, etc.
   * @param newValue is the value that you would like to update to
   */
  factory.update = function(prop , newValue) {
    const updateObj = {};
    updateObj[prop] = newValue;
    return ref.update(updateObj);
  };

  /**
   *
   * @param prop is the property to update
   * @param newValue is the new value to set that key to
   * @param childRef is the nested object to update
   */
  factory.updateNested = function(prop, newValue, childRef) {
    const updateObj = {};
    updateObj[prop] = newValue;
    ref.child(childRef).update(updateObj);
  };
  gameState.browserConnect = 0;
  gameState.currentUser = "victor";
	gameState.status = 'initialization'; // options : inProgress, gameOver
	gameState.currentPhase = ""; // actions, draw, discard, epidemic, event, infect
	gameState.prevPhase = ""; // action, draw, disard, epidemic, event, infect
	gameState.nextPhase = "";
	//gameState.playerDeck = CardFactory.createPlayerDeck(); // array of card objects // will need to use the card Factory
	gameState.playerDeckDiscard = [];
	//gameState.infectionDeck = CardFactory.createInfectionDeck(); // array of card objects // will need to use the card Factory
	gameState.infectionDeckDiscard = [];
	gameState.isCured = {red : false, blue : false, yellow : false, black : false };
	gameState.isEradicated = {red : false, blue : false, yellow : false, black : false };
	gameState.outbreakLevel  = 0;
	gameState.infectionLevelIndex = 0;
	gameState.researchCenterLocations = ['atlanta'];
	gameState.gamers = [
		{
			username : '',
			role : '',
			currentCity : '',
			hand : [] //contains an array of card objects
		},

		{
			username : '',
			role : '',
			currentCity : '',
			hand : []
		},

		{
			userName : '',
			role : '',
			currentCity : '',
			hand : []
		},

		{
			userName : '',
			role : '',
			currentCity : '',
			hand : []
		}
	];

	//gameState.cities = Cities

	gameState.turnBelongsTo = gameState.gamers[0]; // will need to set thed player to be based on what is the next of this

	gameState.epidemicInEffect = ""; //set to be a boolean
	gameState.eventCardInEffect = ""; // set to be a boolean
	gameState.proposedActions = []; // need a way to generate the action objects //array of {type, user, verb, goType, placeFrom, placeTo, cityCardToDiscard, giveTo, takeFrom, cardColorToCure}


	return factory;
});
