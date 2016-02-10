app.controller("HomeCtrl", function($scope, AuthService, $state, LobbyFactory, loggedInUser) {
  $scope.lobbyIndex = {};

  $scope.loggedInUser = loggedInUser
  
  getAllLobbies();
  function getAllLobbies(){
    LobbyFactory.getAllLobbies()
    .then(function(lobbies) {
      $scope.lobbies = lobbies
      lobbies.forEach(function(lobby, index) {
        let sameUser;
        lobby.users.forEach(function(user){
          if(user._id === loggedInUser._id){
            sameUser = true;
          }
        })
        if (sameUser) {
          $scope.lobbyIndex[index] = false;
        } else {
          $scope.lobbyIndex[index] = true;
        }
      })

    })
  }
  

  $scope.logout = function() {
    AuthService.logout()
      .then(function() {
        $state.go("home")
      })
  }

  setInterval(function(){
    console.log('getting lobbies')
    getAllLobbies();
  }, 2000)

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
    let data = {
      title: game.title,
      type: game.typeOfGame,
      user: loggedInUser
    }
    LobbyFactory.makeALobby(data)
    .then(function(lobby) {
      getAllLobbies();
      $state.go('lobbyWaitingArea', {id: lobby._id})
    })
  }

  $scope.joinGame = function(lobby, index) {
    let data = {
      lobby: lobby._id,
      user: loggedInUser._id
    }
    LobbyFactory.joinLobby(data)
    .then(function(updatedLobby) {
      $scope.lobbyIndex[index] = false;
      getAllLobbies();
      $state.go('lobbyWaitingArea', {id: lobby._id})
    })
  }
});
