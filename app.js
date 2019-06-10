// initialize the app
var myapp = angular.module('app', ['ngMaterial']);

// set the configuration
myapp.run(['$rootScope', function($rootScope){
  // the following data is fetched from the JavaScript variables created by wp_localize_script(), and stored in the Angular rootScope
  $rootScope.dir = BlogInfo.url;
  $rootScope.site = BlogInfo.site;
  $rootScope.api = AppAPI.url;
}]);

// add a controller
myapp.controller('mycontroller', ['$scope', '$http', function($scope, $http) {
  // load posts from the WordPress API
  $http({
    method: 'GET',
    url: $scope.api, // derived from the rootScope
    params: {
      json: 'get_posts'
    }
  }).
  success(function(data, status, headers, config) {
    $scope.postdata = data.posts;
  }).
  error(function(data, status, headers, config) {
  });
}]);