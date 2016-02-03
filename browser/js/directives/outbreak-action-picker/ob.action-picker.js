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
        console.log("in the initialize in action picker");
        console.log(scope.gameState);
        scope.clientUser = localStorage.getItem("user");
        console.log("Available verbs for user");
        console.log(ActionFactory.availableVerbs(scope.clientUser, gameState));
        // if you are the current user and the current phase is the actions phase
        // generate the for the user
        if (scope.clientUser === scope.gamers[scope.turn].username) {
          // to shorten, create an object of { phase : function(), phase : function() }
          // unsure if this is a return or just some action
          // TODO : revise as you know more
          if (scope.actionNumber < 4){
            phaseFunction[gameState.currentPhase]();
            // need to know if this is a rewind/go back type of action
            scope.actionNumber = scope.actionNumber + 1;
          }
        } else {
          // you are not the current user
          // you should not have access to do things
          // there are special css properties that will be added to gray out the ability to add things?
        }

      });



      ////////// Buttons/ Interactivity //////////////
      scope.show = true;
      scope.hideText = ""
      scope.arrow = "left";

      scope.toggleDiv  = () => {
        if (scope.show) {
          scope.hideText = "hidden";
        } else {
          scope.hideText = "";
        }
        scope.show = !scope.show;
      };

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

      // to figure out what are the available moves
      // need to know who the current user is
      // need to know the gameState?
      //////////////////////////////////////////
      // Listener level work
      $rootScope.$on("stateChange", function(event, payload) {
        // update as necessary
        // show changes in the game;

        // check if it is the gamer's turn, determines whether the action div is shown
        //
      });

      $rootScope.$broadcast("actionSubmitted", {
        key1 : "",
        key2 : ""
      });


      /////////////////////////////////
    }
  }
});

app.filter('capitalize', function() {
  return function(input) {
    return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
  }
});
