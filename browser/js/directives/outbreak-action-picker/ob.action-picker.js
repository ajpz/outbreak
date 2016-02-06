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
      $rootScope.$on('stateChange', function(event, payload) {
        let gameState = payload.gameState;
        scope.turn = gameState.gamerTurn;
        scope.gamers = _.cloneDeep(payload.gameState.gamers);
        scope.gameState = _.cloneDeep(payload.gameState);
        scope.clientUser = localStorage.getItem("user");
        scope.verbs = ActionFactory.availableVerbs(scope.gamers[scope.turn], gameState);
        // if you are the current user and the current phase is the actions phase
        // generate the for the user
        console.log("in state change");
        console.log(scope.clientUser);
        console.log( scope.gamers[scope.turn].username);
        console.log(scope.gameState.currentPhase);
        console.log(scope.gameState);
        if (scope.clientUser === scope.gamers[scope.turn].username) {
          if (scope.actionNumber === 5) {
            scope.actionNumber = 1; //need to hide the actions information
            scope.storedStates = [];
            //change the phase;
            $rootScope.$broadcast("changeToDraw", {currentPhase : "draw" });
          }
        } else {
          // you are not the current user
          // you should not have access to do things
          // there are special css properties that will be added to gray out the ability to add things?
        }

        // this is not responsible to make changes like that
        //$rootScope.$broadcast("updateGamerTurn", { gamerTurn : (scope.turn +1) % 4 })

      });

      // TODO : there might be the possibility of
      // getting repeat values on generation
      // have to use track by or filter to do this
      // maybe also do a best effort to figure out which
      // moves is picked
      const verbNounMap = {
        "go" : [
          ActionFactory.walkingOrFerryKeys,
          ActionFactory.directFlightsKeys,
          ActionFactory.charterFlightsKeys,
          ActionFactory.shuttleFlightsKeys
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
        ]
      };
      // you select a verb, it will put the verb in here
      scope.selection = {
        verb : '',
        noun : ''
      };

      let walkingFerryKeys = [];
      let directFlightKeys = [];
      let charterFlightKeys = [];
      let shuttleFlightKeys = [];

      // go is related with drive/ferry, shuttle flight, direct flight, charter flight
      // treat is with treat disease and discover a cure
      // build is with build a research station
      // card actions are with share knowledge
      scope.notifySelectionVerb = () => {
        scope.nouns = [];
        let verb = scope.selection.verb;
        // this is to ensure that the execution button gets disabled
        scope.selection.noun = "";
        if (verb === "go" ) {
          verbNounMap[scope.selection.verb].forEach(function(noun, index){
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
            scope.nouns = scope.nouns.concat(noun(scope.gamers[scope.turn], scope.gameState).slice());
          });
        } else if (verb === "treat") {
          // turn the key-value pairs into its own array

          let infectionsInCity = verbNounMap[verb][0](scope.gamers[scope.turn], scope.gameState);
          let infections = ["black", "blue", "red", "yellow"];

          infections.forEach(function(infection) {
            scope.nouns.push(infection + " : " + infectionsInCity[infection]);
          });
        } else if (verb === "build") {
          // if you are allowed to build because of logic in action factory
          // then I am making the assumption that you can build where you are
          // the only specialty might be the opperator
          // TODO : the opperator might need a more specialized logic
          scope.nouns = ["research center in: " + scope.gamers[scope.turn].currentCity]
        } else if (verb ===  "giveCityCard") {
          scope.nouns = verbNounMap[verb][0](scope.gamers[scope.turn], scope.gameState);
        } else if (verb === "takeCityCard") {
          scope.nouns = verbNounMap[verb][0](scope.gamers[scope.turn], scope.gameState);
        } else if (verb === "cureDisease") {
          // array of colors
          let cureObj = verbNounMap[verb][0](scope.gamers[scope.turn], scope.gameState);
          for(let k in cureObj){
            if (cureObj[k]  === true){
              scope.nouns.push(k);
            }
          }
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
          console.log(scope.selection);
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
          }

          scope.nouns = [];
          scope.actionNumber = scope.actionNumber + 1;
          scope.selection.verb = "";
          scope.selection.noun = "";
          console.log("in execute : ", scope.actionNumber);
          //if (scope.actionNumber === 5) {
          //  // update the user turn too;
          //  // get to the next phase;
          //  //
          //}
        }

      };

      // loop through walkingFerryKeys
      // directFlightKeys
      // charterFlightKeys
      // shuttleFlightKeys
      // where it is located tells you what logic to apply
      function broadcastGoToGameState(info) {
        let packet = {};
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
        }
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
        // $rootScope.$broadcast('treatedCity', dataToBroadcast)
        $rootScope.$broadcast("treat", packet);
      }


      // not considering that you might have to remove a research center because you are at your limit
      // of research center that you can build
      // you are on your current city and there is nothing here and you want to build a research center
      function broadcastBuildResearchCenter(info) {
        // to build a ressearch center, you need to remove the card of that city card from your hand too
        let packet = {};
        console.log("building a research center in this city");
        console.log(info);
        let cardIndex = scope.gamers[scope.turn].hand.findIndex(function(card) {
          if (card.key === scope.gamers[scope.turn].currentCity) {
            return true;
          }
        });

        let card = scope.gamers[scope.turn].hand.splice(cardIndex, 1)[0];
        scope.gameState.researchCenterLocations.push(card.key);
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
        let givingInformation = JSON.parse(info.noun);
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
        let packet = {};
        let takingInformation = JSON.parse(info.noun);
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
        let packet = {isCured : scope.gameState.isCured};
        packet.message = "User \'"+ scope.gameState.gamers[scope.turn].username + "\' just cured "+ colorToCure;
        $rootScope.$broadcast("cureDisease", packet);
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
