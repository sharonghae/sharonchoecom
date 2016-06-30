/**
 * Created by Sharon on 6/29/2016.
 */
app.controller("SimonCtrl", ["$scope", "$timeout", function($scope, $timeout){
    var simonSays = [], //keep an array of simon prompts
        copy = [], //comparing user response to simon
        counter = 0, //for looping through simon says array
        innerTimeoutSecs = 500, //how long to stay 'lit up'
        outerTimeoutSecs = 200, //how long to call the next simon
        simonTurn = false, //if simon is playing, player cannot interrupt
        currentResponse = true; //used to compare response to simon

    //public scope variables
    $scope.count = 0; //count the number of rounds
    $scope.isStrict = false; //strict mode on or off
    $scope.isSimonOn = false;

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

    //there are three position situations
    //1. user click the wrong pad --> call animate again (last round)
    //2. user click the right pad but sequence is not yet finished --> do nothing
    //3. user click the right pad AND at the end of sequence --> start new round
    function checkResponse() {
        if(!currentResponse) {
            //case 1
            var buzzer = document.getElementById("buzzer");
            buzzer.play();

            if($scope.isStrict) {
                //strict mode restarts the game
                $timeout(function(){
                    buzzer.pause();
                    buzzer.currentTime = 0;
                    restart();
                }, 1000);
                return;
            }

            $timeout(function () {
                buzzer.pause();
                buzzer.currentTime = 0;
                copy = simonSays.slice(0);
                animateSimonSays();
            }, 1000);
        } else if(currentResponse && copy.length === 0) {
            //case 3
            $timeout(newRound, 1000);
        }
    }

    $scope.registerClick = function(padId) {
        if(simonTurn) return; //click does not register during simon's turn

        var currentAudio = document.getElementById("pad" + padId + "_audio");
        currentAudio.play();

        $timeout(function () {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }, 500);

        var desiredResponse = copy.shift(); //pop out first index of array
        var actualResponse = padId;
        currentResponse = desiredResponse === actualResponse;
        checkResponse();
    }

    $scope.toggleOnOff = function() {
        $scope.isSimonOn = !$scope.isSimonOn;

        if(!$scope.isSimonOn) {
            $scope.isStrict = false;
            simonSays = [];
            copy = [];
            $scope.count = 0;
        }
    }
}]);