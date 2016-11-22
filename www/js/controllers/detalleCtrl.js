starter.controller('detalleCtrl', function ($scope, $firebaseArray, $location, $ionicPopup, $interval, $filter, $localStorage) {
    $scope.$on('$ionicView.beforeEnter', function () {
        $scope.sumatoria = 0.00;
        $scope.codigo = null;
        $scope.lista=false;
    //---Recupero array de pedidos
        var ref = firebase.database().ref("clientes").child($localStorage['userID'] + '/uidspedidos');
            ref.orderByChild("estado").equalTo('activo').on("child_added", function (snapshot) {
                $scope.codigo = snapshot.val().uid;
                $scope.lista = true;
                var refPed = firebase.database().ref("pedidos").child($scope.codigo);
                $scope.misPedidos = $firebaseArray(refPed);
                $scope.misPedidos.$loaded()
                .then(function(){
                    angular.forEach($scope.misPedidos, function(pedido) {
                        $scope.sumatoria += pedido.subTotal;
                        console.log(pedido.subTotal);
                    })
                });
            });
        });
});