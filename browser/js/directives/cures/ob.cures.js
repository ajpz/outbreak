app.directive("cures", function($rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/cures/ob.cures.html',
    scope: {},
    link: function(scope, element) {


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

      scope.diseases.tooltip = "Shows whether a disease has been cured (filled bottle) or eradicated (check mark)";


      let notCured = 'https://i.imgur.com/RobelMv.png';
      // test data
      // let payload = {
      //   isCured: {
      //     blue: true
      //   },
      //   isEradicated:{
      //     red: true
      //   }

      // }

      /**
      NOTE: Current unimportant limitation:
      If you change the cured status of a disease from false to true, you cannot change it back to false.
      Similarly, you can change a disease that is cured to eradicated (isCured=true, isEradicated=false ===> isCured=false, isEradicated=true),
      but you can not change it back (isCured=false, isEradicated=true ===> isCured=true, isEradicated=false).
      This ***SHOULD NOT*** be a problem, as the rules to the game should not support that behavior.
      **/
      scope.cureTheDisease = function(gameState) {
        for (let key in gameState.isCured) {
          if (gameState.isCured[key] !== scope.diseases[key].cured) {
            var elem = $(element).find("#" + key)
            scope.diseases[key].cured = gameState.isCured[key];
            elem.attr("src", scope.diseases[key].curedIcon)
          }
        }
      }

      // scope.cureTheDisease(gameState);

      scope.eradicateTheDisease = function(gameState) {
        for (let key in gameState.isEradicated) {
          if (gameState.isEradicated[key] !== scope.diseases[key].eradicated) {
            if (gameState.isEradicated[key]) {
              scope.diseases[key].isCured = false;
            }
            scope.diseases[key].eradicated = gameState.isEradicated[key];
            var elem = $(element).find("#" + key)
            elem.attr("src", scope.diseases[key].eradicatedIcon)
          }
        }
      }
        // scope.eradicateTheDisease(gameState);


      $rootScope.$on('stateChange', function(event, payload) {
        let gameState = payload.gameState;
        for (let key in gameState.isCured) {
          scope.cureTheDisease(gameState)
        }
        for (let key in gameState.isEradicated) {
          scope.eradicateTheDisease(gameState)
        }
      })

    }
  };
});
