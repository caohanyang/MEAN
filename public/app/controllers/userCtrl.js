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
      $scope.old = User.get({id:$routeParams.user_id}, function(){
      $scope.old = JSON.stringify($scope.old, null, "  ");
      // copy the previous data
      $scope.new = angular.copy($scope.old);
    });
     $scope.updateUser = function(){

      $scope.old = JSON.parse($scope.old);
      $scope.new = JSON.parse($scope.new);
      //use the jsondiffpacth to get a patch
      var delta = jsondiffpatch.diff($scope.old, $scope.new);
      console.log(delta);

      //send the delta data
      User.update({id: $routeParams.user_id}, delta);
    };

 });

