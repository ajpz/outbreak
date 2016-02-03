app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        // we have GameFactory for some of the loading in this case
        controller : function($scope, $rootScope, GameFactory) {
          //$scope.counter = 0;

          $rootScope.$on('initialize', function(event, payload) {
            // on initialize, you get a payload of all the gameState
            // set the information that you need from this payload eg- payload.gameState
            let gameState = payload.gameState;
            // your current counter is the gameState.infectionLevel
            $scope.counter = gameState.infectionLevelIndex;
            $scope.turn = gameState.gamerTurn;
            $scope.gamers = _.cloneDeep(payload.gameState.gamers);
          });

          // when a player clicks on a button
          $scope.updateCounter = function() {
            if (localStorage.getItem("user") === $scope.gamers[$scope.turn].username){
              // show that the counter has changed on the front end
              $scope.counter = $scope.counter + 1;
              // now the turn has changed and is noted locally
              $scope.turn = ($scope.turn + 1) % 4;
              // listened on in the ob.game.factory.js
              $rootScope.$broadcast("counter", { infectionLevelIndex : $scope.counter , gamerTurn : $scope.turn });
            }
          };

          $rootScope.$on("stateChange", function(even, payload) {
            console.log("in im real");
            console.log(payload);
            $scope.counter = payload.gameState.infectionLevelIndex;
            $scope.turn = payload.gameState.gamerTurn;
          });

        }
    });
});
