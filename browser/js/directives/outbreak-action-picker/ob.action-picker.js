app.directive('actionPicker', function($rootScope, Cities, ActionFactory) {
  return {
    restrict : 'E',
    templateUrl : 'js/directives/outbreak-action-picker/ob.action-picker.html',
    //scope : {},
    link : function(scope, elem, attr) {

      // this is recording the action numbers in a given turn
      scope.actionNumber = 1;

      // this is necessary for storing previous state and allows for UNDO
      scope.storedStates = [];

      /**
       *  This event is fired off on load
       * @type {boolean}
       *
       */
      $rootScope.$on('stateChange', (event, payload) => {
        let gameState = payload.gameState;
        scope.turn = gameState.gamerTurn;
        scope.gamers = _.cloneDeep(payload.gameState.gamers);
        scope.gameState = _.cloneDeep(payload.gameState);
        scope.clientUser = localStorage.getItem("user");
        scope.verbs = ActionFactory.availableVerbs(scope.gamers[scope.turn], gameState);
        // if you are the current user and the current phase is the actions phase
        // generate the for the user
        if (scope.clientUser === scope.gamers[scope.turn].username) {
          if (scope.actionNumber === 5) {
            scope.actionNumber = 1; //need to hide the actions information
            scope.storedStates = [];
            //change the phase;
            $rootScope.$broadcast("changeToDraw", {currentPhase : "draw" });
          }


          // medic logic
          // could not decide where to put the medic ability
          // where his presence can auto cure infections from a city
          // if that infection color is cured
          if (scope.gamers[scope.turn].role === "medic") {
            var colors = Object.keys(scope.gameState.isCured);
            for (var k in colors) {
              if (scope.gameState.isCured[colors[k]]) {
                scope.gameState.cities.forEach( city => {
                  if (city.key === scope.gamers[scope.turn].currentCity){
                    if (city[colors[k]] > 0) {
                      // there is a color in the city that needs to be updated
                      city[colors[k]] = 0;
                      // maybe broadcast a toast
                      $rootScope.$broadcast("medicAbility", {cities : scope.gameState.cities });
                    }
                  }
                })
              }
            }
          }
        }
        // this is not responsible to make changes like that
        //$rootScope.$broadcast("updateGamerTurn", { gamerTurn : (scope.turn +1) % 4 })
      });

      // TODO : there might be the possibility of
      // getting repeat values on generation
      // have to use track by and filter to do this
      // maybe also do a best effort to figure out which
      // moves is picked
      // below is using the Action Factory logic to figure out what is doable in picking an action
      const verbNounMap = {
        "go" : [
          ActionFactory.walkingOrFerryKeys,
          ActionFactory.directFlightsKeys,
          ActionFactory.charterFlightsKeys,
          ActionFactory.shuttleFlightsKeys,
          ActionFactory.operationExpertKeys
        ],
        "treat" : [
          ActionFactory.whatAndHowMuchCanBeTreated
        ],
        "build" : [
          ActionFactory.buildResearchCenter
        ],
        "giveCityCard" : [
          ActionFactory.giveWhatToWhom
        ],
        "takeCityCard" : [
          ActionFactory.takeWhatFromWhom
        ],
        "cureDisease" : [
          ActionFactory.cureWhichDisease
        ],
        "researcherActions" : [
          ActionFactory.researcherAction
        ],
        "takeFromResearcher" : [
          ActionFactory.takeFromResearcher
        ]
      };
      // you select a verb, it will put the verb in here
      scope.selection = {
        verb : '',
        noun : ''
      };

      // to figure out where verb and noun belong to
      // so that game logic can apply depending on the type of action picked.
      let walkingFerryKeys = [];
      let directFlightKeys = [];
      let charterFlightKeys = [];
      let shuttleFlightKeys = [];
      let operationKeys = [];

      // go is related with drive/ferry, shuttle flight, direct flight, charter flight
      // treat is with treat disease and discover a cure
      // build is with build a research station
      // card actions are with share knowledge
      scope.notifySelectionVerb = () => {
        scope.nouns = [];
        let verb = scope.selection.verb;
        // this is to ensure that the execution button gets disabled
        scope.selection.noun = "";
        //clear square markers from map --- in case user switches from GO to other options without executing
        $rootScope.$broadcast("RemoveSquareMarkers", {});

        if (verb === "go" ) {
          // my attempt to give the op expert the ability to go to different areas with research locations
          // TODO : need to verify this works
          if (scope.gamers[scope.turn].role === "operationsExpert" && scope.gameState.researchCenterLocations.indexOf(scope.gamers[scope.turn].currentCity) > -1){
            // TODO : give the op expert the ability to discard through turning currentPhase to "discard"
            // and have to change it back
            // then let them go somewhere
            // you might want to move to a connected line too ????? :(
            // if it is a connected path, you would not want to give up a card -- it would not be in your
            // best interest to do so.
            // essentially, this will get you the the ability to move anywhere if you are in an area with a research area
            console.log("operation ", scope.selection.verb);
            scope.nouns = verbNounMap[scope.selection.verb][4](scope.gamers[scope.turn], scope.gameState);
            operationKeys = verbNounMap[scope.selection.verb][4](scope.gamers[scope.turn], scope.gameState);
            verbNounMap[scope.selection.verb].forEach( (noun, index) => {
              // need to clear this when you are ready to submit
              if (index === 0){
                walkingFerryKeys = noun(scope.gamers[scope.turn], scope.gameState);
              } else if (index === 1) {
                directFlightKeys = noun(scope.gamers[scope.turn], scope.gameState);
              } else if (index === 2) {
                charterFlightKeys = noun(scope.gamers[scope.turn], scope.gameState);
              } else if (index === 3) {
                // shuttleFlightKeys = noun(scope.gamers[scope.turn], scope.gameState);
              }
              // to remove the duplicate values;
              let filteredNouns = [];
              scope.nouns = scope.nouns.concat(noun(scope.gamers[scope.turn], scope.gameState).slice());
              for (let i = 0; i < scope.nouns.length; i++){
                if (filteredNouns.indexOf(scope.nouns[i]) === -1) {
                  filteredNouns.push(scope.nouns[i]);
                }
              }
              scope.nouns = filteredNouns;
              scope.nouns.sort()



            });
            if (scope.nouns.length === 0){
              // REPEATED :(
              // idea is that if the above set of noun doesn't work
              // just get the usual list
              // next bit of logic will happen in the broadcast go logic
              verbNounMap[scope.selection.verb].forEach( (noun, index) => {
                // need to clear this when you are ready to submit
                if (index === 0){
                  walkingFerryKeys = noun(scope.gamers[scope.turn], scope.gameState);
                } else if (index === 1) {
                  directFlightKeys = noun(scope.gamers[scope.turn], scope.gameState);
                } else if (index === 2) {
                  charterFlightKeys = noun(scope.gamers[scope.turn], scope.gameState);
                } else if (index === 3) {
                  shuttleFlightKeys = noun(scope.gamers[scope.turn], scope.gameState);
                }
                let filteredNouns = [];
                scope.nouns = scope.nouns.concat(noun(scope.gamers[scope.turn], scope.gameState).slice());
                for (let i = 0; i < scope.nouns.length; i++){
                  if (filteredNouns.indexOf(scope.nouns[i]) === -1) {
                    filteredNouns.push(scope.nouns[i]);
                  }
                }
              scope.nouns = filteredNouns;
              scope.nouns.sort()


              });
            }
            // need to emit in the other nouns to remove the circles -- or maybe I can keep it there.
            $rootScope.$broadcast("SquareMarkersOnMap", {nouns : scope.nouns});
            // since the op expert can go anywhere, I should do a best efforts approach
            // of figuring out what they want to do.
          } else {
            verbNounMap[scope.selection.verb].forEach( (noun, index) => {
              // need to clear this when you are ready to submit
              if (index === 0){
                walkingFerryKeys = noun(scope.gamers[scope.turn], scope.gameState);
              } else if (index === 1) {
                directFlightKeys = noun(scope.gamers[scope.turn], scope.gameState);
              } else if (index === 2) {
                charterFlightKeys = noun(scope.gamers[scope.turn], scope.gameState);
              } else if (index === 3) {
                shuttleFlightKeys = noun(scope.gamers[scope.turn], scope.gameState);
              }
              let filteredNouns = [];
              scope.nouns = scope.nouns.concat(noun(scope.gamers[scope.turn], scope.gameState).slice());
              for (let i = 0; i < scope.nouns.length; i++){
                if (filteredNouns.indexOf(scope.nouns[i]) === -1) {
                  filteredNouns.push(scope.nouns[i]);
                }
              }
              scope.nouns = filteredNouns;
              scope.nouns.sort()


            });
            $rootScope.$broadcast("SquareMarkersOnMap", {nouns : scope.nouns});
          }
        } else if (verb === "treat") {
          // turn the key-value pairs into its own array

          let infectionsInCity = verbNounMap[verb][0](scope.gamers[scope.turn], scope.gameState);
          let infections = ["black", "blue", "red", "yellow"];

          infections.forEach( (infection) => {
            if (infectionsInCity[infection] > 0) {
              scope.nouns.push(infection + " : " + infectionsInCity[infection]);
            }

          });
        } else if (verb === "build") {
          // if you are allowed to build because of logic in action factory
          // then I am making the assumption that you can build where you are
          // the only specialty might be the op expert
          // TODO : the opperator might need a more specialized logic
          if (scope.gameState.researchCenterLocations.indexOf(scope.gamers[scope.turn].currentCity) === -1){
            scope.nouns = ["research center in: " + scope.gamers[scope.turn].currentCity]
          }
        } else if (verb ===  "giveCityCard") {
          scope.nouns = verbNounMap[verb][0](scope.gamers[scope.turn], scope.gameState);
        } else if (verb === "takeCityCard") {
          scope.nouns = verbNounMap[verb][0](scope.gamers[scope.turn], scope.gameState);
        } else if (verb === "cureDisease") {
          // array of colors
          let cureObj = verbNounMap[verb][0](scope.gamers[scope.turn], scope.gameState);
          console.log(cureObj);
          for(let k in cureObj){
            if (cureObj[k]  === true){
              scope.nouns.push(k);
            }
          }
        } else if (verb === "researcherActions") {
          scope.nouns = verbNounMap[verb][0](scope.gamers[scope.turn], scope.gameState);
        } else if (verb === 'takeFromResearcher') {
          scope.nouns = verbNounMap[verb][0](scope.gamers[scope.turn], scope.gameState);
        }
      };

      ////////// Buttons/ Interactivity //////////////
      scope.show = true;
      scope.hideText = "";
      scope.arrow = "left";

      /**
       * When user hits execute to get the new game state information over to the game factory
       * the scope.nouns, actionNumber, selection.verb, selection.noun gets reset
       *
       */
      scope.execute  = () => {
        // just as the user tries to execute I am going to store the gamestate

        if (scope.selection.verb !=='' && scope.selection.noun !== ''){
          scope.storedStates.push(_.cloneDeep(scope.gameState));
          if (scope.selection.verb === "go") {
            broadcastGoToGameState(scope.selection);
          } else if (scope.selection.verb === "treat") {
            broadcastTreatToGameState(scope.selection);
          } else if (scope.selection.verb === "build") {
            broadcastBuildResearchCenter(scope.selection);
          } else if (scope.selection.verb === "giveCityCard") {
            broadcastGiveCityCard(scope.selection);
          } else if (scope.selection.verb === "takeCityCard") {
            broadcastTakeCityCard(scope.selection)
          } else if (scope.selection.verb === "cureDisease") {
            broadcastCureDisease(scope.selection);
          } else if (scope.selection.verb === "researcherActions") {
            broadcastResearcherActions(scope.selection);
          } else if (scope.selection.verb === "takeFromResearcher") {
            broadcastTakeCityCard(scope.selection);
          }

          scope.nouns = [];
          scope.actionNumber = scope.actionNumber + 1;
          scope.selection.verb = "";
          scope.selection.noun = "";
          console.log("in execute : ", scope.actionNumber);
        }

      };

      // loop through walkingFerryKeys
      // directFlightKeys
      // charterFlightKeys
      // shuttleFlightKeys
      // where it is located tells you what logic to apply
      function broadcastGoToGameState(info) {
        let packet = {};
        // check if the gamer is the op expert
        // if they are, make sure walking, direct, charter, and shuttle are empty
        // this will mean that the op expert can go any city by discarding a card
        if (walkingFerryKeys.includes(info.noun)) {

          // move the current user to the new location
          packet.gamers = scope.gamers;
          packet.gamers[scope.turn].currentCity = info.noun;
          packet.message = "User \'"+scope.gameState.gamers[scope.turn].username+"\' drove to "+Cities[info.noun].name+"."
          $rootScope.$broadcast("go", packet);

        } else if (directFlightKeys.includes(info.noun)) {

          packet.gamers = scope.gamers;
          let indexOfCard = packet.gamers[scope.turn].hand.findIndex(function(card){
            if (card.key === info.noun){
              return true;
            }
          });
          packet.message = "User \'"+scope.gameState.gamers[scope.turn].username+"\' took a direct flight to "+Cities[info.noun].name+"."
          // remove the the card from the user's hand
          packet.gamers[scope.turn].hand.splice(indexOfCard, 1);
          // move user current city
          packet.gamers[scope.turn].currentCity = info.noun;
          $rootScope.$broadcast("go", packet);

        } else if (charterFlightKeys.includes(info.noun)) {

          packet.gamers = scope.gamers;
          // find the card that matches the city that you are in
          let indexOfCard = packet.gamers[scope.turn].hand.findIndex(function(card){
            if (card.key === packet.gamers[scope.turn].currentCity){
              return true;
            }
          });
          // remove the the card from the user's hand
          packet.gamers[scope.turn].hand.splice(indexOfCard, 1);
          // move user current city
          packet.gamers[scope.turn].currentCity = info.noun;
          packet.message = "User \'"+scope.gameState.gamers[scope.turn].username+"\' took a charter flight to "+Cities[info.noun].name+"."
          $rootScope.$broadcast("go", packet);

        } else if (shuttleFlightKeys.includes(info.noun)){

          // move the current user to the new location
          packet.gamers = scope.gamers;
          packet.gamers[scope.turn].currentCity = info.noun;
          packet.message = "User \'"+scope.gameState.gamers[scope.turn].username+"\' took a shuttle flight to "+Cities[info.noun].name+"."
          $rootScope.$broadcast("go", packet);
        } else if (operationKeys.includes(info.noun)) {
          // move the current user to the new location
          packet.gamers = scope.gamers;
          packet.gamers[scope.turn].currentCity = info.noun;
          packet.message = "User \'"+scope.gameState.gamers[scope.turn].username+"\' transported to "+Cities[info.noun].name+" because of the research center."
          $rootScope.$broadcast("go", packet);
        }
        // clear these out
        walkingFerryKeys = [];
        directFlightKeys = [];
        charterFlightKeys = [];
        shuttleFlightKeys = [];
        operationKeys = [];
        $rootScope.$broadcast("RemoveSquareMarkers", {zoomCity: packet.gamers[scope.turn].currentCity});
      }

      function broadcastTreatToGameState(info) {
        let packet = {};
        let indexInCities;
        let particularCityToCure  = scope.gameState.cities.filter(function(city, index) {
          if (city.key === scope.gamers[scope.turn].currentCity) {
            indexInCities = index;
            return true;
          }
        })[0];
        let nounSeparate = info.noun.split(":");
        let color = nounSeparate[0].trim();
        let numberToCure = parseInt(nounSeparate[1].trim(), 10);
        particularCityToCure[color] = particularCityToCure[color] - numberToCure;
        let formattedCityName = Cities[particularCityToCure.key].name;
        scope.gameState.cities[indexInCities] = particularCityToCure; // update the state to send to gameState
        packet.cities = scope.gameState.cities;
        packet.message = "User: \'"+scope.gamers[scope.turn].username+"\' just treated "+numberToCure+" "+color+" infection(s) in "+formattedCityName;
        // repopulating the number of cubes in the game for a particular color that is treated
        scope.gameState.remainingCubes[color] = scope.gameState.remainingCubes[color] + numberToCure;
        packet.remainingCubes = scope.gameState.remainingCubes;

        // check if we can eradicate the disease during a treatment
        packet.isEradicted = checkEradication(color);
        // $rootScope.$broadcast('treatedCity', dataToBroadcast)
        $rootScope.$broadcast("treat", packet);
      }

      function checkEradication(color) {
        if (scope.gameState.isCured[color] && scope.gameState.remainingCubes[color] === 24) {
          scope.gameState.isEradicated[color] = true;
        }
        return scope.gameState.isEradicated;

      }


      // not considering that you might have to remove a research center because you are at your limit
      // of research center that you can build
      // you are on your current city and there is nothing here and you want to build a research center
      function broadcastBuildResearchCenter(info) {
        // to build a ressearch center, you need to remove the card of that city card from your hand too
        let packet = {};

        // if you are the ops expert, you don't need to discard the city card
        // just append a research center to the gameState.researchCenterLocations
        if (scope.gamers[scope.turn].role === "operationsExpert"){
          scope.gameState.researchCenterLocations.push(scope.gamers[scope.turn].currentCity);
        } else {
          let cardIndex = scope.gamers[scope.turn].hand.findIndex(function(card) {
            if (card.key === scope.gamers[scope.turn].currentCity) {
              return true;
            }
          });

          let card = scope.gamers[scope.turn].hand.splice(cardIndex, 1)[0];
          scope.gameState.researchCenterLocations.push(card.key);
        }
        packet.researchCenterLocations  = scope.gameState.researchCenterLocations;
        // since there is a user whose hand gets changed. - re issue #83
        packet.gamers = scope.gamers;
        packet.researchCentersRemaining = scope.gameState.researchCentersRemaining-1;
        let formattedCityName = Cities[scope.gamers[scope.turn].currentCity].name;
        packet.message = "User \'"+scope.gameState.gamers[scope.turn].username + "\' just built a research center in "+formattedCityName+".";
        $rootScope.$broadcast("build", packet);
      }

      // take that card away from the current player
      // update the user hand of the player who will now get the card
      // note that when you give a card to a user, and your hand is empty, firebase removes the hand key from storage
      function broadcastGiveCityCard(info) {
        let packet = {};
        let givingInformation = info.noun;
        let giveTo = givingInformation.giveTo;
        let cityCardToGive = givingInformation.city;
        // though it would be the current city that you are in
        // are there any special positions that might be able to give special cards across the board
        // Yes, the researcher can give any card to a player in the same city, the card does not have to match her city
        // I am making the assumption that the action factory will be generating the right information
        let indexOfCard = scope.gameState.gamers[scope.turn].hand.findIndex(function(card) {
          if (card.key === cityCardToGive){
            return true;
          }
        });
        // splicing out to have quick access to a card to push to the other player hand
        // finding the index of the player to give this to
        let cardToSwitch = scope.gameState.gamers[scope.turn].hand.splice(indexOfCard, 1)[0];

        let indexOfPlayer = scope.gameState.gamers.findIndex(function(player) {
          if (player.role === giveTo){
            return true;
          }
        });
        console.log("\n\n\n\n\n\n"+cityCardToGive);
        let formattedCityName = Cities[cityCardToGive].name;

        packet.message = 'User \''+scope.gameState.gamers[scope.turn].username +'\' gave the \''+formattedCityName +'\' city card to user \''+ scope.gameState.gamers[indexOfPlayer].username+'.\'';
        scope.gameState.gamers[indexOfPlayer].hand.push(cardToSwitch);
        packet.gamers = scope.gameState.gamers;
        $rootScope.$broadcast("giveTo", packet);

      }

      function broadcastTakeCityCard(info) {
        console.log("in broadcastTakeCityCArd: ", info);
        let packet = {};
        let takingInformation = info.noun;
        let takeFrom = takingInformation.takeFrom;
        let cityCardToTake = takingInformation.city;

        let indexOfGamerToTakeFrom = scope.gameState.gamers.findIndex(function(gamer){
          if (gamer.role === takeFrom) {
            return true;
          }
        });

        let indexOfCard = scope.gameState.gamers[indexOfGamerToTakeFrom].hand.findIndex(function(card){
          if (card.key === cityCardToTake) {
            return true;
          }
        });
        let formattedCityName = Cities[cityCardToTake].name;
        // take the card away
        let card = scope.gameState.gamers[indexOfGamerToTakeFrom].hand.splice(indexOfCard, 1)[0];
        // give to the current player hand
        scope.gameState.gamers[scope.turn].hand.push(card);
        packet.gamers = scope.gameState.gamers;
        packet.message = 'User \''+scope.gameState.gamers[scope.turn].username +'\' took the \''+formattedCityName +'\' city card from user \''+ scope.gameState.gamers[indexOfGamerToTakeFrom].username +'.\'';
        $rootScope.$broadcast("takeFrom", packet);
      }

      function broadcastCureDisease(info) {
        let colorToCure = info.noun;
        scope.gameState.isCured[colorToCure] = true;
        var allCured = true;
        Object.keys(scope.gameState.isCured).forEach(function(color){
          if (!scope.gameState.isCured[color]) {
            allCured = false
          }
        });

        //TODO: also take out the cards from the hand

        let packet = {isCured : scope.gameState.isCured};
        if (allCured){
          packet.status = "gameOver";
          packet.gameOver = {win: true}
        }
        packet.message = "User \'"+ scope.gameState.gamers[scope.turn].username + "\' just cured "+ colorToCure;

        let numberToRemove;
        if (scope.gameState.gamers[scope.turn].role === "scientist") {
          numberToRemove = 4;
        } else {
          numberToRemove = 5;
        }
        scope.gameState.gamers[scope.turn].hand = scope.gameState.gamers[scope.turn].hand.filter( card => {
          if (card.color === colorToCure && numberToRemove !== 0) {
            numberToRemove--;
            return false;
          } else {
            return true;
          }
        });
        packet.gamers = scope.gameState.gamers;
        $rootScope.$broadcast("cureDisease", packet);
      }

      // Researcher ability
      // if researcher chooses give or take,
      // figure which and use the existing broadcast methods
      function broadcastResearcherActions(info) {
          broadcastGiveCityCard(info);
      }


      scope.slide = () => {
        let actionpicker = angular.element(document.querySelector("."+"action-picker"));
        if (!actionpicker.hasClass("slideOn") && !actionpicker.hasClass("slideOff")){
          actionpicker.addClass("slideOff");
          scope.arrow = "right";
        } else if (actionpicker.hasClass("slideOn")) {
          scope.arrow = "right";
          actionpicker.removeClass("slideOn");
          actionpicker.addClass("slideOff");
        } else {
          scope.arrow = "left";
          actionpicker.removeClass("slideOff");
          actionpicker.addClass("slideOn");
        }



      }
      ////////// END Buttons/ Interactivity //////////////

      // TODO : CREATE a BACK BUTTON that pops off a state and broadcasts;
      // The user has to be in the action phase

      scope.undo = () => {
        scope.actionNumber = scope.actionNumber - 1;
        scope.nouns = [];
        scope.selection.verb = "";
        scope.selection.noun = "";
        $rootScope.$broadcast("undo", scope.storedStates.pop());
      };


      /////////////////////////////////
    }
  }
});

app.filter('capitalize', function() {
  return function(input) {
    return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
  }
});

// taken from stackoverflow http://stackoverflow.com/questions/4149276/javascript-camelcase-to-regular-form
app.filter('camelcasechange', function() {
  return function(input) {
    return input.replace(/([A-Z])/g, ' $1')
      // uppercase the first character
      .replace(/^./, function(str){ return str.toUpperCase(); })
  }
});
// {giveTo: 'medic', city: 'dc'}
// {takeFrom: 'medic', city: 'dc'}
app.filter('takeOrGive', function() {
  return function(input) {
    if (input.takeFrom) {
      console.log("Take " + input.city + " from " + input.takeFrom)
      return "Take " + input.city + " from " + input.takeFrom
    } else if (input.giveTo){
      return "Give " + input.city + " to " + input.giveTo
    }

    return input;
  }
});
