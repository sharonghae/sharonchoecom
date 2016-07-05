/**
 * Created by Sharon on 7/4/2016.
 */

app.controller("WeatherCtrl",["$scope", "dataService", function ($scope, dataService) {
    $scope.currentCity = "New York, NY";
    $scope.forecast;
    $scope.inCelsius = false;

    function initialize(city) {
        var encodedCity = encodeURIComponent(city);
        var query = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' +
            encodedCity +'%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';

        dataService.getData(query).then(function(response){
            $scope.forecast = response.data.query.results.channel;

        }).catch(function(response){
           alert("error occurred when getting weather data");
        });
    }

    $scope.getWeather = function (city) {
        initialize(city);
    }

    initialize($scope.currentCity);
}]);