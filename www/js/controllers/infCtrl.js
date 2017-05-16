starter.controller('infCtrl', function ($scope, $firebaseArray, $firebaseAuth, $location, $cordovaSocialSharing) {

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
    $scope.compTwitter = function(message, image){
        $cordovaSocialSharing
        .shareViaTwitter(message, image)
        .then(function(result) {
        // Success!
        }, function(err) {
        // An error occurred. Show a message to the user
        });
    };

    $scope.compWhats = function(message, image){
        $cordovaSocialSharing
        .shareViaWhatsApp(message, image)
        .then(function(result) {
        // Success!
        }, function(err) {
        // An error occurred. Show a message to the user
        });
    };
    $scope.compFb = function(message, image){
        $cordovaSocialSharing
        .shareViaFacebook(message, image)
        .then(function(result) {
        // Success!
        }, function(err) {
        // An error occurred. Show a message to the user
        });
    };
});