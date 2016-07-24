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

app.run(['$anchorScroll', function($anchorScroll){
    $anchorScroll.yOffset = 60; //scroll starts above this height
}])

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
            controller: "WeatherCtrl"
        })
        .state("wiki", {
            url: "/wiki",
            templateUrl: "partial-wiki.html",
            controller: "WikiCtrl",
            data: {
                pageTitle: "Wikipedia Search Engine"
            }
        })
        .state("tower", {
            url: "/tower_of_hanoi",
            templateUrl: "partial-tower.html",
            controller: "TowerCtrl",
            data: {
                pageTitle: "Tower of Hanoi"
            }
        });
}]);

app.factory("dataService",["$http",function($http){
    return {
        getData: function (url) {
            return $http.get(url);
        },
        jsonp: function(url) {
            return $http({
                method: 'JSONP',
                url: url
            });
        }
    };
}]);

app.filter("toDateObj", function(){
    return function(inp) {
        return new Date(inp);
    };
})

app.controller("MainCtrl", ["$state", "$scope", "$location", "$anchorScroll", function($state, $scope, $location, $anchorScroll){
    //model
    $scope.navbarCollapsed = true;
    
    $scope.portfolioItems = [{
        id: 0,
        name: "congressmen",
        title: "Search Your Congressman",
        description: "GovTrack API",
        thumbNail: "/assets/Seal_of_the_United_States_Congress.svg",
        techTags: ['Angular.JS','JavaScript','GovTrack API','UI Bootstrap']
    }, {
        id: 1,
        name: "simonsays",
        title: "Simon Says",
        description: "Angular JS Game",
        thumbNail: "/assets/simon_thumb.png",
        techTags: ['Angular.JS','JavaScript','HTML/CSS']
    }, {
        id: 2,
        name: "pomodoro",
        title: "Pomodoro Clock",
        description: "Angular JS Productivity App",
        thumbNail: "/assets/pomo_thumb.png",
        techTags: ['Angular.JS','JavaScript','Productivity App','HTML/CSS']
    }, {
        id: 3,
        name: "tictactoe",
        title: "Tic Tac Toe",
        description: "Angular JS Game",
        thumbNail: "/assets/tictactoe_thumb.png",
        techTags: ['Angular.JS','Algorithms','HTML/CSS']
    },{
        id: 4,
        name: "weather",
        title: "Weather Forecast",
        description: "Angular JS Weather App",
        thumbNail: "/assets/weather_thumb.png",
        techTags: ['Angular.JS','JavaScript','Yahoo! Weather API']
    }, {
        id: 5,
        name: "wiki",
        title: "Wikipedia Search Engine",
        description: "Wikipedia API",
        thumbNail: "/assets/wiki_thumb.png",
        techTags: ['Angular.JS','JavaScript','Wikipedia API','Bootstrap']
    }, {
        id: 6,
        name: "tower",
        title: "Tower of Hanoi",
        description: "Angular JS Puzzle",
        thumbNail: "/assets/tower_thumb.png",
        techTags: ['Angular.JS', 'SASS', 'Algorithms']
    }];

    $scope.scrollTo = function(id) {
        //if current state === 'main', then simply scroll to
        //else must go to 'main', then scroll
        if($state.current.name === 'main') {
            $location.hash(id);
            $anchorScroll();
        } else {
            //state.go returns a promise, must wait for successful state change before calling scroll
            $state.go('main').then(function(){
                $location.hash(id);
                $anchorScroll();
            }).catch(function(){
                alert('fail to change state.  sorry');
            });
        }
    }
}]);