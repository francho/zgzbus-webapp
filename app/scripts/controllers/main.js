'use strict';

angular.module('zgzbus')
    .controller('MainCtrl', function ($scope, $timeout, BusTimesGetter) {
        $scope.busInfo = {
            busStop: 0,
            title: '',
            frequencies: [],
            error: null
        };

        $scope.inProgress = false;

        $scope.getBusTimeTable = function () {
            setProgressOn();

            BusTimesGetter.callWebService($scope.busInfo.busStop)
                .then(function (data) {
                    angular.copy(data, $scope.busInfo);
                    setProgressOff();
                });
        };

        $scope.getDistanceClass = function(timeToArrive) {
            var parts = timeToArrive.split(' ');

            var minutes = parts[0];

            if(minutes < 2 || minutes ==='En la parada') {
                return "distance1";
            } else if(minutes < 5) {
                return "distance2";
            } else {
                return "distance3";
            }
        };

        function setProgressOn() {
            $scope.inProgress = true;
        }

        function setProgressOff() {
            $scope.inProgress = false;

        }
    });
