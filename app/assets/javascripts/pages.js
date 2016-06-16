/**
 * Created by Sharon on 6/16/2016.
 */
var app = angular.module("SharonChoeDotCom", [
    'ui.bootstrap'
]);

app.controller("MainCtrl", ["$scope", function($scope){
    $scope.hello = "hello world!";
}]);