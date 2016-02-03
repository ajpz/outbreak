app.directive("infectionRate", function($rootScope){
	return {
		restrict: 'E',
		templateUrl: 'js/directives/infection-rate/ob.infection-rate.html',
		scope: {},
		link: function(scope, element){
			scope.infectionRateIndex = 0;
      // test data
      // var gameState = {
      //   infectionRateIndex: 3
      // }

      scope.changeTheIndex = function(gameState){
        scope.infectionRateIndex = gameState.infectionRateIndex;
        var elem = $(element).find("#index_"+scope.infectionRateIndex);
        for(var i=0; i<7; i++){
          if(i!==scope.infectionRateIndex){
            var elem = $(element).find("#index_"+i)
            elem.children("img").attr("src", "http://i.imgur.com/5I0tivz.png")
          }
        }
      }

      // scope.changeTheIndex(gameState)

      $rootScope.$on('stateChange', function(event, payload){
        let gameState = payload.gameState;
        if(scope.infectionRateIndex !== gameState.infectionRateIndex){
					scope.changeTheIndex(gameState);
				}
			})

		}
	};
});

