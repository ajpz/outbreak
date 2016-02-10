app.factory("CreateLobbyFactory", function($http){
	return {
		makeALobby: function(data){
			$http.post("/api/lobby", data)
			.then(function(lobby){
				console.log(lobby)
			})
		}
	}
})