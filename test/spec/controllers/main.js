'use strict';

describe('Controller: MainCtrl', function () {

    var expect = chai.expect;
    // load the controller's module
    beforeEach(module('zgzbus'));

    var MainCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
        });
    }));

    it('should init busInfo in the scope', function () {
        expect(scope.busInfo).to.not.be.undefined;
    });

    it('should init busInfo.busStop property', function () {
        expect(scope.busInfo).to.ownProperty('busStop');
    });

    it('should init busInfo.title property', function () {
        expect(scope.busInfo).to.ownProperty('title');
    });

    it('should init busInfo.frequencies property', function () {
        expect(scope.busInfo).to.ownProperty('frequencies');
    });

    it('should have a method in the scope to launch the queries', function () {
        expect(scope).to.respondTo('getBusTimeTable');
    });
});
