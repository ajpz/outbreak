app.controller("HomeCtrl", function($scope, AuthService, $state, LobbyFactory, loggedInUser, isLoggedIn) {
  $scope.lobbyIndex = {};

  $scope.loggedInUser = loggedInUser;
  $scope.isLoggedIn = isLoggedIn;
  
  getAllLobbies();
  function getAllLobbies(){
    if(loggedInUser){
      console.log('FROM GET ALL LOBBIES', Date.now())
      console.log($scope.loggedInUser)
      LobbyFactory.getAllLobbies()
      .then(function(lobbies) {
        $scope.lobbies = lobbies
        lobbies.forEach(function(lobby, index) {
          let sameUser;
          lobby.users.forEach(function(user){
            if(user._id === $scope.loggedInUser._id){
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
  }
  

  $scope.logout = function() {
    AuthService.logout()
      .then(function() {
        clearInterval(intervalId)
        $state.go("home")
      })
  }

  var intervalId = setInterval(function(){
    console.log('INTERVAL GET LOBBIES', Date.now())
    getAllLobbies();
  }, 2000)

  $scope.goToLogin = function() {
    clearInterval(intervalId)
    $state.go("login")
  }
  $scope.goToSignup = function() {
    clearInterval(intervalId)
    $state.go("signup")
  }


  // $scope.isLoggedIn = isLoggedIn;

  $scope.game = {
    typeOfGame: 'public'
  }
  $scope.createGame = function(game) {
    console.log("FROM CREATE GAME");
    console.log($scope.loggedInUser)
    let data = {
      title: game.title,
      type: game.typeOfGame,
      user: $scope.loggedInUser
    }
    LobbyFactory.makeALobby(data)
    .then(function(lobby) {
      
      console.log("CALLING GET LOBBIES FROM CREATEGAME")
      getAllLobbies();
      console.log("ABOUT TO GO TO WAITING AREA")
      clearInterval(intervalId)
      $state.go('lobbyWaitingArea', {id: lobby._id})
    })
  }

  $scope.joinGame = function(lobby, index) {
    let data = {
      lobby: lobby._id,
      user: $scope.loggedInUser._id
    }
    LobbyFactory.joinLobby(data)
    .then(function(updatedLobby) {
      $scope.lobbyIndex[index] = false;
      console.log("CALLING GET LOBBIES FROM JOIN GAME")
      getAllLobbies();
      clearInterval(intervalId)
      $state.go('lobbyWaitingArea', {id: lobby._id})
    })
  }
});
