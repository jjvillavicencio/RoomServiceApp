starter.controller('infCtrl', function ($scope, $firebaseArray, $firebaseAuth, $location) {

    //---Recupero array de promociones
    var misPromociones = firebase.database().ref().child('promociones');
    console.log(misPromociones);
    $scope.promociones = $firebaseArray(misPromociones);
    //---

    $scope.toHome = function () {
        $location.url("/home");
    };
    $scope.toRoom = function () {
        $location.url("/roomService");
    };

});