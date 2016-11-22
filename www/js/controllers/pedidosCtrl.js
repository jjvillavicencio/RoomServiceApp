starter.controller('pedidosCtrl', function ($scope, $firebaseArray, $location, $ionicPopup, $interval, $filter, $localStorage) {

    $scope.selection = {
    };
    //---Obtener codigo
    $scope.lista = false;
    $scope.error = false;
    $scope.codigo;

    var ref = firebase.database().ref("clientes").child($localStorage['userID']+'/uidspedidos');
    ref.orderByChild("estado").equalTo('activo').on("child_added", function (snapshot) {
            console.log(snapshot);
            console.log(snapshot.val());
            $scope.codigo = snapshot.val().uid;
            $scope.lista = true;
        });

    //---Consulta si es mayor la cantidad productos
    $scope.greaterThan = function (prop, val) {
        return function (item) {
            return item[prop] > val;
        }
    }

    //---Recupero array de productos
    var url = firebase.database();
    var misProductos = url.ref().child("productos");
    $scope.productos = $firebaseArray(misProductos);
    //---

    //CONEXIÓN A FIREBASE(PEDIDOS)
    var ref = url.ref().child("clientes");
    $scope.sumatoria = 0;
    $scope.toInf = function () {
        $location.url("/inf");
    };
    $scope.adds = function (producto) {
        //console.log(producto.codigoProducto);
        var codigoPr = producto.codigoProducto;
        $scope.selection[codigoPr].cantidad = 1;
        $scope.selection[codigoPr].nombrePr = producto.nombreProducto;
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
                    if (compa == sel && typeof (compa) != 'undefined') {
                        //console.log(sel);
                        //console.log($scope.sumatoria);
                        $scope.selection[compa].key = $scope.productos[producto].$id;
                        $scope.sumatoria = parseFloat($scope.sumatoria) + (parseFloat($scope.productos[producto].precio) * parseInt($scope.selection[sel].cantidad));
                        $scope.selection[compa].precioUnit = parseFloat($scope.productos[producto].precio);
                        $scope.selection[compa].disponibles = parseFloat($scope.productos[producto].disponibles);
                    }
                }

            }
        }
    };

    function callAtInterval() {
        /*$scope.lista = false;*/
        $scope.selection = {
        };
        $scope.sumatoria = 0;

    }



    
    $scope.probarCod = function () {
        
        /*var query = ref.orderByChild("codigoCliente").equalTo("" + val);
        var datos;
        var res;
        $scope.usuarios = $firebaseArray(query);

        $scope.selection = {
        };

        query.on("value", function (snapshot) {
            res = snapshot.numChildren();
            console.log(res);
        });

        if (res == 1) {
            $scope.lista = true;
            $interval(callAtInterval, 300000);
        } else {
            $scope.lista = false;
            if (typeof (compa) != 'undefined' && res === 0) {
                popPup("Codigo Incorrecto", "Revise su código de acceso");
            }
        }

        try {
            query.on("value", function (snapshot) {
                snapshot.forEach(function (data) {
                    data.val();
                    datos = data;
                });
            });
            console.log(datos.val());
        } catch (e) {
            console.log("este:error" + e);
            // An alert dialog
            popPup("Error", "Por favor, intente de nuevo.");
        }*/
    };
    //FUNCIÓN PARA AGREGAR PEDIDO


    $scope.agregarPedido = function () {
        console.log("aqui:"+$scope.codigo);
        var misPedidos = url.ref().child("pedidos/"+$scope.codigo);
        var cont = 0;
        var date = new Date();
        var fecha = $filter('date')(new Date(), 'dd/MM/yyyy');
        var hora = $filter('date')(new Date(), 'HH:mm');
        /*var nombre = $scope.usuarios[0].nombreCliente;
        var apellido = $scope.usuarios[0].apellidoCliente;
        var habitacion = $scope.usuarios[0].habitacionCliente;*/
        var canPedidos = contar();
        for (var sel in $scope.selection) {
            console.log(sel);
            console.log($scope.selection[sel].compra);
            var cons = $scope.selection[sel].compra;
            if (cons) {
                cont = cont + 1;
                console.log(cont);
                var nombrePr = $scope.selection[sel].nombrePr;
                var cantidadPr = $scope.selection[sel].cantidad;
                var precioUnit = $scope.selection[sel].precioUnit;
                var disponibles = $scope.selection[sel].disponibles;
                var key = $scope.selection[sel].key;
                try {
                    misPedidos.push({
                        fechaPedido: fecha,
                        horaPedido: hora,
                        /*nombreCliente: nombre,
                        apellidoCliente: apellido,
                        habitacionCliente: habitacion,*/
                        productosPedidos: "" + cont + "/" + canPedidos,
                        codigoProducto: sel,
                        nombreProducto: nombrePr,
                        cantidad: cantidadPr,
                        subTotal: cantidadPr * precioUnit,
                        total: $scope.sumatoria
                    });
                    misProductos.child(key).update({
                        "disponibles": parseFloat(disponibles) - parseFloat(cantidadPr)
                    });
                } catch (e) {
                    popPup("ERROR", "Pedido no realizad");
                }
            }
        }
        popPup("Éxito", "Pedido realizado con éxito.");
        callAtInterval();

    };

    function contar() {
        var contador = 0;
        for (var sel in $scope.selection) {
            var cons = $scope.selection[sel].compra;
            if (cons) {
                contador = parseFloat(contador) + 1;
            }
        }
        return contador;
    }

    function popPup(titulo, contenido) {
        $ionicPopup.alert({
            title: titulo,
            template: contenido
        });
    }
});