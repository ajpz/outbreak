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
		},
		joinLobby: function(data){
			return $http.put('/api/lobby/'+data.lobby, data)
			.then(function(response){
				return response.data
			})
		},
		getALobby: function(id){
			return $http.get('/api/lobby/'+id)
			.then(function(response){
				return response.data;
			})
		}
	}
})