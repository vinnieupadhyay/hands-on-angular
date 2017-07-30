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

myApp.controller('searchController', function($scope, $http) {

    var API_KEY = 'api_key=d64ab48b95bac6e1c66d6510d74474e2&',
        URL     = 'http://api.musicgraph.com/api/v2/',
        ARTIST  = 'artist/',
        ALBUM   = 'album',
        SEARCH  = 'search?',
        SUGGEST = 'suggest?',
        NAME    = '&name=',
        PREFIX  = '&prefix=',
        LIMIT   = '&limit=1';

    $scope.artistsList=false;
    $scope.artistDetails=false;

    //Search the artists
    $scope.getArtists = function(){
        if($scope.searchArtists) {
            $http.get(URL + ARTIST + SUGGEST + API_KEY + PREFIX + $scope.searchArtists).then(function(response) {
                $scope.artists = response.data;
                $scope.artistsList=true;
                $scope.artistDetails=false;
                $scope.artistsData = [];
                angular.forEach($scope.artists.data, function(name) {
                    $scope.artistsData.push(name);
                });
                // console.log(response.data);
            });
        }
    }

    //Get artists albums details
    $scope.getArtistAlbum = function(id){
        var ID= id + "/";
        $http.get(URL + ARTIST + ID + 'albums?' + API_KEY ).then(function(response) {
            $scope.artistAlbums = response.data;
            $scope.artistDetails=true;
            $scope.artistsList=false;
            $scope.artistsAlbumsData = [];
            angular.forEach($scope.artistAlbums.data, function(name) {
                $scope.artistsAlbumsData.push(name);
            });
            // console.log(response.data);
        });
    }

});
