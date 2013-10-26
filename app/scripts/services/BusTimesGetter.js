'use strict';

angular.module('zgzbus').service('BusTimesGetter', function BusTimesGetter($http, $q) {
    var currentQuery = null;

    function callWebService(busStopNumber) {

        var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20' +
            'url%3D%22http%3A%2F%2Fwww.dndzgz.com%2Fpoint%3Fid%3D' + busStopNumber + '%26service%3Dbus%22%20' +
            '&format=json&callback=';

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
            error: null,
            title: '',
            frequencies: []
        };

        try {
            wrappedData.title = data.query.results.json.title;

            angular.forEach(data.query.results.json.items, function (item) {
                var firstLine = item.json[0];

                var matches = firstLine.match(/\S(\d+)\S\s(.*)/);

                var nextBusInfo = {
                    bus: matches[1],
                    timeToArrive: matches[2],
                    destiny: item.json[1],
                    order: 0
                };

                var parts = nextBusInfo.timeToArrive.split(' ');
                var minutes = parseInt(parts[0]);
                if(minutes===null) { minutes = 0 }

                nextBusInfo.order = minutes;


                wrappedData.frequencies.push(nextBusInfo);
            });
        } catch (e) {
            wrappedData.error = 'Error desconocido';
        }

        return wrappedData;
    }

    return {
        'callWebService': callWebService
    };
});
