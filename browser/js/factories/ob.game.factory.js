app.factory('GameFactory', function($firebaseObject, Firebase) { // need to include the Card Factory

	const factory = {};
	factory.gameState = {};
	const gameState = factory.gameState;

	// mainly to test pushing to firebase, it works
	factory.commitToFirebase = function() {
		const ref = new Firebase('');
		ref.push(gameState);
	}


	gameState.status = 'initialization'; // options : inProgress, gameOver
	gameState.currentPhase; // actions, draw, discard, epidemic, event, infect
	gameState.prevPhase; // action, draw, disard, epidemic, event, infect
	gameState.nextPhase;
	gameState.playerDeck; // array of card objects // will need to use the card Factory
	gameState.playerDeckDiscard;
	gameState.infectionDeck; // array of card objects // will need to use the card Factory
	gameState.infectionDeckDiscard;
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

	gameState.epidemicInEffect; //set to be a boolean
	gameState.eventCardInEffect; // set to be a boolean
	gameState.proposedActions = []; // need a way to generate the action objects //array of {type, user, verb, goType, placeFrom, placeTo, cityCardToDiscard, giveTo, takeFrom, cardColorToCure}


	return factory;
});
