app.directive("infectionRate", function($rootScope){
	return {
		restrict: 'E',
		templateUrl: 'js/directives/infection-rate/ob.infection-rate.html',
		scope: {},
		link: function(scope){
			scope.infectionRateIndex = 0;

			scope.changeTheIndex = function(payload){
				scope.infectionRateIndex = payload.infectionRateIndex;
				$("#radio_"+scope.infectionRateIndex).prop("checked", true)

			}

			$rootScope.$on('stateChange', function(event, payload){
				if(scope.infectionRateIndex !== payload.infectionRateIndex){
					changeTheIndex(payload);
				}
			})

		}
	};
});