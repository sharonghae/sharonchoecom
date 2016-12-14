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
        name: null,
        title: "Pioneers of Mars",
        description: "Web-based Multi-player Game",
        thumbNail: "/assets/pioneers.png",
        techTags: ['React-Redux', 'Firebase', 'Material-UI', 'Node.JS'],
        url: 'https://capstonegame-24bce.firebaseapp.com/'
    },{
        id: 1,
        name: null,
        title: "Advanced Word Counter",
        description: "Word Search Web App",
        thumbNail: "/assets/word.png",
        techTags: ['D3.JS', 'Express.JS', 'Foundation'],
        url: 'http://werdcount.herokuapp.com/'
    },{
        id: 2,
        name: null,
        title: "Carefull",
        description: "E-commerce site",
        thumbNail: "/assets/carefull.png",
        techTags: ['React-Redux', 'PostgreSQL', 'Express.JS', 'Node.JS'],
        url: 'https://stormy-forest-41556.herokuapp.com/products'
    },{
        id: 3,
        name: null,
        title: "Elite Nails",
        description: "Nail Salon Website",
        thumbNail: "/assets/elitenails_thumb.png",
        techTags: ['Node.JS', 'jQuery', 'reCAPTCHA', 'nodemailer'],
        url: 'http://www.elitenailsaledo.com/'
    }, {
        id: 4,
        name: "congressmen",
        title: "Search Your Congressman",
        description: "GovTrack API",
        thumbNail: "/assets/Seal_of_the_United_States_Congress.svg",
        techTags: ['Angular.JS','JavaScript','GovTrack API','UI Bootstrap'],
        url: null
    }, {
        id: 5,
        name: "simonsays",
        title: "Simon Says",
        description: "Angular JS Game",
        thumbNail: "/assets/simon_thumb.png",
        techTags: ['Angular.JS','JavaScript','HTML/CSS'],
        url: null
    }, {
        id: 6,
        name: "pomodoro",
        title: "Pomodoro Clock",
        description: "Angular JS Productivity App",
        thumbNail: "/assets/pomo_thumb.png",
        techTags: ['Angular.JS','JavaScript','Productivity App','HTML/CSS'],
        url: null
    }, {
        id: 7,
        name: "tictactoe",
        title: "Tic Tac Toe",
        description: "Angular JS Game",
        thumbNail: "/assets/tictactoe_thumb.png",
        techTags: ['Angular.JS','Algorithms','HTML/CSS'],
        url: null
    },{
        id: 8,
        name: "weather",
        title: "Weather Forecast",
        description: "Angular JS Weather App",
        thumbNail: "/assets/weather_thumb.png",
        techTags: ['Angular.JS','JavaScript','Yahoo! Weather API'],
        url: null
    }, {
        id: 9,
        name: "wiki",
        title: "Wikipedia Search Engine",
        description: "Wikipedia API",
        thumbNail: "/assets/wiki_thumb.png",
        techTags: ['Angular.JS','JavaScript','Wikipedia API','Bootstrap'],
        url: null
    }, {
        id: 10,
        name: "tower",
        title: "Tower of Hanoi",
        description: "Angular JS Puzzle",
        thumbNail: "/assets/tower_thumb.png",
        techTags: ['Angular.JS', 'SASS', 'Algorithms'],
        url: null
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