app.factory('ActionFactory', function(Cities) {

  // TODO: EVENT CARDS INTERRUPT FLOW AND INSERT THEMSELVES


  return {
    /**
     * VERBS: what are the actions I can take right now?
     */

    availableVerbs: function(gamer, state) {
      // firebase is stupid and doesn't give users a hand property if it is empty
      // firebase dumbness
      if (!gamer.hand) {
        gamer.hand = [];
      }
      state.gamers = state.gamers.map(function(gamer){
        if (!gamer.hand) {
          gamer.hand = [];
        }
        return gamer;
      });
      // initialize variables outlining current state
      //debugger;
      let currInfections = state.cities.filter(function(cityObj) {
        return cityObj.key === gamer.currentCity;
      })[0];

      let infectionCount = currInfections.red + currInfections.yellow + currInfections.blue + currInfections.black;
      //debugger;
      let currentCards = gamer.hand.map(function(cardObj) {
        return cardObj.key;
      });
      //debugger;
      // gamers in the same city, not including self;
      let gamersInSameCity = state.gamers.filter(function(other) {
        return other.currentCity === gamer.currentCity && gamer.role !== other.role;
      });

      let verbs = ['go'];
      // the operation expert has the ability to
      // move from a research station to any city by discarding any citycard
      // this logic will go in action-picker.js through a method in action factory

      // can i treat?
      if(infectionCount > 0) {
        verbs.push('treat');
      };

      // can i build?
      if(currentCards.indexOf(gamer.currentCity) > -1 && state.researchCenterLocations.indexOf(gamer.currentCity) === -1) {
        verbs.push('build');
      };

      // baking in logic of operations expert ability: can build a research station
      // in any city he is in and no discard is necessary
      if (gamer.role === "operationsExpert"){
        if (verbs.indexOf("build") === -1) verbs.push('build');
      }

      // can i give city card?
      if(currentCards.indexOf(gamer.currentCity) > -1 && gamersInSameCity.length > 0) {
        verbs.push('giveCityCard');
      };

      // give the researcher the ability to take and give a card to someone in the same city
      if (gamer.role === 'researcher') {
        verbs.push('researcherActions');
      }

      let researcher = gamersInSameCity.find(function(otherGamer){
        if (otherGamer.role === "researcher"){
          if (otherGamer.currentCity === gamer.currentCity) {
            return true;
          }
        }
      });
      if (researcher){
        if (gamer.currentCity ===  researcher.currentCity) {
          verbs.push('takeFromResearcher');
        }
      }



      // can i take city card?
      let cityKeyArray = gamersInSameCity.reduce(function(cityKeyArray, gamerObj){
        cityKeyArray = cityKeyArray.concat(gamerObj.hand.map(function(cardObj) {
          return cardObj.key;
        }));
        return cityKeyArray;
      },[]).filter(function(cityKey) {
        // you can only take the card that represents the current city you are in
        return cityKey === gamer.currentCity;
      });

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
          } else if (colorCounter[color] >= 4 && gamer.role === 'scientist') {
            // scientist only needs 4 of the same colored card
            verbs.push('cureDisease');
          }
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
          // and that the user has the card
          let hasCardOfCurrentCity = gamer.hand.findIndex(function(card){
            return card.key === gamer.currentCity;
          })
          if (hasCardOfCurrentCity > -1){
            return key !== gamer.currentCity;
          }
        });
    },

    shuttleFlightsKeys: function(gamer, state) {
      //r eturn an array of city keys that have researchCenters not including where the user is
      // baked in that the gamer is on the current city
      // if they are not, return an empty array
      if (Object.keys(state.researchCenterLocations).indexOf(gamer.currentCity) === -1) {
        return [];
      }
      return state.researchCenterLocations
        .filter(function(key) {
          // filter out the gamer's currentCity
          return gamer.currentCity !== key;
        });
    },

    // the condition is also that the op expert is in a city with a research center
    operationExpertKeys : function(gamer, state) {
       if (gamer.role === "OperationExpert"
        && state.researchCenterLocations.indexOf(gamer.currentCity) !== -1) {
        // the operation expert is allowed to move to any city by discarding any card
        return Cities.map(city => {
          return city.key;
        })
      } else {
         return [];
       }
    },

    /*
     * TREAT: how many? and what color?
     */

    whatAndHowMuchCanBeTreated: function(gamer, state) {
      // slightly faster than the filter :) had to
      let currentCityIndex = state.cities.findIndex(function(city){
        return city.key === gamer.currentCity;
      });
      let currInfections = state.cities[currentCityIndex];

      let treatmentOptions = {};

      for(let color in state.isCured) {
        if(currInfections[color] > 0) {
          // if this virus is cured, then you can cure all the infection blocks in a city else only 1
          treatmentOptions[color] = state.isCured[color] ? currInfections[color] : 1;
          // if you are a medic, you can cure all the infection levels;
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
      // firebase dumbness
      if (!gamer.hand) {
        gamer.hand = [];
      }
      state.gamers = state.gamers.map(function(gamer){
        if (!gamer.hand) {
          gamer.hand = [];
        }
        return gamer;
      });

      if(gamer.hand.map(function(cardObj) {
        return cardObj.key;
      }).indexOf(gamer.currentCity) === -1) return [{}];

      //assumes this will only be called if gamer has cityCard of currentCity
      function GiveObject(giveTo, city) {
        this.giveTo = giveTo;
        this.city = city;
      };

      let result = [];

      // filtering out the current player from this list
      let others = state.gamers.filter(function(other) {
        if (other.role !== gamer.role){
          return true;
        }
      }).map(function(other) {
        // returning an array with the currentCity so that I
        // can check if the user is in the same city as the current player
        return [other.role, other.currentCity];
      });
      // can only give to another user who is in the current city too
      others.forEach(function(other) {
        if (other[1] === gamer.currentCity){
          result.push(new GiveObject(other[0], gamer.currentCity));
        }
      });

      // [{giveTo: 'medic', city: 'dc'}, {giveTo: 'researcher', city: 'dc'}]
      return result;
    },

    /**
     * TAKECITYCARD: which card? from whom?
     */

    takeWhatFromWhom: function(gamer, state) {
      if (!gamer.hand) {
        gamer.hand = [];
      }
      state.gamers = state.gamers.map(function(gamer){
        if (!gamer.hand) {
          gamer.hand = [];
        }
        return gamer;
      });
      //assumes you only invoke this if you've already
      //confirmed the other has the city card you are in
      function GiveObject(takeFrom, city) {
        this.takeFrom = takeFrom;
        this.city = city;
      };

      let result = [];
      // Victor made changes to this
      //let others = state.gamers.map(function(other) {
      //  if (other.role !== gamer.role) return other.role;
      //});
      //
      //others.forEach(function(other) {
      //    result.push(new GiveObject(other, gamer.currentCity));
      //})

      // [{giveTo: 'medic', city: 'dc'}, {giveTo: 'researcher', city: 'dc'}]
      // will make this better at a later date;
      let currentCity = gamer.currentCity;
      // check the other user hands and find if it matches the city you are in
      // find players who have cards that match the city you are in
      let relevantGivers = state.gamers.filter(function(gamer) {
        let indexOfCard = gamer.hand.findIndex(function(card) {
          let contains = false;
          if (card.key === currentCity) {
            contains = true;
          };
          return contains;
        });
        if (indexOfCard != -1) {
          return true;
        }
      });
      // then also remove yourself from that group
      relevantGivers.forEach(function(giver) {
        // make sure it isn't the current player
        if (giver.role !== gamer.role) {
          result.push(new GiveObject(giver.role, giver.currentCity ));
        }
      });

      return result;
    },

    // we need to give this ability to a researcher
    // to essentially take / give card to
    researcherAction : function(gamer, state) {
      //return this.takeWhatFromWhom(gamer, state).concat(this.giveWhatToWhom(gamer, state));
      // firebase dumbness
      if (!gamer.hand) {
        gamer.hand = [];
      }
      state.gamers = state.gamers.map(function(gamer){
        if (!gamer.hand) {
          gamer.hand = [];
        }
        return gamer;
      });

      //if(gamer.hand.map(function(cardObj) {
      //    return cardObj.key;
      //  }).indexOf(gamer.currentCity) === -1) return [{}];

      //assumes this will only be called if gamer has cityCard of currentCity
      function GiveObject(giveTo, city) {
        this.giveTo = giveTo;
        this.city = city;
      };

      let result = [];

      // filtering out the current player from this list
      let others = state.gamers.filter(function(other) {
        if (other.role !== gamer.role){
          return true;
        }
      }).map(function(other) {
        // returning an array with the currentCity so that I
        // can check if the user is in the same city as the current player
        return [other.role, other.currentCity];
      });
      // can only give to another user who is in the current city too
      others.forEach(function(other) {
        if (other[1] === gamer.currentCity){
          gamer.hand.forEach(function(card){
            if (card.type === "cityCard"){
              result.push(new GiveObject(other[0], card.key));
            }
          })

        }
      });

      // [{giveTo: 'medic', city: 'dc'}, {giveTo: 'researcher', city: 'dc'}]
      return result;
    },

    takeFromResearcher : function(gamer, state) {
      if (!gamer.hand) {
        gamer.hand = [];
      }
      state.gamers = state.gamers.map(function(gamer){
        if (!gamer.hand) {
          gamer.hand = [];
        }
        return gamer;
      });

      function GiveObject(takeFrom, city) {
        this.takeFrom = takeFrom;
        this.city = city;
      };

      let result = [];

      let gamersInSameCity = state.gamers.filter(function(other) {
        return other.currentCity === gamer.currentCity && gamer.role !== other.role;
      });

      let researcher = gamersInSameCity.filter(function(otherGamer){
        if (otherGamer.role === "researcher"){
          return true;
        }
      })[0];

      researcher.hand.forEach(function(card) {
        if (card.type === "cityCard"){
          result.push(new GiveObject("researcher", card.key));
        }
      });

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
        else result[color] = false;
      }
      //{red : true, blue: false, etc...}
      return result;
    },


    /**
     * Build a research center
     */
    buildResearchCenter : function(gamer) {
      // cannot have a research center at current location already

    }
  }

});
