
angular.module('app', [])
   .controller('app', function($scope, $http) {
       $scope.data = '';
       $scope.greeting = "Hello World";
       $scope.bool = true;
       $scope.follow = [];

       $scope.clicked = function(data){
         console.log(data);
       }

       $http({
          method: 'GET',
          url: '/allusers'
        }).then(function successCallback(response) {
            $scope.data = response;
            // console.log($scope.data);
          }, function errorCallback(response) {
             console.log('Error retrieving data from /allusers');
          });


          $scope.stats = function(){
            console.log($scope.bool);
            return $scope.bool = !$scope.bool;
          }

          $scope.followers = function(){
            var array = []
            var x = _.sortBy($scope.data.data, function(items) { return -items.followers; });
            for (var i = 0; i < 8; i++) {
              array.push(x[i]);
            }
            $scope.follow = array;
          }


});
