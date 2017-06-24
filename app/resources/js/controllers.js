myApp = angular.module('myApp', []);

// Setup the filter
myApp.filter('unique', function() {

    return function (items, targetFields) {

        var newItems = [];
        var sameValue = function (item) {
            return item[targetFields];
        };

        angular.forEach(items, function (item) {
          var isDuplicate = false;

          for (var i = 0; i < newItems.length; i++) {
            if (angular.equals(sameValue(newItems[i]), sameValue(item))) {
              isDuplicate = true;
              break;
            }
          }
          if (!isDuplicate) {
            newItems.push(item);
          }

        });
        items = newItems;
      return items;
    };


    //Code didn't work due to error: property 'length' of undefined
    // return function(items, fields) {
    //     var tempObj = {},
    //         result = [];
    //
    //     for(i=0; i< items.length; i++) {
    //         tempObj[items[i][fields]] = items[i];
    //     }
    //
    //     for(key in tempObj) {
    //       final.push(tempObj[key]);
    //     }
    //
    //     return result;
    // };

});

myApp.controller('myController', function($scope, $http) {

    $http.get('resources/js/data.json').then(function(response) {
        $scope.artists = response.data;
    });

});
