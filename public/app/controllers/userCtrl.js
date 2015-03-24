//var jsondiffpatch = require('jsondiffpatch').create();

// start our angular module and inject userService
angular.module('userCtrl', [])

   .controller('userListController', function($scope, $window, User){
      //get all the users
      $scope.users = User.query();

      //delete the user
      $scope.deleteUser = function(user){
        
          user.$delete(function(){
              // $window.location.href = ''; //redirect to home         
           });
          
          $window.location.reload();
      };
   
   })
  

  // a controller to control the creater page
   .controller('userCreateController', function($scope, $window, User) {
  
     $scope.user = new User(); //this object now has a $save() method
     $scope.addUser = function(){
       $scope.user.$save(function(){
          $window.location.href = ''; //redirect to home
       });
     };

   })

   //a new controller used to edit the user data
   .controller('userEditController', function($scope, $routeParams, $window, User) {

     $scope.updateUser = function(){
    
      //get the old value
      var dataOld = JSON.parse(JSON.stringify($scope.old));
      //get the new value
      var dataNew = JSON.parse(JSON.stringify($scope.user));    

      //use the jsondiffpathc to get a patch
      var delta = jsondiffpatch.diff(dataOld, dataNew);
      console.log(delta);

      //send the delta data
      User.update({id: $routeParams.user_id}, delta);   

      $window.location.href = ''; //redirect to home 
    };

     
     $scope.loadUser = function(){

        $scope.user = User.get({id:$routeParams.user_id}, function(){

           // copy the previous data
          $scope.old = angular.copy($scope.user);
        });
      
     };

    $scope.loadUser();

 });

