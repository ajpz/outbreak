app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller : function($scope, $rootScope, GameFactory) {
          $scope.counter = 0;

          $rootScope.$on("initialStateAvailable", function(event, payload){
            $scope.counter = payload.infectionLevelIndex;
            $scope.user = payload.currentUser;
            console.log("on in the initialStateAvailable");
            console.log($scope.user);
          });

          $scope.updateCounter = function() {
            if (localStorage.getItem("user")=== $scope.user){
              $scope.counter++;
              console.log("here i am");
              $rootScope.$broadcast("counter", { infectionLevelIndex : $scope.counter });
            }
          }

          $rootScope.$on("counterSaved", function(event, payload) {
            $scope.user = payload.currentUser;
            $scope.payload = payload;
            $scope.counter = payload.infectionLevelIndex;
            console.log("in counter saved");
            console.log(payload);
          });



        }
    });
});
