starter.controller('logginCtrl', function($scope, $rootScope, $state, $localStorage){
    $scope.datos = {
        correo: '',
        contra: ''
    }
    
    $scope.loggin = function(){
        console.log($scope.datos);
        
        
        firebase.auth().signInWithEmailAndPassword($scope.datos.correo, $scope.datos.contra)
        .then(function(firebaseUser){
            console.log("User ID: " + firebaseUser.uid + ", Provider: " + firebaseUser.provider);
            var db = firebase.database();
            var ref = db.ref("clientes");

            ref.orderByChild("uid")
            .equalTo(firebaseUser.uid)
            .on("child_added", function(snapshot) {
                console.log(snapshot.key);
                console.log(snapshot.val());
                $localStorage["user"] = snapshot.val();
                $state.go('roomService'); 
            });
            $scope.$apply();
            
        })        
        .catch(function(error) {
            console.log("Error authenticating user:", error);
        });
    };
});