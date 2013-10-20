'use strict';

angular.module('zgzbus')
    .controller('MainCtrl', function ($scope, BusTimesGetter) {
        $scope.busInfo = {
            busStop: 0,
            title: '',
            frequencies: [],
            response: {}
        };

        $scope.getBusTimeTable = function () {
            BusTimesGetter.callWebService($scope.busInfo.busStop).then(function (data) {
                $scope.busInfo.response = data;
            });

        };
    });
