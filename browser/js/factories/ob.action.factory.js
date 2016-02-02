app.factory('ActionFactory', function(Cities) {

  // TODO: EVENT CARDS INTERRUPT FLOW AND INSERT THEMSELVES
  // TODO: which methods to expose?
  // TODO: do i need Action constructor function?
  // TODO: need to advance both status and phase
  //

  /**
   * Helper methods
   */

   let getGamer = function(gamerArray, role) {
    return gamerArray.filter(function(gamer) {
        return gamer.role === role;
      })[0];
   };

   let getCity = function(citiesArray, currentCity) {
    return citiesArray.filter(function(city) {
      return city.key === currentCity;
    })[0];
   };

  /**
   * VERBS: what are the actions I can take right now?
   */

  let availableVerbs = function(gamer, action) {

    //initialize variables outlining current state
    let currInfections = getCity(action.citiesAfterAction, gamer.currentCity);
    let infectionCount = currInfections.red + currInfections.yellow + currInfections.blue + currInfections.black;
    let currentCards = gamer.hand.map(function(cardObj) {
      return cardObj.key;
    });
    let gamerInSameCity = action.gamersAfterAction.filter(function(other) {
      return other.currentCity === gamer.currentCity;
    });
    let verbs = ['go'];

    // can i treat?
    if(infectionCount > 0) verbs.push('treat');

    // can i build?
    if(currentCards.indexOf(gamer.currentCity) > -1 &&
        action.researchCenterLocationsAfterAction.indexOf(gamer.currentCity) > -1) {
      verbs.push('build');
    }

    // can i give city card?
    if(currentCards.indexOf(gamer.currentCity) > -1) verbs.push('giveCityCard');

    // can i take city card?
    if(gamerInSameCity.reduce(function(cityKeyArray, gamerObj){

      cityKeyArray = cityKeyArray.concat(gamerObj.hand.map(function(cardObj) {
        return cardObj.key;
      }));

      return cityKeyArray;
    },[]).length > 0) verbs.push('takeCityCard');

    // can i cure disease?
    if(action.researchCenterLocationsAfterAction.indexOf(gamer.currentCity)) {

      let colorCounter = gamer.hand.reduce(function(colorCounter, cardObj) {
        colorCounter[cardObj.color]++;
        return colorCounter;
      }, {red: 0, blue: 0, yellow: 0, black: 0});

      for(let color in colorCounter) {
        if(colorCounter[color] >= 5) verbs.push('cureDisease');
      }
    }

    //return the array of available actions
    return verbs;
  };

  /**
   * GO: where can the gamer go?
   */

  let walkingOrFerryKeys = function(gamer) {
    return Cities[gamer.currentCity].connections;
  };

  let directFlightsKeys = function(gamer) {
    //returns array of keys representing city's held in a gamer's hand
    return gamer.hand.filter(function(cardObj) {
        // filter gamer's hand on 'cityCard' only, no 'eventCard' or 'epidemicCard'
        return cardObj.type === 'cityCard';
      }).map(function(cardObj) {
        // map each cardObj to its key
        return cardObj.key;
      });
  };

  let charterFlightsKeys = function(gamer) {
    //returns an array of all city keys
    return Object.keys(Cities)
      .filter(function(key) {
        //filter out gamer's currentCity
        return key !== gamer.currentCity;
      });
  };

  let shuttleFlightsKeys = function(gamer, action) {
    //return an array of city keys that have researchCenters
    return action.researchCenterLocationsAfterAction
      .filter(function(key) {
        // filter out the gamer's currentCity
        return gamer.currentCity !== key;
      });
  }

  /*
   * TREAT: how many? and what color?
   */

  let whatAndHowMuchCanBeTreated = function(gamer, action) {
    let currInfections = getCity(action.citiesAfterAction, gamer.currentCity);
    let isCured = action.isCuredAfterAction;

    let treatmentOptions;

    for(let color in isCured) {
      if(currInfections[color] > 0) {
        treatmentOptions[color] = isCured[color] ? currInfections[color] : 1;
      } else {
        treatmentOptions[color] = 0;
      }
    };

    return treatmentOptions;
  };

  // GIVECITYCARD: which card? to whom?
  let giveWhatToWhom = function(gamer, action) {

    if(gamer.hand.map(function(cardObj) {
      return cardObj.key;
    }).indexOf(gamer.currentCity) === -1) return {};

    //assumes this will only be called if gamer has cityCard of currentCity
    function GiveObject(giveTo, city) {
      this.giveTo = giveTo;
      this.city = city;
    };

    let result = [];
    let others = action.gamersAfterAction.map(function(other) {
      return other.role;
    });

    others.forEach(function(other) {
      result.push(new GiveObject(other, gamer.currentCity));
    });

    return result;
  };

  // TAKECITYCARD: which card? from whom?
  let takeWhatFromWhom = function(gamer, action) {

    function GiveObject(giveTo, city) {
      this.giveTo = giveTo;
      this.city = city;
    };

    let result = [];
    let others = action.gamersAfterAction.map(function(other) {
      return other.role;
    });

    others.forEach(function(other) {
      if(other.hand.map(function(cardObj) {
        return cardObj.key;
      }).indexOf(gamer.currentCity) > -1) {
        result.push(new GiveObject(other, gamer.currentCity));
      }
    })

    return result;
  };

  // CUREDISEASE: which disease? which cards?
  let cureWhichDisease = function(gamer) {

    let result = {};

    let colorCounter = gamer.hand.reduce(function(colorCounter, cardObj) {
      colorCounter[cardObj.color]++;
      return colorCounter;
    }, {red: 0, blue: 0, yellow: 0, black: 0});

    for(let color in colorCounter) {
      if(colorCounter[color] >= 5) result[color] = true;
    }

    return result;
  };

  // TIE IT ALL TOGETHER: USE ABOVE FUNCTIONS
  let calculatePossibleActions = function(state) {

    //get most recent action
    let priorAction = state.proposedActions[state.proposedActions.length - 1];
    //get reference to the active gamer object
    let gamer = getGamer(priorAction.gamersAfterAction, priorAction.role);

  };

  /**
   * Exposed factory methods
   */

  return {
    createAction: function() {},
    executeActions: function() {}
  }

});


/*

proposedActions: [

  // length of 4 or longer, depending on 'events' being played

  {
    type: 'regular', // options: 'event', 'epidemic'

    role: 'medic' // roles of gamers

    verb: 'go',  //'go', 'treat', 'build', 'giveCityCard', 'takeCityCard', 'cureDisease'
    goType: , // drive/ferry, directFlight, charterFlight, shuttleFlight

    placeFrom: 'newYork', //cityKey or null
    placeTo: 'atlanta', //cityKey or null

    cityCardToDiscard: 'mumbai',  // cityCard or null

    takeFrom: 'medic',
    giveTo: 'researcher',

    cardColorToTreat: '' // blue, yellow, black, red
    numToTreat: , // defaults to 1, or more for medic / if eradicated

    cardColorToCure: '' // blue, yellow, black, red

    gamersAfterAction: [
      // each a gamer
      {
        username : 'victor',
        role : 'medic',
        currentCity : 'atlanta',
        hand : [] //contains an array of card objects
      },
      {},
      {},
      {}
    ],
    citiesAfterAction: [
      // each a city
      {
        key: 'sanFrancisco',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      },
      {},
      {},
      {}
    ],
    researchCenterLocationsAfterAction: [
      'atlanta'
    ],
    isCuredAfterAction: {
      red: true,
      yellow: false,
      blue: false,
      black: false
    }
  },
  {},
  {},
  {},
  {},
  {}
]

*/
