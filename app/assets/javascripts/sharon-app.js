/**
 * Created by Sharon on 6/29/2016.
 */

var app = angular.module("SharonChoeDotCom", [
    'ui.router',
    'ui.bootstrap',
    'templates',
    'ngAnimate'
]);

app.run(["$rootScope", "$state", "$stateParams", function($rootScope, $state, $stateParams){
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}]);

app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
    //default route
    $urlRouterProvider.otherwise("/");

    //routes
    $stateProvider.state("main", {
        url: "/",
        templateUrl: "partial-home.html",
        //controller: 'MainCtrl'
    })
        .state("simonsays", {
            url: "/simon_says",
            templateUrl: "partial-simon.html",
            controller: "SimonCtrl",
            data: {
                pageTitle: "Simon Says"
            }
        })
        .state("tictactoe", {
            url: "/tic_tac_toe",
            templateUrl: "partial-tictactoe.html",
            controller: "TicTacToeCtrl",
            data: {
                pageTitle: "Tic Tac Toe"
            }
        })
        .state("pomodoro", {
            url: "/pomodoro_clock",
            templateUrl: "partial-pomodoro.html",
            controller: "PomoCtrl",
            data: {
                pageTitle: "Pomodoro Clock"
            }
        });
}]);

app.controller("MainCtrl", ["$scope", function($scope){
    //model
    $scope.portfolioItems = [{
        id: 0,
        name: "simonsays",
        title: "Simon Says",
        description: "Angular JS Game",
        thumbNail: "/assets/simon_thumb.png"
    }, {
        id: 1,
        name: "tictactoe",
        title: "Tic Tac Toe",
        description: "Angular JS Game",
        thumbNail: "/assets/tictactoe_thumb.png"
    }, {
        id: 2,
        name: "pomodoro",
        title: "Pomodoro Clock",
        description: "Angular App",
        thumbNail: "/assets/pomo_thumb.png"
    }];
}]);