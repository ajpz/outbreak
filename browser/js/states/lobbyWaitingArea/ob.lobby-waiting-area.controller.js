app.controller("LobbyWaitingAreaCtrl", function($scope, AuthService, $state, LobbyFactory, loggedInUser, lobby) {
	$scope.loggedInUser = loggedInUser;
	$scope.lobby = lobby;
	$scope.numberOfPlayersInLobby = lobby.users.length;
  $scope.expectedNumberOfPlayers = lobby.playerCount;
	var intervalId = setInterval(function(){
		console.log('lobby waiting area')
		LobbyFactory.getALobby($scope.lobby._id)
		.then(function(updatedLobby){
			$scope.lobby = updatedLobby
			$scope.numberOfPlayersInLobby = updatedLobby.users.length;
			console.log('checking for players... currently at', $scope.numberOfPlayersInLobby, lobby.numberOfPlayersInLobby)
			console.log($scope.lobby)
			if($scope.numberOfPlayersInLobby === $scope.expectedNumberOfPlayers){
				clearInterval(intervalId)
				$state.go('game', {id: $scope.lobby._id})
			}
		})
	},2000)

	$scope.$on('$destroy', function(event){
		clearInterval(intervalId)
	})

});
