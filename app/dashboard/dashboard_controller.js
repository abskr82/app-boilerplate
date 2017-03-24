export default angular.module('lighting-ui-dashboard.controller', ['ui.router'])
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('dashboard', {
          url: '/dashboard',
          views: {
            // nav: {
            //   template: require('../nav/nav.html')
            // },
            content: {
              template: require('./dashboard.html'),
              controller: 'Dashboard',
            //   resolve: {
            //     viewData: ['RestService', 'RoutePermissionService', function (RestService, RoutePermissionService) {
            //       return RoutePermissionService.can('dashboard_view.read')
            //         .then(function () {
            //           return RestService.all('dashboard_view');
            //         });
            //     }]
            //   }
            }
          },
          access: {
            isPublic: false
          }
        });
    }])
    .controller('Dashboard', ['$scope', '_', '$rootScope', function DashboardController($scope, _, $rootScope) {
// jshint ignore:line

      //$scope.alerts = [];
      $scope.lights = [];
      $scope.zones = [];
      $scope.lights.count =10;
      $scope.lights.title = 'Lights';

      function callDashboardView() {
        
      }

      callDashboardView();
    }]);
