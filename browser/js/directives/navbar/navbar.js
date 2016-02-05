app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, Roles) {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/navbar/navbar.html',
    scope: {},
    // controller: 'NavbarCtrl',
    link: function (scope) {

      var localCopyOfState;

      // helper function to chunk data into columns
      function chunk(arr, size) {
          var newArr = [];
          for (var i = 0; i < arr.length; i += size) {
              newArr.push(arr.slice(i, i + size));
          }
          return newArr;
      }

      // let payload = {
      //   gamerTurn: 2,
      //   gamers: [{
      //       username : 'victor',
      //       role : 'medic',
      //       currentCity : 'atlanta',
      //       hand : [
      //         {type: 'cityCard', key: 'chicago', name: 'Chicago', color: 'blue'},
      //         {type: 'cityCard', key: 'sanFrancisco', name: 'San Francisco', color: 'yellow'},
      //         {type: 'cityCard', key: 'london', name: 'London', color: 'red'},
      //         {type: 'cityCard', key: 'madrid', name: 'Madrid', color: 'black'},
      //         {type: 'cityCard', key: 'paris', name: 'Paris', color: 'blue'}
      //       ]
      //     },

      //     {
      //       username : 'jonathan',
      //       role : 'researcher',
      //       currentCity : 'atlanta',
      //       hand : [
      //         {type: 'cityCard', key: 'chicago', name: 'Chicago', color: 'blue'},
      //         {type: 'cityCard', key: 'sanFrancisco', name: 'San Francisco', color: 'blue'},
      //         {type: 'cityCard', key: 'london', name: 'London', color: 'blue'},
      //         {type: 'cityCard', key: 'madrid', name: 'Madrid', color: 'blue'},
      //         {type: 'cityCard', key: 'paris', name: 'Paris', color: 'blue'}
      //       ]
      //     },

      //     {
      //       username : 'julie',
      //       role : 'scientist',
      //       currentCity : 'atlanta',
      //       hand : [
      //         {type: 'cityCard', key: 'chicago', name: 'Chicago', color: 'blue'},
      //         {type: 'cityCard', key: 'sanFrancisco', name: 'San Francisco', color: 'yellow'},
      //         {type: 'cityCard', key: 'london', name: 'London', color: 'red'},
      //         {type: 'cityCard', key: 'madrid', name: 'Madrid', color: 'black'},
      //         {type: 'cityCard', key: 'paris', name: 'Paris', color: 'blue'}
      //       ]
      //     },

      //     {
      //       username : 'daniel',
      //       role : 'operationsExpert',
      //       currentCity : 'atlanta',
      //       hand : [
      //         {type: 'cityCard', key: 'chicago', name: 'Chicago', color: 'blue'},
      //         {type: 'cityCard', key: 'sanFrancisco', name: 'San Francisco', color: 'blue'},
      //         {type: 'cityCard', key: 'london', name: 'London', color: 'blue'},
      //         {type: 'cityCard', key: 'madrid', name: 'Madrid', color: 'blue'},
      //         {type: 'cityCard', key: 'paris', name: 'Paris', color: 'blue'}
      //       ]
      //     }
      //   ]
      // };


      $rootScope.$on('stateChange', function(event, fbData) {

        localCopyOfState = _.cloneDeep(fbData.gameState);

        // who am i?
        scope.username = localStorage.getItem('user');
        console.log('Navbar heard stateChange and has user ', scope.username);

        if(scope.username) {
          console.log('---> setting scope variables');
          let payload = fbData.gameState;
          let myIndex = payload.gamers.reduce(function(targetIdx, gamer, idx) {
            if(gamer.username === scope.username) targetIdx = idx;
            return targetIdx;
          }, -1);

          console.log('--->this browser has myIndex of ', myIndex, ' gamers of ', payload.gamers, ' and localStorage user of ', scope.username);

          // 'others' is an array of the non-owner-gamers
          scope.others = payload.gamers.filter(function(gamer, index){
            return index !== myIndex;
          }).map(function(other) {
            other.roleName = Roles[other.role].name;
            other.icon = Roles[other.role].icon;
            if(other.hand) {
              other.chunkedData = chunk(other.hand, 2);
            };
            return other;
          })

          // 'owner' is the user on this browser
          scope.owner = payload.gamers[myIndex];
          scope.owner.roleName = Roles[scope.owner.role].name;
          scope.owner.icon = Roles[scope.owner.role].icon;
        }
      });


      scope.cardAction = function(_this) {
        //currentPhase = 'discard'
        if(localCopyOfState.currentPhase === 'discard' && (localStorage.getItem('user') === localCopyOfState.gamers[localCopyOfState.gamerTurn].username)){
          // discard phase and it is this user's turn
          if(localCopyOfState.gamers[localCopyOfState.gamerTurn].hand.length > 1) {
            // remove card selected from hand
            var hand = localCopyOfState.gamers[localCopyOfState.gamerTurn].hand;
            localCopyOfState.gamers[localCopyOfState.gamerTurn].hand = hand.filter(function(cardObj) {
              return cardObj.key !== _this.card.key;
            })

            // if user has right number of cards, advance game to infect phase and advance turn
            if(localCopyOfState.gamers[localCopyOfState.gamerTurn].hand.length <= 1) {
              localCopyOfState.currentPhase = 'infect';
              localCopyOfState.gamerTurn = (localCopyOfState.gamerTurn + 1) % 4;
            }

            $rootScope.$broadcast('discardCard', {updatedState: localCopyOfState});
          } else {
            alert("You can't click this!")
          }
        }
      };


      //CARDS:
      // add new card(s) to hand via drawing or receiving during a share
      scope.addCard = function(){};

      // select card(s) from current hand, to do something with it
      // card(s) placed in SELECTED section
      scope.selectCard = function(){};

      // selected citycard is given to another player
      scope.shareCard = function(){};

      // selected citycard played and discarded (for a move /flight)
      scope.playCard = function(){};

      // selected Eventcard played and discarded
      scope.playEvent = function(){};

      // 5 city cards of same color discarded to cure a disease
      // these cards have already been moved into SELECTED section, it is emptied.
      scope.cureDisease = function(){};

      // discard city cards to have max 7 in hand
      // these cards have already been moved into SELECTED section, it is emptied.
      scope.discardCards = function(){};

      // toggle between tabs to see other gamer's roles and hands
      // default should be tab of the respective gamer
      scope.setTab = function(){};

      // indicates who has active turn and
      // disables playing (but not selecting) non-event cards in your hand
      scope.isTurn = function(){};



    }

};

});
