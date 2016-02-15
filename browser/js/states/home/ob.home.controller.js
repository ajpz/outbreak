app.controller("HomeCtrl", function($scope, AuthService, $state, LobbyFactory, loggedInUser, environment) {
  if(environment){
    console.log = function(){
      return;
    }
  }
  $scope.lobbyIndex = {};

  $scope.loggedInUser = loggedInUser;
  $scope.isLoggedIn = !!loggedInUser;
  $scope.lobbiesJoined = [];

  getAllLobbies();
  function getAllLobbies(){
    if($scope.loggedInUser){
      console.log("LOGGED IN USER: ")
      console.log($scope.loggedInUser);
      if($scope.loggedInUser.lobbies.length){
        $scope.lobbiesJoined = $scope.loggedInUser.lobbies;
        console.log($scope.lobbiesJoined)
      }
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
    console.log('hello')
    AuthService.logout()
      .then(function() {
        $state.go('home', {}, {reload: true})
      })
  }

  var intervalId = setInterval(function(){
    console.log('INTERVAL GET LOBBIES', Date.now())
    getAllLobbies();
  }, 2000)

  $scope.$on('$destroy', function(event){
    clearInterval(intervalId)
  })

  $scope.goToLogin = function() {
    clearInterval(intervalId)
    $state.go("login")
  }
  $scope.goToSignup = function() {
    clearInterval(intervalId)
    $state.go("signup")
  }

  // $scope.isLoggedIn = isLoggedIn;

  $scope.difficulties = ['Introductory', 'Standard', 'Heroic'];

  $scope.game = {
    typeOfGame: 'public',
    difficulty: $scope.difficulties[0],
    playerCount: 2
  };

  let lobbyToGoTo;

  $scope.createGame = function(game) {
    console.log("FROM CREATE GAME", game.playerCount, typeof game.playerCount, game.difficulty);
    console.log($scope.loggedInUser)
    game.playerCount = parseInt(game.playerCount, 10)
    console.log(typeof game.playerCount)
    let data = {
      title: game.title,
      type: game.typeOfGame,
      user: $scope.loggedInUser,
      playerCount: game.playerCount,
      difficulty: game.difficulty
    }
    LobbyFactory.makeALobby(data)
    .then(function(lobby) {
      lobbyToGoTo = lobby;
      getAllLobbies();
    }).then(function(){
      console.log('\n\n\n\n\nabout to go to factory')
      return LobbyFactory.updateLoggedInUser($scope.loggedInUser._id)
    }).then(function(updatedUser){
      $scope.loggedInUser = updatedUser;
      clearInterval(intervalId)
      $state.go('lobbyWaitingArea', {id: lobbyToGoTo._id})
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
