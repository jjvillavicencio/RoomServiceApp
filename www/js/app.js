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
  });

  $urlRouterProvider.otherwise('/home');
})

.controller('homeCtrl',['$scope', '$location', function ($scope, $location) {
  $scope.toInf = function(){
    $location.url("/inf");
  };
}])

.controller('infCtrl', ['$scope', '$firebaseArray','$location',  function ($scope, $firebaseArray, $location) {

  //---Recupero array de promociones
  var misPromociones = new Firebase('https://redesutpl.firebaseio.com/promociones');
  $scope.promociones = $firebaseArray(misPromociones);
  //---

  $scope.toHome = function(){
    $location.url("/home");
  };
  $scope.toRoom = function(){
    $location.url("/roomService");
  };

}])

.controller('roomservCtrl', ['$scope', '$firebaseArray', '$location','$ionicPopup', function ($scope, $firebaseArray, $location, $ionicPopup) {

  $scope.selection = {
  };


  //---Recupero array de productos
  var url = new Firebase('https://redesutpl.firebaseio.com');
  var misProductos = url.child("productos");
  $scope.productos = $firebaseArray(misProductos);
  //---
  var ref = url.child("clientes");
  $scope.sumatoria = 0;
  $scope.toInf = function(){
    $location.url("/inf");
  };
  $scope.adds = function (producto) {
    //console.log(producto.codigoProducto);
    var codigoPr = producto.codigoProducto;
    $scope.selection[codigoPr].cantidad = 1;
    $scope.suma();
  };


  $scope.suma = function () {
    $scope.sumatoria = 0;
    for (var sel in $scope.selection) {
      var cons = $scope.selection[sel].compra;
      if (cons) {

        for (var producto in $scope.productos) {
          var compa = $scope.productos[producto].codigoProducto;
          //console.log(compa);
          //console.log(sel);
          if (compa == sel && typeof(compa)!='undefined') {
            //console.log(sel);
            //console.log($scope.sumatoria);
            //console.log($scope.productos[producto].precio);
            $scope.sumatoria = parseFloat($scope.sumatoria) + (parseFloat($scope.productos[producto].precio) * parseInt($scope.selection[sel].cantidad));

          }
        }

      }
    }
  };

  $scope.lista = false;
  $scope.error = false;

  $scope.probarCod = function (val) {
    var query = ref.orderByChild("codigoCliente").equalTo(""+val);
    var datos;
    var res;
    $scope.usuarios = $firebaseArray(query);

    query.on("value", function(snapshot) {
      res = snapshot.numChildren();
      console.log(res);
    });

    if (res==1) {
      $scope.lista = true;
      $scope.error = false;
    }else{
      $scope.lista = false;
      $scope.error = true;
    }

    try{
      query.on("value", function(snapshot) {
        snapshot.forEach(function (data) {
          data.val();
          datos = data;
        });
      });
      console.log(datos.val());
    }catch(e){
      console.log("este:error"+e);
      // An alert dialog
      $ionicPopup.alert({
        title: 'Error',
        template: 'Por favor, intente de nuevo.'
      });
    }
  };

}]);
