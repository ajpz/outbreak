app.directive('actionPicker', function($rootScope) {
  return {
    restrict : 'E',
    templateUrl : 'js/directives/outbreak-action-picker/ob.action-picker.html',
    scope : {},
    link : function(scope, elem, attr) {
      scope.show = true;
      // functionality to store state, on execution of the game
      // any time an action is to be executed, you store the previous state
      // update the state, broadcast a change to update the gameState in GameFactory/FB
      // when we get to functionality where a user can go back a move,
      // you would just pop off the previous stack and broadcast another  gameState change
      // stored state can also be used to keep track of where the user is in their action step
      // in addition to still being in the action phase and being the current user
      scope.storedStates = [];
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


      // need to include the Action Factory so that the space of current moves is to be generated


      // var myEl = angular.element( document.querySelector( '#div1' ) );
      // myEl.addClass('alpha');
      // this will let you add a class, and one that will show and hide the div to the screen
      // it will be an absolutely positioned div depending if the user is  in the game


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
