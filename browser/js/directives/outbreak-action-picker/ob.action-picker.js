app.directive('actionPicker', function($rootScope, ActionFactory) {
  return {
    restrict : 'E',
    templateUrl : 'js/directives/outbreak-action-picker/ob.action-picker.html',
    //scope : {},
    link : function(scope, elem, attr) {
      scope.actionNumber = 1;
      // functionality to store state, on execution of the game
      // any time an action is to be executed, you store the previous state
      // update the state, broadcast a change to update the gameState in GameFactory/FB
      // when we get to functionality where a user can go back a move,
      // you would just pop off the previous stack and broadcast another  gameState change
      // stored state can also be used to keep track of where the user is in their action step
      // in addition to still being in the action phase and being the current user
      scope.storedStates = [];


      const phaseFunction = {
        "actions" : function() {},
        "draw" : function() {},
        "discard" : function() {},
        "infection" : function(){}
      }

      /**
       *  This event is fired off on load
       * @type {boolean}
       *
       */
      $rootScope.$on('stateChange', function(event, payload) {
        let gameState = payload.gameState;
        // your current counter is the gameState.infectionLevel
        scope.turn = gameState.gamerTurn;
        scope.gamers = _.cloneDeep(payload.gameState.gamers);
        // might not need the full
        scope.gameState = _.cloneDeep(payload.gameState);
        scope.clientUser = localStorage.getItem("user");
        scope.verbs = ActionFactory.availableVerbs(scope.gamers[scope.turn], gameState);
        // if you are the current user and the current phase is the actions phase
        // generate the for the user
        if (scope.clientUser === scope.gamers[scope.turn].username) {
          // to shorten, create an object of { phase : function(), phase : function() }
          // unsure if this is a return or just some action
          // TODO : revise as you know more
          //if (scope.actionNumber < 4){
          //  phaseFunction[gameState.currentPhase]();
          //  // need to know if this is a rewind/go back type of action
          //  scope.actionNumber = scope.actionNumber + 1;
          //}
        } else {
          // you are not the current user
          // you should not have access to do things
          // there are special css properties that will be added to gray out the ability to add things?
        }

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
            scope.nouns.push([infection, infectionsInCity[infection]]);
          });
        } else if (verb === "build") {

        } else if (verb ===  "giveCityCard") {

        } else if (verb === "takeCityCard") {

        } else if (verb === "cureDisease") {

        }

      };

      scope.selectNoun = () => {
        console.log(scope.selection.noun);
      };

      ////////// Buttons/ Interactivity //////////////
      scope.show = true;
      scope.hideText = ""
      scope.arrow = "left";

      scope.execute  = () => {
        if (scope.selection.verb !=='' && scope.selection.noun !== ''){
          console.log(scope.selection);
          if (scope.selection.verb === "go") {

            broadcastGoToGameState(scope.selection);
          }
        }
      };

      // loop through walkingFerryKeys
      // directFlightKeys
      // charterFlightKeys
      // shuttleFlightKeys
      // where it is located tells you what logic to apply
      function broadcastGoToGameState(info) {
        let packet = {};
        console.log("in broadcast");
        console.log(walkingFerryKeys);
        if (walkingFerryKeys.includes(info.noun)) {

          // move the current user to the new location
          packet.gamers = scope.gamers;
          packet.gamers[scope.turn].currentCity = info.noun;
          $rootScope.$broadcast("go", packet);

        } else if (directFlightKeys.includes(info.noun)) {

          packet.gamers = scope.gamers;
          let indexOfCard = packet.gamers[scope.turn].hands.findIndex(function(card){
            if (card.key === info.noun){
              return true;
            }
          });
          // remove the the card from the user's hand
          packet.gamers[scope.turn].hands.splice(indexOfCard, 1);
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
          $rootScope.$broadcast("go", packet);

        } else if (shuttleFlightKeys.includes(info.noun)){

          // move the current user to the new location
          packet.gamers = scope.gamers;
          packet.gamers[scope.turn].currentCity = info.noun;
          $rootScope.$broadcast("go", packet);
        }
        scope.actionNumber = scope.actionNumber + 1;
        scope.selection.verb = "";
        scope.selection.noun = "";
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



      /////////////////////////////////
    }
  }
});

app.filter('capitalize', function() {
  return function(input) {
    return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
  }
});
