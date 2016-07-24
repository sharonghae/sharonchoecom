/**
 * Created by Sharon on 7/23/2016.
 */

app.controller("TowerCtrl", ["$scope", function($scope) {
    $scope.totalDisks = 3; //total number of disks in play
    $scope.rod1 = [];
    $scope.rod2 = [];
    $scope.rod3 = [];
    $scope.selectedRod = null;
    $scope.selectedDisk = null;
    $scope.moves = 0;
    $scope.minMoves;
    $scope.isWinner = false;

    //initilize values of rod start of game
    function init() {
        $scope.rod1 = [];
        $scope.rod2 = [];
        $scope.rod3 = [];
        $scope.selectedRod = null;
        $scope.selectedDisk = null;
        $scope.moves = 0;
        $scope.isWinner = false;

        //place disks in the first rod based on total disks
        for (var i = 1; i <= $scope.totalDisks; i++) {
            $scope.rod1.push(i);
        }
        $scope.minMoves = Math.pow(2, $scope.totalDisks) - 1;
    }

    init();

    $scope.addDisk = function() {
        if ($scope.totalDisks < 8) {
            $scope.totalDisks++;
            init();
        }
    }

    $scope.minusDisk = function() {
        if ($scope.totalDisks > 3) {
            $scope.totalDisks--;
            init();
        }
    }

    //1. if hand is empty & rod is empty
    //2. hand is empty & rod is not empty --- pickup
    //3. hand is not empty & rod is empty --- drop
    //4. hand is not empty & rod is not empty - drop
    $scope.pickRod = function(rod, id) {
        if ($scope.selectedDisk === null && rod.length === 0) {
            //case 1
            return;
        } else if ($scope.selectedDisk === null && rod.length > 0) { //case 2
            $scope.selectedRod = id;
            $scope.selectedDisk = rod.shift();
        } else if ($scope.selectedDisk > 0 && (rod.length == 0 || rod[0] > $scope.selectedDisk)) {
            //case 3 and case 4
            rod.unshift($scope.selectedDisk);
            $scope.selectedDisk = null;
            $scope.selectedRod = null;
            $scope.moves++;
        }
    }

    $scope.restartGame = function() {
        init();
    }

    //watch checks for variable change 
    $scope.$watch('rod3', function() {
        if ($scope.rod3.length === $scope.totalDisks)
            $scope.isWinner = true;
    }, true); //if true is not set, watch will not test for value changes just reference. by passing in true, you are watching for changes in value
}]);