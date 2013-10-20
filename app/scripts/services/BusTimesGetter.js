'use strict';

angular.module('zgzbus')
    .service('BusTimesGetter', function BusTimesGetter($http, $q) {
        var currentQuery = null;

        function callWebService(busStopNumber) {
           // var url = 'http://www.dndzgz.com/point';

            var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20' +
                'url%3D%22http%3A%2F%2Fwww.dndzgz.com%2Fpoint%3Fid%3D'+busStopNumber+'%26service%3Dbus%22%20' +
                '&format=json&callback='

            if (currentQuery) {
                console.log("cancel prev");
                currentQuery.resolve();
            }
            currentQuery = $q.defer();
            return $http({
                    method: "GET",
                    headers: {
                        'Accept': 'application/json'
                    },
                    url: url,
                   // params: { service: 'bus', id: busStopNumber },
                    timeout: currentQuery.promise
                }


        ).
                then(function (response) {
                    currentQuery = null;
                    return response.data;
                });
        };

        return {
            'callWebService': callWebService
        };
    });
