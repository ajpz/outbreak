app.factory("LobbyFactory", function($http){
	return {
		makeALobby: function(data){
			return $http.post("/api/lobby", data)
			.then(function(lobby){
				return lobby.data
			})
		},
		getAllLobbies: function(){
			return $http.get('/api/lobby')
			.then(function(response){
				return response.data
			})
		}
	}
})