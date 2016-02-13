app.factory('FindEnvironmentFactory', function($http){
	return {
		getEnvironment: function(){
			return $http.get('/api/environment')
			.then(function(response){
				console.log("\n\n\n\n",response.data)
				return response.data;
			})
		}
	}
})