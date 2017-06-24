myApp = angular.module('myApp', []);

myApp.controller('myController', function myController($scope) {

    $scope.author = {
        'name'    : 'Vineet Upadhyay',
        'title'   : 'Developer',
        'subject' : 'AngularJs'
    };

});
