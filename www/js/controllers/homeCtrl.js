starter.controller('homeCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.toInf = function () {
        $location.url("/inf");
    };
}]);