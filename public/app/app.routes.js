angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider){

   $routeProvider

     //home page route
     .when('/', {
        templateUrl : 'public/app/views/pages/users/all.html',
        controller  : 'userListController'
     })
         
     // show all users
     .when('/users', {
        templateUrl : 'public/app/views/pages/users/all.html',
        controller  : 'userListController'
     })

     //form to create a new user
     .when('/users/create',{
        templateUrl : 'public/app/views/pages/users/create.html',
        controller  : 'userCreateController'
     })

     //page to edit a user
     .when('/users/:user_id', {
        templateUrl: 'public/app/views/pages/users/edit.html',
        controller : 'userEditController'
     });
    //get rid of the hashtag in the URL
    $locationProvider.html5Mode(true);

});
