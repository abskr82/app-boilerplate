import classicModules from './classic_modules';

AppController.$inject = ['$scope', '$interval', '$state'];
function AppController($scope, $interval,  $state) { // jshint ignore:line
  // $rootScope.userLoading = true;

  // var openSocket = function () {
  //   if (!$scope.sockInterval) {
  //     $scope.sockInterval = $interval(function () {
  //       if (LightSocket.status !== 'Connected') {
  //         LightSocket.open();
  //       } else {
  //         $interval.cancel($scope.sockInterval);
  //       }
  //     }, 1000);
  //   }
  // };

  // AuthService.isAuthenticated().then(function (isAuthed) {
  //   if (isAuthed) {
  //     openSocket();
  //     $rootScope.userLoading = false;
  //   }
  // });

  // var socketAuthentication = function (event, data) {
  //   if (!data) {
  //     clearSocketInterval();
  //     AuthService.setAuthenticated(false);
  //     $state.go('login');
  //   }
  // };

  // var clearSocketInterval = function () {
  //   if ($scope.sockInterval) {
  //     $interval.cancel($scope.sockInterval);
  //     $scope.sockInterval = null;
  //   }
  // };

  // $rootScope.$on('socketClosed', clearSocketInterval);
  // $rootScope.$on('ClearSocketInterval', clearSocketInterval);
  // $rootScope.$on('LightSocket.authentication', socketAuthentication);
}

export default angular.module('lighting-ui.app-controller', [
    classicModules.name
  ])
  .controller('AppController', AppController);
