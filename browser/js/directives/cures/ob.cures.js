app.directive("cures", function($rootScope){
	return {
		restrict: 'E',
		templateUrl: 'js/directives/cures/ob.cures.html',
		scope: {},
		link: function(scope){
			scope.diseases = {
				red: {
					cured: false,
					eradicated: false
				},
				yellow: {
					cured: false,
					eradicated: false
				},
				blue: {
					cured: false,
					eradicated: false
				},
				black: {
					cured: false,
					eradicated: false
				}
			};

			scope.cureTheDisease = function(payload){
				for(let key in payload.isCured){
					if(payload.isCured[key] !== scope.diseases[key].cured){
						scope.diseases[key].cured = payload.isCured[key];
					}
				}
			}
			
			scope.eradicateTheDisease = function(payload){
				for(let key in payload.isEradicated){
					if(payload.isEradicated[key] !== scope.diseases[key].eradicated){
						scope.diseases[key].eradicated = payload.isEradicated[key];
					}
				}
			}

			$rootScope.$on('stateChange', function(event, payload){
				for(let key in payload.isCured){
					if(payload.isCured[key] !== scope.diseases[key].cured){
						cureTheDisease(payload)
					}
				}
				for(let key in payload.isEradicated){
					if(payload.isEradicated[key] !== scope.diseases[key].eradicated){
						eradicateTheDisease(payload)
					}
				}
			})

		}
	};
});