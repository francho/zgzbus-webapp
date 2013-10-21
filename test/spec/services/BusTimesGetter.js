'use strict';

describe('Service: BusTimesGetter', function () {
    var expect = chai.expect;

    var $httpBackend = null;

    var scope;
    // load the service's module
    beforeEach(module('zgzbus'));

    // mocks
    var dummyResponse = function () {
        var theResponse = { "query": { "count": 1,
            "created": "2013-10-20T08:38:16Z",
            "lang": "es-ES",
            "results": { "json": { "id": "640",
                "items": [
                    { "json": [ "[31] 10 min",
                        "Dirección PUERTO VENECIA"
                    ] },
                    { "json": [ "[31] 25 min",
                        "Dirección PUERTO VENECIA"
                    ] },
                    { "json": [ "[33] 10 min",
                        "Dirección PINARES DE VENECIA"
                    ] },
                    { "json": [ "[33] 15 min",
                        "Dirección PINARES DE VENECIA"
                    ] },
                    { "json": [ "[34] 1 min",
                        "Dirección CEMENTERIO"
                    ] },
                    { "json": [ "[34] 9 min",
                        "Dirección CEMENTERIO"
                    ] },
                    { "json": [ "[34] 46 min",
                        "Dirección PARQUE ATRACCIONES"
                    ] },
                    { "json": [ "[34] 57 min",
                        "Dirección PARQUE ATRACCIONES"
                    ] }
                ],
                "service": "bus",
                "title": "Poste 640"
            } }
        } }

        return  theResponse;
    }

    var expectedUrl = function (busStop) {
        return 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20' +
            'url%3D%22http%3A%2F%2Fwww.dndzgz.com%2Fpoint%3Fid%3D' + busStop + '%26service%3Dbus%22%20' +
            '&format=json&callback=';
    }

    var callWebService = function (busStop) {
        var response = null;

        $httpBackend.when('GET', expectedUrl(busStop)).respond(dummyResponse());
        var promise = BusTimesGetter.callWebService(busStop);

        promise.then(function (value) {
            response = value;
        });

        $httpBackend.flush();

        return response;
    }


    // instantiate service
    var BusTimesGetter;
    beforeEach(inject(function (_BusTimesGetter_, _$httpBackend_, $rootScope) {
        BusTimesGetter = _BusTimesGetter_;
        $httpBackend = _$httpBackend_;

        scope = $rootScope;
    }));


    it('should call the correct webservice', function () {
        var busStop = 385;
        var webServiceUrl = expectedUrl(busStop);

        $httpBackend.when('GET', webServiceUrl).respond(dummyResponse());
        $httpBackend.expectGET(webServiceUrl);
        BusTimesGetter.callWebService(busStop);
        $httpBackend.flush();
    });

    it('should wrap the title of the webservice response', function () {
        var response = callWebService(640);

        expect(response).to.have.property('title')
            .that.is.an('string')
            .that.equals('Poste 640');
    });


    it('should wrap the frequencies webservice response', function () {
        var response = callWebService(640);

        expect(response).to.have.property('frequencies')
            .that.is.an('array')
            .to.have.length(8);

    });

    it('should divide each frequency in: bus, time to arrive and destination', function () {
        var response = callWebService(640);

        var firstBus = response.frequencies[0];

        expect(firstBus).to.have.property('bus')
            .that.is.an('string')
            .that.equals('31');

        expect(firstBus).to.have.property('timeToArrive')
            .that.is.an('string')
            .that.equals('10 min');

        expect(firstBus).to.have.property('destiny')
            .that.is.an('string')
            .that.equals('Dirección PUERTO VENECIA');

    });

    // TODO parse error responses
    // {"query":{"count":0,"created":"2013-10-21T18:07:06Z","lang":"es-ES","results":null}}
    // {"query":{"count":1,"created":"2013-10-21T18:08:47Z","lang":"es-ES","results":{"json":{"items":{"json":"Error obteniendo datos"},"id":"648","service":"bus","title":"Poste 648"}}}}
});
