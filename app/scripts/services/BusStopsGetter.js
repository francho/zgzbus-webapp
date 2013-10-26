'use strict';

angular.module('zgzbus')
  .factory('BusStopsGetter', function BusTimesGetter($http, $q) {
            var currentQuery = null;

            function callWebService(busStopNumber) {

                var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20' +
                    'url%3D%22http%3A%2F%2Fwww.dndzgz.com%2Ffetch%3Fservice%3Dbus%22' +
                    '&format=json' +
                    '&diagnostics=true' +
                    '&callback=';

                if (currentQuery) {
                    currentQuery.resolve();
                }
                currentQuery = $q.defer();

                $http.defaults.cache = false;

                return $http({
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                    url: url,
                    timeout: currentQuery.promise
                }).then(function (response) {
                        currentQuery = null;
                        return wrapResponse(response.data);
                    });
            }


            function wrapResponse(data) {
                var wrappedData = {
                    geoPoints :  [],
                    error : null
                }

                try {
                    angular.copy(data.query.results.json.json, wrappedData.geoPoints);
                } catch (e) {
                    wrappedData.error = 'Error desconocido';
                }

                console.log(wrappedData);

                return wrappedData;
            }

            return {
                'callWebService': callWebService
            };
        });
