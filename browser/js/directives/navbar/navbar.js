app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, Roles, Cities) {

  return {
    restrict: 'E',
    templateUrl: 'js/directives/navbar/navbar.html',
    scope: {},
    // controller: 'NavbarCtrl',
    link: function(scope) {
      scope.roles = Roles;
      scope.CITIES = Cities;
      scope.actionPhase = false;
      var localCopyOfState;


      // helper function to chunk data into columns
      function chunk(arr, size) {
        var newArr = [];
        for (var i = 0; i < arr.length; i += size) {
          newArr.push(arr.slice(i, i + size));
        }
        return newArr;
      }


      $rootScope.$on('stateChange', function(event, fbData) {

        //for use in all card click handlers
        localCopyOfState = _.cloneDeep(fbData.gameState);


        if (localCopyOfState.currentPhase === 'actions'){
          scope.actionPhase = true;
        }
        else {
          scope.actionPhase = false;
        }
        // who am i?
        scope.username = localStorage.getItem('user');

        if (scope.username) {
          let payload = _.cloneDeep(fbData.gameState);
          let myIndex = payload.gamers.reduce(function(targetIdx, gamer, idx) {
            if (gamer.username === scope.username) targetIdx = idx;
            return targetIdx;
          }, -1);

          // 'others' is an array of the non-owner-gamers
          scope.others = payload.gamers.filter(function(gamer, index) {
            return index !== myIndex;
          }).map(function(other) {
            other.roleName = Roles[other.role].name;
            other.icon = Roles[other.role].icon;
            other.tooltip = Roles[other.role].ability;
            if(other.hand) {
              other.chunkedData = chunk(other.hand, 2);
            };
            return other;
          })

          // 'owner' is the user on this browser
          scope.owner = payload.gamers[myIndex];
          scope.owner.roleName = Roles[scope.owner.role].name;
          scope.owner.icon = Roles[scope.owner.role].icon;
          scope.owner.tooltip = Roles[scope.owner.role].ability;
          scope.gamers = payload.gamers;

          scope.turnBelongsTo = function(role){
            return (role === payload.gamers[payload.gamerTurn].role);
          }
        }
      });


      scope.cardAction = function(card) {
          //currentPhase = 'discard'
        if (localCopyOfState.currentPhase === 'discard'
          && (localStorage.getItem('user') === localCopyOfState.gamers[localCopyOfState.gamerTurn].username)) {
          // discard phase and it is this user's turn
          if (localCopyOfState.gamers[localCopyOfState.gamerTurn].hand.length > 7) {
            $rootScope.$broadcast('discardCardChosen', card);
          }

        }
        else if (localCopyOfState.currentPhase === "actions" && card.type === "eventCard"
            && (localStorage.getItem('user') === localCopyOfState.gamers[localCopyOfState.gamerTurn].username)) {
          // making use of the scope.eventAction ability since it should apply similarly
          // if the current player has an event card which we did not take care of.
          scope.eventAction(card);
        }
        else {
          $rootScope.$broadcast('badClick', {
            error: "It's not your turn to discard!"
          })
      };
    }

      scope.eventCardOptions = {
        showAirlift : false,
        showGovernmentGrant : false,
      };




      scope.eventAction = function(card) {
        // added in a quick check to make sure that the user is also the same user that is going
        // this would ensure that all  other players don't get the ability to get that ability
        //
        if (localCopyOfState.currentPhase === "actions" && card.type === "eventCard"
          && (localStorage.getItem('user') === localCopyOfState.gamers[localCopyOfState.gamerTurn].username)) {
          if (card.key === "airlift"){
            scope.eventCardOptions.showAirlift = true;
          } else if (card.key === "oneQuietNight") {
            playOneQuietNight();
          } else if (card.key === "governmentGrant") {
            console.log("first in event action arae");
            scope.eventCardOptions.showGovernmentGrant = true;
            scope.notifyGovernmentGrantChange();
          } else if (card.key === "forecast"){

          } else if (card.key === "resilientPopulation") {

          }
        }
      }

      ////////////////////// AIRLIFT //////////////////
      scope.airlift = {
        role : "",
        city : ""
      }

      scope.notifyRoleChange = function() {
        let player = scope.gamers.filter(function(gamer){
            return gamer.role === scope.airlift.role;
        })[0];
        scope.airliftCities = localCopyOfState.cities.filter(function(city) {
          return city.key !== player.currentCity;
        })
      };

      scope.notifyCityChange = function() {
        //console.log("THIS IS  AIRLIFT IN notifyCityChange, ", scope.airlift.city);
        // TODO : remove from the navbar.html too
      }

      scope.executeAirlift = function(){
        // move the pawn to new city

        // broadcast stateChange to gameFactory
        //localCopyOfState
        localCopyOfState.gamers.forEach(function(gamer){
          if (gamer.role === scope.airlift.role) {
            gamer.currentCity = scope.airlift.city;
          }
        });

        localCopyOfState.gamers.forEach(function(gamer){
          let airliftCardIndex;
          gamer.hand.forEach(function(card, index){
            if (card.type === "eventCard" && card.key === "airlift"){
              airliftCardIndex = index;
            }
          });
          if (airliftCardIndex >= 0) {
            gamer.hand.splice(airliftCardIndex, 1);
            airliftCardIndex = undefined;
          }
        });

        // need to pass the hand into the
        $rootScope.$broadcast("go", {gamers : localCopyOfState.gamers});
        scope.eventCardOptions.showAirlift = false;
        scope.airlift.role = "";
        scope.airlift.city = "";

      }
      ////////////////////// AIRLIFT END //////////////////

      /////////////////////// GOVERNMENT GRANT ///////////
      scope.governmentGrant = {
        city : ""
      }

      scope.notifyGovernmentGrantChange = function() {
        console.log("in notify government grant area ", scope.governmentGrant.city);
        // generate a list of cities that do not have research centers as options to build a research center
        // researchCenterLocations is an array of locations city keys

        scope.governmentGrantCities = localCopyOfState.cities.filter(function(city) {
          if (localCopyOfState.researchCenterLocations.indexOf(city.key) === -1){
            console.log(city);
            return true;
          }
        })
      }

      scope.executeGovernmentGrant = function() {
        if (localCopyOfState.researchCentersRemaining > 0) {
            localCopyOfState.gamers.forEach(function(gamer){
              let governmentGrantCardIndex;
              gamer.hand.forEach(function(card, index){
                if (card.type === "eventCard" && card.key === "governmentGrant"){
                  console.log("HERE WHERE Gover Grant is");
                  governmentGrantCardIndex = index;
                }
              });
              if (governmentGrantCardIndex >= 0) {
                console.log("governmentGrantCardIndex, :", governmentGrantCardIndex);
                gamer.hand.splice(governmentGrantCardIndex, 1);
                governmentGrantCardIndex = undefined;
              }
            });


          localCopyOfState.researchCenterLocations.push(scope.governmentGrant.city);
          localCopyOfState.researchCentersRemaining = localCopyOfState.researchCentersRemaining - 1;
          $rootScope.$broadcast("build", {
            researchCenterLocations : localCopyOfState.researchCenterLocations,
            researchCentersRemaining : localCopyOfState.researchCentersRemaining,
            gamers : localCopyOfState.gamers
          });
          scope.governmentGrant.city  = "";
          scope.eventCardOptions.showGovernmentGrant = false;
        }

        // will update gameState and add something to researchCenters and update firebase
      }
      //////////////////////////GOVERNMENT GRANT END/////////////////////////

      ///////////////////////// ONE QUIET NIGHT /////////////////////////////
      function playOneQuietNight() {
         localCopyOfState.gamers.forEach(function(gamer){
           let oneQuietCardIndex;
           gamer.hand.forEach(function(card, index){
             if (card.type === "eventCard" && card.key === "oneQuietNight"){
               oneQuietCardIndex = index;
             }
           });
           if (oneQuietCardIndex >= 0 ) {
             gamer.hand.splice(oneQuietCardIndex, 1);
             oneQuietCardIndex = undefined;
           }
         });

        // broadcast the removed card // do this part last
        $rootScope.$broadcast("genericUpdates", {
          eventCardInEffect : true,
          eventCardQueue : ["oneQuietNight"],
          gamers : localCopyOfState.gamers
        })
      }


      ////////////////////////ONE QUIET NIGHT END//////////////////////
    }

  };

});
