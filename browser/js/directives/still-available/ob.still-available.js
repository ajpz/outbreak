app.directive("stillAvailable", function($rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/still-available/ob.still-available.html',
    scope: {},
    link: function(scope) {
      let remainingCubes = {
        red: 24,
        blue: 24,
        black: 24,
        yellow: 24
      }
      //the database should initialize the outbreak level so the above line should not be necessary


      //TODO: THIS WILL NOT WORK. DON'T KNOW WHY THIS WAS WRITTEN
      function changeNumRemainingCubes(gameState) {
        for(let key in gameState.remainingCubes){
          remainingCubes[key] = gameState.remainingCubes[key];
          console.log("\n\n\nadding")
          console.log(remainingCubes[key])
          $("#"+key+"_remaining div").append(""+remainingCubes[key]);
          // console.log("\n\n\n\n\n\n\n\n\n\n\n\n")
          // console.log(elem)
        }

      }

      $rootScope.$on('stateChange', function(event, payload) {
        let gameState = payload.gameState;
        changeNumRemainingCubes(gameState)
      })

    }
  };
});
