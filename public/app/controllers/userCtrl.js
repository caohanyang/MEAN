// start our angular module and inject userService
angular.module('userCtrl', [])

   .controller('userListController', function($scope, popupService, $window, User){
      //get all the users
      $scope.users = User.query();

      //delete the user
      $scope.deleteUser = function(user){
         if(popupService.showPopup('Really delete this?')){
           user.$delete(function(){
              $window.location.href = ''; //redirect to home
           });
         }

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

       $scope.user.$update(function(){
          $window.location.href = ''; //redirect to home
       });
     };
     
     $scope.loadUser = function(){
        $scope.user = User.get({id:$routeParams.user_id});
     };
 
    $scope.loadUser();
   });

