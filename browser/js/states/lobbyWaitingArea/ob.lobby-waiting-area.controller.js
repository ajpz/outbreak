app.controller("LobbyWaitingAreaCtrl", function($scope, AuthService, $state, LobbyFactory, loggedInUser, lobby) {
	$scope.loggedInUser = loggedInUser;
	$scope.lobby = lobby;
	$scope.playerCount = lobby.users.length;
	setInterval(function(){
		LobbyFactory.getALobby(lobby._id)
		.then(function(updatedLobby){
			$scope.lobby = updatedLobby
			$scope.playerCount = updatedLobby.users.length;
			if($scope.playerCount === 4){
				$state.go('game', {id: lobby._id})
			}
		})
	},2000)
});