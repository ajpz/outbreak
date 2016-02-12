app.config(function($stateProvider) {
  $stateProvider.state('lobbyWaitingArea', {
    url: '/lobby/:id',
    templateUrl: 'js/states/lobbyWaitingArea/ob.lobby-waiting-area.template.html',
    resolve: {
      loggedInUser: function(AuthService) {
        return AuthService.getLoggedInUser()
      },
      lobby: function($stateParams, LobbyFactory) {
        return LobbyFactory.getALobby($stateParams.id)
      }
    },
    controller: 'LobbyWaitingAreaCtrl'
  });
});
