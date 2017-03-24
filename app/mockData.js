 export default angular.module('lighting-ui')
  .run(['$httpBackend',
    function($httpBackend) {
        
        let contacts = [
        {
          id: 1,
          name: 'Ada Lovelace',
          phone: '8445551815'
        },
        {
          id: 2,
          name: 'Grace Hopper',
          phone: '8445551906'
        },
        {
          id: 3,
          name: 'Charles Babbage',
          phone: '8445556433'
        }
      ];
//Lights data
      let lights = [
        {
          id: 1,
          name: 'lace',
          snap_address: '124555'
        },
        {
          id: 2,
          name: 'Hopper',
          snap_address: '151906'
        },
        {
          id: 3,
          name: 'Babbage',
          snap_address: '126433'
        }
      ];
      $httpBackend.whenGET('/contacts').respond(contacts);
      $httpBackend.whenGET('/lights').respond(lights);
      $httpBackend.whenGET('/abc').respond(contacts);
      $httpBackend.whenPOST('/abc').respond(contacts);
      $httpBackend.whenPOST('/abc').respond(contacts);
      $httpBackend.whenGET('/abc').respond(contacts);
      $httpBackend
        .when('POST', '/login')
        .respond(200, {
            status: "success"
      });
      //  $httpBackend.expectPOST("/login").respond({ hello: 'World' });
       $httpBackend.whenPOST(/.*/).passThrough();
    }
  ])
  .factory('Contact', ['$resource', function($resource) {
    return $resource(
      '/contacts/:id',
      {id: '@id'},
      {
        'update': {
          method: 'PUT'
        }
      }
    );
  }]);