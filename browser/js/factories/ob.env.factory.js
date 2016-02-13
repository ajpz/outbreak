app.factory('FindEnvironmentFactory', function($http){
	return {
		getEnvironment: function(){
			return $http.get('/api/environment')
			.then(function(response){
				console.log(response.data)
				return response.data;
			})
		}
	}
})