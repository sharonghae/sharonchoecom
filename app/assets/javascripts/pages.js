/**
 * Created by Sharon on 6/16/2016.
 */

//= require angular.min
//= require ui-bootstrap-tpls-1.3.3.min

var app = angular.module("SharonChoeDotCom", [
]);

// app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
//     //default route
//     $urlRouterProvider.otherwise("/home");
//
//     //routes
//     $stateProvider.state("home", {
//         url: '/home',
//         templateUrl: 'templatehome.html'
//     })
// }]);

app.controller("MainCtrl", ["$scope", function($scope){
    $scope.hello = "hello world!";
}]);