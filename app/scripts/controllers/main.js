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


        function setProgressOn() {
            $scope.inProgress = true;
        }

        function setProgressOff() {
            $scope.inProgress = false;

        }
    });
