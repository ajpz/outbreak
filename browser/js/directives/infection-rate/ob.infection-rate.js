app.directive("infectionRate", function($rootScope){
	return {
		restrict: 'E',
		templateUrl: 'js/directives/infection-rate/ob.infection-rate.html',
		scope: {},
		link: function(scope, element){
			scope.infectionRateIndex = 0;
      var payload = {
        infectionRateIndex: 3
      }

      scope.changeTheIndex = function(payload){
        scope.infectionRateIndex = payload.infectionRateIndex;
        var elem = $(element).find("#index_"+scope.infectionRateIndex);
        for(var i=0; i<7; i++){
          if(i!==scope.infectionRateIndex){
            var elem = $(element).find("#index_"+i)
            elem.children("img").attr("src", "http://i.imgur.com/5I0tivz.png")
          }
        }
      }

      scope.changeTheIndex(payload)

      $rootScope.$on('stateChange', function(event, payload){
				if(scope.infectionRateIndex !== payload.infectionRateIndex){
					changeTheIndex(payload);
				}
			})

		}
	};
});


//jQuery( "a:contains(OpenStreetMap)" ).remove()
//jQuery( "a:contains(Improve this map)" ).remove()
