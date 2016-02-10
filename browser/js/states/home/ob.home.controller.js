app.controller("HomeCtrl", function($scope, AuthService, $state, LobbyFactory) {
  console.log("home ctrl");
  LobbyFactory.getAllLobbies()
  .then(function(lobbies) {
    $scope.lobbies = lobbies
  })

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
        title: game.title,
        type: game.typeOfGame,
        user: user
      }
      LobbyFactory.makeALobby(data)
      .then(function() {
        LobbyFactory.getAllLobbies()
        .then(function(lobbies) {
          $scope.lobbies = lobbies
        })
      })

    })
  }

  $scope.joinGame = function(something){
    console.log(something)
  }
})
