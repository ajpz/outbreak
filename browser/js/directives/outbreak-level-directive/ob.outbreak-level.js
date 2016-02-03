app.directive("outbreakLevel", function($rootScope){
	return {
		restrict: 'E',
		templateUrl: 'js/directives/outbreak-level-directive/ob.outbreak-level.html',
		scope: {},
		link: function(scope, element){
			scope.outbreakLevel = 0;
			//the database should initialize the outbreak level so the above line should not be necessary
      var payload = {
        outbreakLevel: 4
      }
			scope.changeTheLevel = function(payload){
				scope.outbreakLevel = payload.outbreakLevel;
        var elem = $(element).find("#level_"+scope.outbreakLevel);
        for(var i=1; i<8; i++){
          if(i!==scope.outbreakLevel){
            var elem = $(element).find("#level_"+i)
            elem.children("img").attr("src", 'http://i.imgur.com/GLfit2U.png')
          }
        }
			}

      scope.changeTheLevel(payload)

      $rootScope.$on('stateChange', function(event, payload){
				if(scope.outbreakLevel !== payload.outbreakLevel){
					changeTheLevel(payload);
				}
			})

		}
	};
});
