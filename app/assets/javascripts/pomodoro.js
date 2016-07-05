/**
 * Created by Sharon on 6/29/2016.
 */

app.controller("PomoCtrl",["$scope","$interval", function($scope, $interval){
    //this variable is to hold a task to be used in displaying a list of tasks later
    $scope.task = {};
    $scope.task.name = "";
    $scope.listOfTasks = [];

    $scope.sessionTimer = 1500;
    $scope.breakTimer = 300;
    $scope.customSessionTimer = 1500;
    $scope.customBreakTimer = 300;

    var promise = null;
    var breakLength = null;
    $scope.startClicked = false;
    $scope.timerStarted = false;

    $scope.Math = Math;

    var audio = new Audio('/assets/beep.mp3');

    $scope.startSession = function() {
        $scope.startClicked = true;
        $scope.timerStarted = true;
        promise = $interval(function() {
            $scope.sessionTimer--;
            if ($scope.sessionTimer === 0) {
                audio.play();
                $interval.cancel(promise);
                $scope.sessionTimer = $scope.customSessionTimer;
                $scope.startBreak();
            }
        }, 1000);
    }

    $scope.startBreak = function() {
        $scope.startClicked = true;
        $scope.timerStarted = true;
        breakLength = $interval(function() {
            $scope.breakTimer--;
            if ($scope.breakTimer === 0) {
                audio.play();
                $interval.cancel(breakLength);
                $scope.breakTimer = $scope.customBreakTimer;
                $scope.startSession();
            }
        }, 1000);
    }

    $scope.stop = function() {
        //audio.pause();
        $interval.cancel(promise);
        $interval.cancel(breakLength);
        $scope.startClicked = false;
    }

    $scope.reset = function() {
        $scope.stop();
        $scope.sessionTimer = $scope.customSessionTimer;
        $scope.breakTimer = $scope.customBreakTimer;
        $scope.timerStarted = false;
    }

    $scope.addPomo = function() {
        $scope.sessionTimer += 60;
        $scope.customSessionTimer = $scope.sessionTimer;
    }

    $scope.minusPomo = function() {
        if ($scope.sessionTimer < 61 || $scope.customSessionTimer < 61)
            return;

        $scope.sessionTimer -= 60;
        $scope.customSessionTimer = $scope.sessionTimer;
    }

    $scope.addBreak = function() {
        $scope.breakTimer += 60;
        $scope.customBreakTimer = $scope.breakTimer;
    }

    $scope.minusBreak = function() {
        if ($scope.breakTimer < 61)
            return;

        $scope.breakTimer -= 60;
        $scope.customBreakTimer = $scope.breakTimer;
    }

    //push task object into array of tasks
    $scope.submitTask = function(task) {
        var aTask = {};
        aTask.name = task.name;
        $scope.listOfTasks.push(aTask);
        $scope.task.name = "";
    }

}]);

app.filter('numberFixedLen', function() {
    return function(n, len) {
        var num = parseInt(n, 10);
        len = parseInt(len, 10);
        if (isNaN(num) || isNaN(len)) {
            return n;
        }
        num = '' + num;
        while (num.length < len) {
            num = '0' + num;
        }
        return num;
    };
});