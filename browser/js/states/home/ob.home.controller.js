app.controller("HomeCtrl", function($scope, AuthService, $state, CreateLobbyFactory) {
  console.log("home ctrl");

  $scope.goToLogin = function() {
    $state.go("login")
  }

  $scope.isLoggedIn = function() {
    return AuthService.isAuthenticated();
  }

  $scope.game = {
    typeOfGame: 'public'
  }
  $scope.createGame = function(game) {
    AuthService.getLoggedInUser().then(function(user) {
      let data = {
        type: game.typeOfGame,
        user: user
      }
      CreateLobbyFactory.makeALobby(data)
    })

  }
})
