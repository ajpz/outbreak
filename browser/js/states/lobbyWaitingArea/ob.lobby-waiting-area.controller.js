app.controller("LobbyWaitingAreaCtrl", function($scope, AuthService, $state, LobbyFactory, loggedInUser, lobby) {
	$scope.loggedInUser = loggedInUser;
	$scope.lobby = lobby;
	$scope.playerCount = lobby.users.length;
	var intervalId = setInterval(function(){
		console.log('lobby waiting area')
		LobbyFactory.getALobby($scope.lobby._id)
		.then(function(updatedLobby){
			$scope.lobby = updatedLobby
			$scope.playerCount = updatedLobby.users.length;
			console.log('checking for players... currently at', $scope.playerCount)
			console.log($scope.lobby)
			if($scope.playerCount === 4){
				clearInterval(intervalId)
				$state.go('game', {id: $scope.lobby._id})
			}
		})
	},2000)
});
