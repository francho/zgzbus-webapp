'use strict';

describe('Service: BusTimesGetter', function () {

  // load the service's module
  beforeEach(module('zgzbus'));

  // instantiate service
  var BusTimesGetter;
  beforeEach(inject(function (_BusTimesGetter_) {
    BusTimesGetter = _BusTimesGetter_;
  }));

  it('should do something', function () {
    expect(!!BusTimesGetter).toBe(true);
  });

});
