starter.controller('registroCtrl', function ($scope, Auth, $firebaseArray, $location, $state, $localStorage, $ionicPopup) {
    $scope.prueba= function (){
        firebase.database().ref('clientes').orderByKey()
            .equalTo('1104892367')
            .on("child_added", function(snapshot) {
                console.log(snapshot.key);
                console.log(snapshot.val());
                
            });
    };
    
    $scope.crearUsuario = function(ci, email, password, repassword){
        bandera = false;
        if(ci == null || email == null || password == null || repassword == null){
            $scope.errores = "Todos los campos son obligatorios";
        }else{
            firebase.database().ref('clientes').orderByKey()
            .equalTo(""+ci)
            .on("child_added", function(snapshot) {
                bandera = true;
                console.log(snapshot);
                console.log('aquis');

                if(snapshot){
                    console.log("aqui");
                }else{
                    console.log("e")
                }
                if(snapshot.val().uid == null){
                    if (password == repassword) {
                        $scope.mensaje = null;
                        $scope.error = null;
                        Auth.$createUserWithEmailAndPassword(email, password)
                        .then(function(firebaseUser){
                            $localStorage["user"] = firebaseUser;
                            var ref = firebase.database().ref().child('clientes');
                            var clientes = $firebaseArray(ref);
                            console.log(clientes);
                            ref.child(ci).update({
                                    uid : firebaseUser.uid,
                                    nombres: snapshot.val().nombres,
                                    apellidos: snapshot.val().apellidos,
                                    email : email
                            });
                            $localStorage["user"] = snapshot.val();
                            $state.go('roomService');                             
                        }).catch(function(error){
                            $scope.error = error;
                            console.log($scope.error);
                            console.log(email);
                        });
                    } else {
                        $scope.errores = "Contraseñas no coinciden";
                    }
                }else{
                    $scope.errores = "Ya existe una cuenta para su numero de Identificación";  
                                     
                }
            });
            if (bandera == false){
                $scope.errores = "El usuario que desea registrar no esta dado de alta en el hotel"; 
            }
                   
        }
    }
});