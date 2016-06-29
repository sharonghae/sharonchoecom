/**
 * Created by Sharon on 6/16/2016.
 */

//= require angular.min
//= require angular-animate.min
//= require angular-rails-templates
//= require_tree ../templates
//= require angular-ui-router.min
//= require ui-bootstrap-tpls-1.3.3.min

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
    }];
}]);

app.controller("SimonCtrl", ["$scope", "$timeout", function($scope, $timeout){
    var simonSays = [], //keep an array of simon prompts
        copy = [], //comparing user response to simon
        counter = 0, //for looping through simon says array
        innerTimeoutSecs = 700, //how long to stay 'lit up'
        outerTimeoutSecs = 300, //how long to call the next simon
        simonTurn = false, //if simon is playing, player cannot interrupt
        currentResponse = true; //used to compare response to simon

    //public scope variables
    $scope.count = 0; //count the number of rounds
    $scope.isStrict = false; //strict mode on or off

    $scope.startGame = function() {
        restart();
    }

    function restart() {
        simonSays = [];
        $scope.count = 0;
        newRound();
    }

    function newRound() {
        if($scope.count === 20) {
            alert("Congratulations! You win!");
            restart();
            return;
        }

        $scope.count++;
        if($scope.count % 5 === 0) { //decrease the time every 5 steps
            innerTimeoutSecs -= 100;
            outerTimeoutSecs -= 50;
        }

        simonSays.push(Math.floor(Math.random() * 4 + 1));
        copy = simonSays.slice(0); //make a deep copy of simon says array
        animateSimonSays();
    }

    function animateSimonSays() {
        simonTurn = true;

        $timeout(function () {
            var simon = simonSays[counter];
            var currentPad = document.getElementById("pad" + simon);
            var currentAudio = document.getElementById("pad" + simon + "_audio");
            angular.element(currentPad).addClass("light"); //light up the pad
            currentAudio.play(); //audio starts

            $timeout(function () {
                currentAudio.pause();
                currentAudio.currentTime = 0; //set audio back to start position
                angular.element(currentPad).removeClass("light"); //turn off the pad

                //get ready for the next simon
                counter++;
                if(counter < simonSays.length) { //recursion fail condition
                    animateSimonSays();
                } else {
                    counter = 0; //reset the counter
                    simonTurn = false //simon turn over
                }
            }, innerTimeoutSecs); //how long it stays lit
        }, outerTimeoutSecs); //how long until the next pad
    }
}]);

app.controller("TicTacToeCtrl", ["$scope", function($scope){
    $scope.hello = "hello world";
}]);