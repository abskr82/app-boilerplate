import classicModules from './classic_modules';
import classicVendors from './classic_vendors';

import appControllerModule from './app_controller';
// import themesFeatureModule from './themes';
// import navFeatureModule from './nav';



export default angular.module('lighting-ui', [
  classicModules.name,
  classicVendors.name,
  appControllerModule.name
  // themesFeatureModule.name,
  // navFeatureModule.name
])
.config(['$urlRouterProvider', function ($urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');
}])
// .config(['$httpProvider', function ($httpProvider) {
//   $httpProvider.interceptors.push('HttpInterceptor');
// }])
// .config(['$sceDelegateProvider', 'Defaults', function ($sceDelegateProvider, Defaults) {
//   $sceDelegateProvider.resourceUrlWhitelist(['self', Defaults.baseUrl + '**']);
// }])
// .config(['RestServiceProvider', 'Defaults', function (RestServiceProvider, Defaults) {
//   RestServiceProvider.setBaseUrl(Defaults.apiBaseUrl);
// }])
// .config(['LightSocketProvider', 'Defaults', function (LightSocketProvider, Defaults) {
//   LightSocketProvider.setOptions({
//     url: Defaults.lightSocket
//   });
// }])
.run([ '$state', '$httpBackend',
  // '$rootScope', '$state', 'AuthService',
  // function ($rootScope, $state, AuthService) {
  //   $rootScope.$on("$stateChangeStart", function (event, nextRoute) {
  //     if ((!nextRoute.access || !nextRoute.access.isPublic)) {
  //       AuthService.isAuthenticated().then(function (authed){
  //         if(!authed){
  //           $state.go('login');
  //         }
  //       });
  //     }
  //   });
  // }
  function($state, $httpBackend) {
     $state.go('login');
  }

]);
