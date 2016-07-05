/**
 * Created by Sharon on 7/5/2016.
 */

app.controller("WikiCtrl", ["$scope", "dataService", function ($scope, dataService) {
    $scope.searchTerm = null;
    $scope.searchResults = null;

    function doSearch(searchTerm) {
        var url1 = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=";
        var fullUrl = url1 + searchTerm.trim() + "&callback=JSON_CALLBACK";

        dataService.jsonp(fullUrl).then(function (response) {
            $scope.searchResults = response.data;
        }).catch(function (response) {
            alert('fail to get wiki search');
        });
    }
    
    $scope.getSearchResults = function(searchTerm) {
        if(!searchTerm) return; //if search term is empty, do nothing
        
        doSearch(searchTerm);
    }
}]);