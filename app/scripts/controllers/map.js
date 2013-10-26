'use strict';

angular.module('zgzbus')
    .controller('MapCtrl', function ($scope, BusStopsGetter) {
        $scope.mapPoints={};
        $scope.inProgress=false;


        $scope.getMapPoints = function () {
            setProgressOn();

            BusStopsGetter.callWebService()
                .then(function (data) {
                    angular.copy(data, $scope.mapPoints);
                    setProgressOff();
                });
        };

        function setProgressOn() {
            $scope.inProgress = true;
        }

        function setProgressOff() {
            $scope.inProgress = false;

        }

        $scope.getMapPoints();
    });
