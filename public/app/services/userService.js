angular.module('userService', [])
   .factory('User',function($resource){
      return $resource('/api/users/:id', {id:'@_id'},{
          update: {
              method: 'PUT'
          }
      }); //Note the full endpoint address  
   }).service('popupService', function($window){
       this.showPopup = function(message){
            return $window.confirm(message);
       }
   });
