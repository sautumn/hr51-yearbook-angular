var app = angular.module('app', ['ngRoute'])
.config(function($routeProvider) {
    $routeProvider
        // route for the index page
        .when('/', {
            templateUrl : './index.html',
            controller  : 'mainController'
        })

        // route for the member page
        .when('/members', {
            templateUrl : './members.html',
            controller  : 'membersController'
        })

        // route for the stats page
        .when('/stats', {
            templateUrl : './stats.html',
            controller  : 'contactController'
        });
});


app.controller('indexController', function($scope) {
    $scope.message = 'Everyone come and see how good I look!';
});

app.controller('membersController', function($scope) {
    $scope.message = 'Look! I am an about page.';
});

app.controller('statsController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});
