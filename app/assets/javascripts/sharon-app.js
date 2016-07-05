/**
 * Created by Sharon on 6/29/2016.
 */

var app = angular.module("SharonChoeDotCom", [
    'ui.router',
    'ui.bootstrap',
    'templates',
    'ngAnimate',
    'ui.grid',
    'ui.grid.autoResize',
    'ui.grid.pagination'
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
        })
        .state("congressmen", {
            url: "/search_your_congressman",
            templateUrl: "partial-congressmen.html",
            controller: "CongressCtrl",
            data: {
                pageTitle: "Search Your Congressman"
            }
        })
        .state("weather", {
            url: "/weather_forecast",
            templateUrl: "partial-weather.html",
            controller: "WeatherCtrl",
            data: {
                pageTitle: ""
            }
        });
}]);

app.factory("dataService",["$http",function($http){
    return {
        getData: function (url) {
            return $http.get(url);
        }
    };
}]);

app.filter("toDateObj", function(){
    return function(inp) {
        return new Date(inp);
    };
})

app.controller("MainCtrl", ["$scope", function($scope){
    //model
    $scope.portfolioItems = [{
        id: 0,
        name: "congressmen",
        title: "Search Your Congressman",
        description: "GovTrack API",
        thumbNail: "/assets/Seal_of_the_United_States_Congress.svg"
    }, {
        id: 1,
        name: "simonsays",
        title: "Simon Says",
        description: "Angular JS Game",
        thumbNail: "/assets/simon_thumb.png"
    }, {
        id: 2,
        name: "pomodoro",
        title: "Pomodoro Clock",
        description: "Angular Productivity App",
        thumbNail: "/assets/pomo_thumb.png"
    }, {
        id: 3,
        name: "tictactoe",
        title: "Tic Tac Toe",
        description: "Angular JS Game",
        thumbNail: "/assets/tictactoe_thumb.png"
    },{
        id: 4,
        name: "weather",
        title: "Weather Forecast",
        description: "Angular JS Weather",
        thumbNail: "/assets/weather_thumb.png"
    }];
}]);