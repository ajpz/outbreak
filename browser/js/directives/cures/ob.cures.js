app.directive("cures", function($rootScope){
	return {
		restrict: 'E',
		templateUrl: 'js/directives/cures/ob.cures.html',
		scope: {},
		link: function(scope, element){
			scope.diseases = {
				red: {
					cured: false,
					eradicated: false,
          curedIcon: 'https://i.imgur.com/vq81JJ0.png',
          eradicatedIcon: 'https://i.imgur.com/BoK9iaO.png'
				},
				yellow: {
					cured: false,
					eradicated: false,
          curedIcon: 'https://i.imgur.com/rkz0Y6X.png',
          eradicatedIcon: 'https://i.imgur.com/KlgntTZ.png'
				},
				blue: {
					cured: false,
					eradicated: false,
          curedIcon: 'https://i.imgur.com/uaacKCG.png',
          eradicatedIcon: 'http://i.imgur.com/xfnB2Bt.png'
				},
				black: {
					cured: false,
					eradicated: false,
          curedIcon: 'https://i.imgur.com/4tGcZvP.png',
          eradicatedIcon: 'https://i.imgur.com/PNkokQN.png'
				}
			};


      let notCured = 'https://i.imgur.com/RobelMv.png';
      let payload = {
        isCured: {
          blue: true
        },
        isEradicated:{
          red: true
        }

      }
			scope.cureTheDisease = function(payload){
				for(let key in payload.isCured){
					if(payload.isCured[key] !== scope.diseases[key].cured){
						scope.diseases[key].cured = payload.isCured[key];
            var elem = $(element).find("#"+key)
            elem.attr("src", scope.diseases[key].curedIcon)
					}
				}
			}

      scope.cureTheDisease(payload);

      scope.eradicateTheDisease = function(payload){
        for(let key in payload.isEradicated){
          if(payload.isEradicated[key] !== scope.diseases[key].eradicated){
            if(payload.isEradicated[key]){
              scope.diseases[key].isCured = false;
            }
            scope.diseases[key].eradicated = payload.isEradicated[key];
            var elem = $(element).find("#"+key)
            elem.attr("src", scope.diseases[key].eradicatedIcon)
          }
        }
      }
      scope.eradicateTheDisease(payload);


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
