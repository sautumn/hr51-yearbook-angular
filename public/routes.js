// var app = angular.module('app', ['ngRoute'])
// .config(function($routeProvider) {
//     $routeProvider
//         // route for the index page
//         .when('/', {
//             templateUrl : './index.html',
//             controller  : 'mainController'
//         })
//
//         // route for the member page
//         .when('/members', {
//             templateUrl : './members.html',
//             controller  : 'membersController'
//         })
//
//         // route for the stats page
//         .when('/stats', {
//             templateUrl : './stats.html',
//             controller  : 'contactController'
//         });
// });
//
//
// app.controller('indexController', function($scope) {
//     $scope.message = 'Test';
// });
//
// app.controller('membersController', function($scope) {
//     $scope.message = 'Test.';
// });
//
// app.controller('statsController', function($scope) {
//     $scope.message = 'Test.';
// });


angular.module('app', [])
   .controller('app', function($scope, $http) {
       $scope.data = '';
       $scope.greeting = "Hello World";

       $http({
          method: 'GET',
          url: '/allusers'
        }).then(function successCallback(response) {
            $scope.data = response;
            console.log($scope.data);
          }, function errorCallback(response) {
             console.log('Error retrieving data from /allusers');
          });



});
