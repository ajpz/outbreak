app.factory('ActionFactory', function(Cities) {

  // TODO: EVENT CARDS INTERRUPT FLOW AND INSERT THEMSELVES
  // TODO: which methods to expose?
  // TODO: make Action constructor function?
  // TODO: need to advance both status and phase
  // TODO: make transition tool that updates gamers and cities
  //       and researchCenterLocations when user makes selections

  return {
    /**
     * VERBS: what are the actions I can take right now?
     */

    availableVerbs: function(gamer, state) {

      // initialize variables outlining current state
      let currInfections = state.cities.filter(function(cityObj) {
        return cityObj.key === gamer.currentCity;
      })[0];

      let infectionCount = currInfections.red + currInfections.yellow + currInfections.blue + currInfections.black;

      let currentCards = gamer.hand.map(function(cardObj) {
        return cardObj.key;
      });

      let gamersInSameCity = state.gamers.filter(function(other) {
        return other.currentCity === gamer.currentCity;
      });

      let verbs = ['go'];

      // can i treat?
      if(infectionCount > 0) {
        verbs.push('treat');
      };

      // can i build?
      if(currentCards.indexOf(gamer.currentCity) > -1 && state.researchCenterLocations.indexOf(gamer.currentCity) === -1) {
        verbs.push('build');
      };

      // can i give city card?
      if(currentCards.indexOf(gamer.currentCity) > -1 && gamersInSameCity.length > 0) {
        verbs.push('giveCityCard');
      };

      // can i take city card?
      let cityKeyArray = gamersInSameCity.reduce(function(cityKeyArray, gamerObj){
        cityKeyArray = cityKeyArray.concat(gamerObj.hand.map(function(cardObj) {
          return cardObj.key;
        }));
        return cityKeyArray;
      },[]);

      if(cityKeyArray.length > 0) {
        verbs.push('takeCityCard');
      };

      // can i cure disease?
      if(state.researchCenterLocations.indexOf(gamer.currentCity) > -1) {
        let colorCounter = gamer.hand.reduce(function(colors, cardObj) {
          colors[cardObj.color]++;
          return colors;
        }, {red: 0, blue: 0, yellow: 0, black: 0});

        for(let color in colorCounter) {
          if(colorCounter[color] >= 5) {
            verbs.push('cureDisease');
          };
        }
      };

      return verbs;
    },

    /**
     * GO: where can the gamer go?
     */

    walkingOrFerryKeys: function(gamer) {
      return Cities[gamer.currentCity].connections;
    },

    directFlightsKeys: function(gamer) {
      //returns array of keys representing city's held in a gamer's hand
      return gamer.hand.filter(function(cardObj) {
          // filter gamer's hand on 'cityCard' only, no 'eventCard' or 'epidemicCard'
          return cardObj.type === 'cityCard';
        }).map(function(cardObj) {
          // map each cardObj to its key
          return cardObj.key;
        });
    },

    charterFlightsKeys: function(gamer) {
      //returns an array of all city keys
      return Object.keys(Cities)
        .filter(function(key) {
          //filter out gamer's currentCity
          return key !== gamer.currentCity;
        });
    },

    shuttleFlightsKeys: function(gamer, state) {
      //return an array of city keys that have researchCenters
      return state.researchCenterLocations
        .filter(function(key) {
          // filter out the gamer's currentCity
          return gamer.currentCity !== key;
        });
    },

    /*
     * TREAT: how many? and what color?
     */

    whatAndHowMuchCanBeTreated: function(gamer, state) {
      let currInfections = state.cities.filter(function(cityObj) {
        return cityObj.key === gamer.currentCity;
      })[0];

      let treatmentOptions = {};

      for(let color in state.isCured) {
        if(currInfections[color] > 0) {
          treatmentOptions[color] = state.isCured[color] ? currInfections[color] : 1;
          if(gamer.role === 'medic') treatmentOptions[color] = currInfections[color];
        } else {
          treatmentOptions[color] = 0;
        }
      };
      return treatmentOptions;
    },

    /**
     * GIVECITYCARD: which card? to whom?
     */

    giveWhatToWhom: function(gamer, state) {

      if(gamer.hand.map(function(cardObj) {
        return cardObj.key;
      }).indexOf(gamer.currentCity) === -1) return {};

      //assumes this will only be called if gamer has cityCard of currentCity
      function GiveObject(giveTo, city) {
        this.giveTo = giveTo;
        this.city = city;
      };

      let result = [];
      let others = state.gamers.map(function(other) {
        return other.role;
      });

      others.forEach(function(other) {
        result.push(new GiveObject(other, gamer.currentCity));
      });

      // [{giveTo: 'medic', city: 'dc'}, {giveTo: 'researcher', city: 'dc'}]
      return result;
    },

    /**
     * TAKECITYCARD: which card? from whom?
     */

    takeWhatFromWhom: function(gamer, state) {

      //assumes you only invoke this if you've already
      //confirmed the other has the city card you are in
      function GiveObject(takeFrom, city) {
        this.takeFrom = takeFrom;
        this.city = city;
      };

      let result = [];
      let others = state.gamers.map(function(other) {
        return other.role;
      });

      others.forEach(function(other) {
          result.push(new GiveObject(other, gamer.currentCity));
      })

      // [{giveTo: 'medic', city: 'dc'}, {giveTo: 'researcher', city: 'dc'}]
      return result;
    },

    /**
     * CUREDISEASE: which disease? which cards?
     */
    cureWhichDisease: function(gamer) {
      let result = {};

      let colorCounter = gamer.hand.reduce(function(colorCounter, cardObj) {
        colorCounter[cardObj.color]++;
        return colorCounter;
      }, {red: 0, blue: 0, yellow: 0, black: 0});

      for(let color in colorCounter) {
        if(colorCounter[color] >= 5) result[color] = true;
      }

      return result;
    }
    // createAction: function() {},
    // executeActions: function() {}
  }

});
