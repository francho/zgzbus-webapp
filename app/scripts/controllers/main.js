'use strict';

angular.module('zgzbus')
    .controller('MainCtrl', function ($scope, BusTimesGetter) {
        $scope.busInfo = {
            busStop: 0,
            title: '',
            frequencies: [],
            error: null
        };

        $scope.getBusTimeTable = function () {
            BusTimesGetter.callWebService($scope.busInfo.busStop).then(function (data) {
                angular.copy(data, $scope.busInfo);
            });
        };
    });
