(function () {
  'use strict';

  describe('RestService test', function () {
    var RestService, httpBackend;
    beforeEach(angular.mock.module('global-libraries', 'simplysnap-ui-components'));

    beforeEach(inject(function (_RestService_, $httpBackend) {
      // console.log('injected');
      RestService = _RestService_;
      httpBackend = $httpBackend;
    }));

    it('should contain a RestService service', function () {
      expect(RestService)
        .not.toBe(null);
    });

    // / Basic test to see if the all method returns correctly.
    it('should perform a GET', function () {
      httpBackend.expectGET('light')
        .respond(201, 'hello world');

      RestService.all('light')
        .then(function (result) {
          expect(result.data)
            .toBe('hello world');
        });

      httpBackend.flush();
    });

    it('should perform a POST', function () {
      httpBackend.expectPOST('light')
        .respond(201, 'You\'re a light post!');

      RestService.post('light', {})
        .then(function PromiseResult(result) {
          expect(result.data)
            .toBe('You\'re a light post!');
        });

      httpBackend.flush();
    });

    it('should perform a QUERY without parameters', function () {
      httpBackend.expectGET('ip_info')
        .respond(201, 'ip information');

      RestService.query('ip_info')
        .then(function (result) {
          expect(result.data)
            .toBe('ip information');
        });

      httpBackend.flush();
    });

    it('should perform a QUERY with parameters', function () {
      httpBackend.expectGET('controller_exclude_device?id=test+id')
        .respond(201, 'excluded devices');

      RestService.query('controller_exclude_device', {id: 'test id'})
        .then(function (result) {
          expect(result.data)
            .toBe('excluded devices');
        });

      httpBackend.flush();
    });
  });
})();
