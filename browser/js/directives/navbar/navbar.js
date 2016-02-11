app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, Roles, Cities) {

  return {
    restrict: 'E',
    templateUrl: 'js/directives/navbar/navbar.html',
    scope: {},
    // controller: 'NavbarCtrl',
    link: function(scope) {
      scope.roles = Roles;
      scope.CITIES = Cities; 
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

        localCopyOfState = _.cloneDeep(fbData.gameState);

        // who am i?
        scope.username = localStorage.getItem('user');

        if (scope.username) {
          let payload = fbData.gameState;
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
        } else {
          $rootScope.$broadcast('badClick', {
            error: "It's not your turn to discard!"
          })
      };
    }

      scope.eventCardOptions = {
        showAirlift : false
      };


      

      scope.eventAction = function(card) {
        if (localCopyOfState.currentPhase === "actions" && card.type === "eventCard") {
          if (card.key === "airlift"){
            scope.eventCardOptions.showAirlift = true;
          } else if (card.key === "oneQuietNight") {

          } else if (card.key === "governmentGrant") {

          } else if (card.key === "forecast"){

          } else if (card.key === "resilientPopulation") {

          }
        }
      }

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
        console.log("THIS IS  AIRLIFT IN notifyCityChange, ", scope.airlift.city);
      }

      scope.executeAirlift = function(){
        console.log("in execute airlift: ", scope.airlift);


        // TODO change game state by removing airlift event card
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
          if (airliftCardIndex) {
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



    }

  };

});
