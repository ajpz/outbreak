app.config(function($stateProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'js/home/home.html',
    controller: function($scope, $rootScope, ngToast) {
        let previousMessage = null;

        $rootScope.$on('stateChange', function(event, payload) {
          if(payload.gameState.message !== previousMessage){
            createStateChangeToast(payload.gameState.message);
            previousMessage = payload.gameState.message;
          }
        });

        $rootScope.$on('badClick', function(event, payload) {
            ngToast.create({
              className: 'danger',
              content: payload.error,
              dismissOnTimeout: true,
              timeout: 4000,
              dismissButton: true,
              animation: 'fade',
              horizontalPostion: 'right',
              veritcalPosition: 'top'
            });
        });

        $rootScope.$on('drawCard', function(event, payload) {

            var html = '<img src="' + payload.cardFront + '"/>';
            console.log("html is ", html);

            ngToast.create({
              className: payload.className,
              content: html,
              dismissOnTimeout: true,
              timeout: 4000,
              // dismissButton: true,
              animation: 'fade',
              horizontalPostion: 'right',
              veritcalPosition: 'top'
            });
        });

        function createStateChangeToast(message){
            ngToast.create({
              className: 'success',
              content: message,
              dismissOnTimeout: true,
              timeout: 4000,
              dismissButton: true,
              animation: 'fade',
              horizontalPostion: 'right',
              veritcalPosition: 'top'
            });
        };
          // create a toast with settings:




        // setTimeout(function(){
        //     ngToast.dismiss();
        // }, 5000)

        // clear all toasts:
      }
      // we have GameFactory for some of the loading in this case
      // controller : function($scope, $rootScope, GameFactory) {
      //   //$scope.counter = 0;

    //   $rootScope.$on('initialize', function(event, payload) {
    //     // on initialize, you get a payload of all the gameState
    //     // set the information that you need from this payload eg- payload.gameState
    //     let gameState = payload.gameState;
    //     // your current counter is the gameState.infectionLevel
    //     $scope.counter = gameState.infectionLevelIndex;
    //     $scope.turn = gameState.gamerTurn;
    //     $scope.gamers = _.cloneDeep(payload.gameState.gamers);
    //     console.log('intialize heard in home.js ', $scope.counter, $scope.turn, $scope.gamers);
    //   });

    //   // when a player clicks on a button
    //   $scope.updateCounter = function() {
    //     console.log('updateCounter clicked ', localStorage.getItem('user'), $scope.gamers[$scope.turn].username);
    //     if (localStorage.getItem("user") === $scope.gamers[$scope.turn].username){
    //       console.log('I AM THE USER')
    //       // show that the counter has changed on the front end
    //       $scope.counter = $scope.counter + 1;
    //       // now the turn has changed and is noted locally
    //       $scope.turn = ($scope.turn + 1) % 4;
    //       // listened on in the ob.game.factory.js
    //       $rootScope.$broadcast("counter", { infectionLevelIndex : $scope.counter , gamerTurn : $scope.turn });
    //     }
    //   };
    //   $rootScope.$on("stateChange", function(even, payload) {
    //     console.log("stateChange heard in home.js ", payload);
    //     console.log(payload);
    //     $scope.counter = payload.gameState.infectionLevelIndex;
    //     $scope.turn = payload.gameState.gamerTurn;
    //     $scope.gamers = _.cloneDeep(payload.gameState.gamers);
    //   });
    // }
  });
});
