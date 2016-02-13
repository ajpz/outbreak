app.factory('FindEnvironmentFactory', function($http){
	return {
		getEnvironment: function(){
			return $http.get('/api/environment')
			.then(function(response){
				return response.data;
			})
		}
	}
})