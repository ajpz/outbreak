app.directive('actionSelection', function($rootScope, ActionFactory) {
  return {
    restrict: 'E',
    templateURL: '',
    scope: {},
    link: function(scope) {

      let state;


      /**
       * STATE LISTENER
       * listens on 'stateChange'
       * checks that game is 'inProgress' and currentPhase is 'action'
       * fetches action-impacted 'gamer' and 'lastActionSelected' from payload
       */

      $rootScope.$on('stateChange', function(event, payload) {
        // is payload the gameState? or does it have .gameState property?
        state = payload;
        scope.status = state.status; // 'inProgress'
        scope.currentPhase = state.currentPhase; //'action'

        // will this already be in FIREBASE? This is the whole proposedAction object
        scope.proposedActions = state.proposedActions;
        scope.lastActionSelected = state.proposedActions[state.proposedActions.length - 1];
        // get reference to most recently updated active gamer state object
        scope.gamer = ActionFactory.getGamer(scope.lastActionSelected.gamersAfterAction, scope.lastActionSelected.role);
        scope.tempAction = new ActionFactory.Action (
          scope.lastActionSelected.number + 1,
          'regular',
          scope.gamer.role
          );
      });

      /**
       * STATE EMITTER
       * broadcasts 'actionSelected' to central proposedActions state variable
       * fires each time a user completes an individual action
       * will fire 4 times
       */

       scope.userAcceptsOneAction = function() {
         $rootScope.$broadcast('actionSelected', scope.tempAction);
       };



      /* SCOPE METHODS */

      // use ActionFactory to determine eligible moves for each Action to be selected
      // user selections (clicks) register properties on local object, tempAction
      // once selections are completed, broadcast 'actionSelected' with tempAction Object
      //    this should get GameFactory to save new state (which incorporates new action proposal
      //    into the state variable, 'proposedActions')
      // once saved to Firebase, GameFactory broadcasts updated state, and the listener above sees
      // new proposedActions object incorporating latest additions

      scope.availableVerbs = function(verb) {
        let actions = ActionFactory.availableVerbs(scope.gamer, scope.lastActionSelected);
        return actions.indexOf(verb) > -1;
      };






    }
  }
});
/*
{
    number: 1, // 1 through 4
    type: 'regular', // options: 'event', 'epidemic'
    role: 'medic' // roles of gamers
    verb: 'go',  //'go', 'treat', 'build', 'giveCityCard', 'takeCityCard', 'cureDisease'
    goType: , // drive/ferry, directFlight, charterFlight, shuttleFlight
    placeFrom: 'newYork', //cityKey or null
    placeTo: 'atlanta', //cityKey or null
    cityCardToDiscard: 'mumbai',  // cityCard or null
    takeFrom: 'medic',
    giveTo: 'researcher',
    cardColorToTreat: '' // blue, yellow, black, red
    numToTreat: , // defaults to 1, or more for medic / if eradicated
    cardColorToCure: '' // blue, yellow, black, red
    gamersAfterAction: [
      {
        username : 'victor',
        role : 'medic',
        currentCity : 'atlanta',
        hand : [] //contains an array of card objects
      },
      {},
      {},
      {}
    ],
    citiesAfterAction: [
      {
        key: 'sanFrancisco',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      },
      {},
      {},
      {}
    ],
    researchCenterLocationsAfterAction: [
      'atlanta'
    ],
    isCuredAfterAction: {
      red: true,
      yellow: false,
      blue: false,
      black: false
    }
  },
  */
