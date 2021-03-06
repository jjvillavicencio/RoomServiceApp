var starter = angular.module('starter', ['ionic', 'firebase','ngCordova', 'ngStorage','angular-md5']);

starter.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

starter.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      views: {
        home: {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }
    })
    .state('inf', {
      url: '/inf',
      views: {
        inf: {
          templateUrl: 'templates/information.html',
          controller: 'infCtrl'
        }
      }
    })
    .state('roomService', {
      url: '/roomService',
      views: {
        'roomService': {
          templateUrl: 'templates/roomservice.html',
          controller: 'roomservCtrl'
        }
      }
    })
    .state('registro', {
      url: '/registro',
      views: {
        'roomService': {
          templateUrl: 'templates/registro.html',
          controller: 'registroCtrl'
        }
      }
    })
    .state('loggin', {
      url: '/loggin',
      views: {
        'roomService': {
          templateUrl: 'templates/loggin.html',
          controller: 'logginCtrl'
        }
      }
    })
    .state('pedidos', {
      url: '/pedidos',
      views: {
        'roomService': {
          templateUrl: 'templates/pedidos.html',
          controller: 'pedidosCtrl'
        }
      }
    })
    .state('detalle', {
      url: '/detalle',
      views: {
        'roomService': {
          templateUrl: 'templates/detalle.html',
          controller: 'detalleCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/home');
});