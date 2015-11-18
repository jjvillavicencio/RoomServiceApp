// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home',{
    url: '/home',
    views: {
      home:{
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })
  .state('inf',{
    url: '/inf',
    views:{
      inf:{
        templateUrl: 'templates/information.html',
        controller: 'infCtrl'
      }
    }
  })
  .state('roomService',{
    url: '/roomService',
    views: {
      roomService:{
        templateUrl: 'templates/roomservice.html',
        controller: 'roomservCtrl'
      }
    }
  })

  $urlRouterProvider.otherwise('/home');
})

.controller('homeCtrl',['$scope', '$location', function ($scope, $location) {
  $scope.toInf = function(){
        $location.url("/inf");
    }
}])

.controller('infCtrl', ['$scope', '$firebaseArray','$location',  function ($scope, $firebaseArray, $location) {

  //---Recupero array de promociones
  var misPromociones = new Firebase('https://redesutpl.firebaseio.com/promociones');
  $scope.promociones = $firebaseArray(misPromociones);
  console.log($scope.productos);
  //---

  $scope.toHome = function(){
        $location.url("/home");
    };
    $scope.toRoom = function(){
          $location.url("/roomService");
      };

}])

.controller('roomservCtrl', ['$scope', '$firebaseArray', function ($scope, $firebaseArray) {

  //---Recupero array de productos
  var misProductos = new Firebase('https://redesutpl.firebaseio.com/productos');
  $scope.productos = $firebaseArray(misProductos);
  console.log($scope.productos);
  //---



  $scope.lista = true;
  $scope.error = false;

  $scope.probarCod = function (val) {
    if (val == '123') {
      $scope.lista = true;
      $scope.error = false;
    }else{
      $scope.error = true;
    }

  };


}]);
