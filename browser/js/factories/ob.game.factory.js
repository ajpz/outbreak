app.factory('GameFactory', function($firebaseObject, Firebase) {
  // factory is returned at the end
	const factory = {};
	factory.gameState = {};
	const gameState = factory.gameState;
  /**
   * This link is currently from Victor's account.
   * Use your own for testing by making an account and  appending /gameState on to it
   */
  const ref = new Firebase('https://radiant-fire-7882.firebaseio.com/gameState');

  /**
   *  initGameStateInFirebase
   *  sets up an object in firebase called gameState
   *  gameState is the object of properties representing the game state
   *  if the object exists already, it will not be created again.
   *  To handle currently, just delete the gameState object when testing
   */
  factory.initGameStateInFirebase = function () {
    ref.once('value', function(snapshot) {
      return snapshot;
    }).then(function(latestSnaps) {
      // does not exist currently
      if (latestSnaps.val() === null) {
        return ref.set(gameState);
      }
      return;
    })
  };
  ///////////////////
  // This is not registering the way I expect it to
  /**
   * Firebase has 5 event types in .on
   * value, child_added, child_changed, child_removed, child_moved
   * notes : when initGame is called, child added event runs cb 17 times
   * each time representing the keys in the gameState
   */
  ref.on('child_added', function(childSnapshot, prevChildKey) {
    console.log("child_added");
  });
  // the update method from commitToFirebase does not actually console log
  // updates only hit the child added
  ref.on('child_changed', function(childSnapshot, prevChildKey) {
    console.log("child_changed");
  });

  ref.on('child_removed', function() {
    console.log("child_removed");
  });

  ref.on('child_moved', function() {
    console.log("child_moved");
  });
  ////////////////

  /**
   * This is a sample method, use child(nameofProperty) to update nested objects
   * otherwise, just use ref.update({ property: updatedValue });
   */
	factory.commitToFirebase = function() {
		return ref.child("turnBelongsTo").update({"currentCity" : "New York"});
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


	gameState.status = 'initialization'; // options : inProgress, gameOver
	gameState.currentPhase = ""; // actions, draw, discard, epidemic, event, infect
	gameState.prevPhase = ""; // action, draw, disard, epidemic, event, infect
	gameState.nextPhase = "";
	gameState.playerDeck = ""; // array of card objects // will need to use the card Factory
	gameState.playerDeckDiscard = "";
	gameState.infectionDeck = ""; // array of card objects // will need to use the card Factory
	gameState.infectionDeckDiscard = "";
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

	gameState.cities = [
		// might just include the initial location files to be served up in the scripts
	];

	gameState.turnBelongsTo = gameState.gamers[0]; // will need to set thed player to be based on what is the next of this

	gameState.epidemicInEffect = ""; //set to be a boolean
	gameState.eventCardInEffect = ""; // set to be a boolean
	gameState.proposedActions = []; // need a way to generate the action objects //array of {type, user, verb, goType, placeFrom, placeTo, cityCardToDiscard, giveTo, takeFrom, cardColorToCure}


	return factory;
});
