starter.controller('infCtrl', ['$scope', '$firebaseArray', '$location', function ($scope, $firebaseArray, $location) {

    //---Recupero array de promociones
    var misPromociones = new Firebase('https://redesutpl.firebaseio.com/promociones');
    $scope.promociones = $firebaseArray(misPromociones);
    //---

    $scope.toHome = function () {
        $location.url("/home");
    };
    $scope.toRoom = function () {
        $location.url("/roomService");
    };

}]);