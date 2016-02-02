app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state) {
      return {
        restrict: 'E',
        templateUrl: 'js/directives/navbar/navbar.html',
        scope: {},
        link: function (scope) {

            //CARDS:
            // add new card(s) to hand via drawing or receiving during a share
            scope.addCard = function(){};

            // select card(s) from current hand, to do something with it
            // card(s) placed in SELECTED section
            scope.selectCard = function(){};

            // selected citycard is given to another player
            scope.shareCard = function(){};

            // selected citycard played and discarded (for a move /flight)
            scope.playCard = function(){};

            // selected Eventcard played and discarded
            scope.playEvent = function(){};

            // 5 city cards of same color discarded to cure a disease
            // these cards have already been moved into SELECTED section, it is emptied.
            scope.cureDisease = function(){};

            // discard city cards to have max 7 in hand
            // these cards have already been moved into SELECTED section, it is emptied.
            scope.discardCards = function(){};

            // toggle between tabs to see other gamer's roles and hands
            // default should be tab of the respective gamer
            scope.setTab = function(){};

            // indicates who has active turn and
            // disables playing (but not selecting) non-event cards in your hand
            scope.isTurn = function(){};



        }

    };

});
