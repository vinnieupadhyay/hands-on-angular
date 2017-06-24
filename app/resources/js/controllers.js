myApp = angular.module('myApp', []);

myApp.controller('myController', function($scope, $http) {

    $http.get('resources/js/data.json').then(function(response) {
        $scope.artists = response.data;
        console.log($scope.artists);
    });

});
