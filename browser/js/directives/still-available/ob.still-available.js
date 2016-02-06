app.directive("stillAvailable", function($rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/still-available/ob.still-available.html',
    scope: {},
    link: function(scope) {
      function changeNumRemainingCubes(gameState) {
        //loop through remaining cubes for each color, empty the div that holds them, then re-append the remaining number of cubes
        for(let key in gameState.remainingCubes){
          $("#"+key+"_remaining .remaining_cubes").empty().append(gameState.remainingCubes[key]);
        }
        //empty the div holding the num of remaining research centers and then re-append the num of remaining research centers 
        $(".remaining_research_centers").empty().append(gameState.researchCentersRemaining);
      }

      $rootScope.$on('stateChange', function(event, payload) {
        let gameState = payload.gameState;
        changeNumRemainingCubes(gameState)
      })
    }
  };
});
