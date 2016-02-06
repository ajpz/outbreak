// these are the static conditions for a new game.

const gameState = {};
// GAME STATE
gameState.playerCount = 0; // should be 0 - 3 to rep the number of players connecting
gameState.status = 'initialization'; // options : inProgress, gameOver
gameState.currentPhase = "actions"; // actions, draw, discard, infect // will cycle through for next player
//gameState.prevPhase = ""; // action, draw, disard, epidemic, event, infect
//gameState.nextPhase = "";
gameState.epidemicInEffect = false; //set to be a boolean
gameState.eventCardInEffect = false; // set to be a boolean
gameState.proposedActions = []; // need a way to generate the action objects //array of {type, user, verb, goType, placeFrom, placeTo, cityCardToDiscard, giveTo, takeFrom, cardColorToCure}
gameState.playerDeck = []; // array of card objects // will need to use the card Factory
gameState.playerDeckDiscard = [];
gameState.infectionDeck = []; // array of card objects // will need to use the card Factory
gameState.infectionDeckDiscard = [];
gameState.drawnCards = [];
gameState.drawnInfections = [];
gameState.message = "Welcome to Outbreak!"
gameState.isCured = {
  red: false,
  blue: false,
  yellow: false,
  black: false
};
gameState.isEradicated = {
  red: false,
  blue: false,
  yellow: false,
  black: false
};
gameState.remainingCubes = {
  red: 24,
  blue: 24,
  yellow: 24,
  black: 24
};
gameState.outbreakLevel = 1;
gameState.infectionLevelIndex = 0;
gameState.researchCenterLocations = ['atlanta'];
gameState.researchCentersRemaining = 5;
gameState.gamerTurn = 0; // will need to set the player to be based on what is the next of this
gameState.cities = [{
    key: 'sanFrancisco',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'chicago',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'atlanta',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'montreal',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'newYork',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'dc',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'london',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'madrid',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'paris',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'berlin',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'milan',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'stPetersburg',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'losAngeles',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'mexicoCity',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'miami',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'bogota',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'lima',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'santiago',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'buenosAires',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'saoPaulo',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'lagos',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'kinshasa',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'khartoum',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'johannesburg',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'algiers',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'cairo',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'istanbul',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'moscow',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'baghdad',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'riyadh',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'tehran',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'karachi',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'mumbai',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'delhi',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'kolkata',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'chennai',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'beijing',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'seoul',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'tokyo',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'shanghai',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'hongKong',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'taipei',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'osaka',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'bangkok',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'jakarta',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'hoChiMinhCity',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'manila',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }, {
    key: 'sydney',
    red: 0,
    yellow: 0,
    blue: 0,
    black: 0
  }

]
gameState.gamers = [{
    username: 'HOMBURGER',
    role: 'medic',
    currentCity: 'atlanta',
    hand: [] //contains an array of card objects
  },

  {
    username: 'AJ PEREZIDENT',
    role: 'researcher',
    currentCity: 'atlanta',
    hand: []
  },

  {
    username: 'JULIE OPPERATOR',
    role: 'scientist',
    currentCity: 'atlanta',
    hand: []
  },

  {
    username: 'LEON DANVINCI',
    role: 'operationsExpert',
    currentCity: 'atlanta',
    hand: []
  }
];



app.constant('Initialize', gameState);
