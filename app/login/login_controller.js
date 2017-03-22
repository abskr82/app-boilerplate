(function () {
  'use strict';

  angular.module('lighting-ui-login', [
    'ui.router'
  ])
    .config(function ($stateProvider) {
      $stateProvider
        .state('login', {
          url: '/login',
          views: {
            // nav: {
            //   template: require('../nav/nav-header.html'),
            //   controller: ['$scope', 'ACTIVE_THEME', function ($scope, ACTIVE_THEME) {
            //     $scope.ACTIVE_THEME = ACTIVE_THEME;
            //   }]
            // },
            content: {
              template: require('./login.html'),
              controller: 'LoginController'
            }
          },
          access: {
            isPublic: true
          }
        })

        // .state('change_password', {
        //   url: '/change_password',
        //   views: {
        //     nav: {
        //       template: require('../nav/nav-header.html'),
        //       controller: ['$scope', 'ACTIVE_THEME', ($scope, ACTIVE_THEME) => {
        //         $scope.ACTIVE_THEME = ACTIVE_THEME;
        //       }]
        //     },
        //     content: {
        //       template: require('./change_password.html'),
        //       controller: 'ChangePasswordController'
        //     }
        //   },
        //   access: {
        //     isPublic: true
        //   }
        // });
    })

    .controller('LoginController', function ($scope, $rootScope, AuthService, $state, AlarmService, LightSocket, PermissionService, EulaService) {
 // jshint ignore:line
      $scope.inProgress = false;
      $scope.username = '';
      alert('hi');
      function doPostLoginTasks() {
        AuthService.changePasswordStatus().then(result => {
          if (result.status !== 200) {
            $scope.alerts = [
              {
                type: 'danger',
                msg: 'Error verifying user status'
              }
            ];
          } else if (result.data.password_changed === '') {
            $state.go('change_password');
          } else {
            EulaService.verifyLicenseAgreement()
              .then(userHasAcceptedLicenseAgreement => {
                if (!userHasAcceptedLicenseAgreement) {
                  return AuthService.logout($scope.username)
                    .then(() => {
                      $rootScope.$broadcast('ClearSocketInterval');
                      $state.go('login');
                      $scope.inProgress = false;
                    });
                }
                
                AuthService.setAuthenticated(true);
                LightSocket.open();
                AlarmService.refresh();

                if (PermissionService.getRole() === 'Scene Control') {
                  $state.go('scene');
                } else if (PermissionService.can('mode.support')) {
                  $state.go('config');
                } else {
                  $state.go('devices');
                }
              });
          }
        });
      }

      $scope.logIn = function (username, password) {
        if (username !== undefined && password !== undefined) {
          $scope.inProgress = true;
          AuthService.login(username, password).then(function (result) {
            $scope.username = username;
            if (result.status !== 200) {
              $scope.inProgress = false;
              if(result.data === "Invalid username or password"){
                result.data = 'Invalid login credentials'
              }
              $scope.alerts = [
                {
                  type: 'danger',
                  msg: result.data
                }
              ];
            } 
                    
            else {
              doPostLoginTasks();
            }
          }).finally(function () {
            $scope.login = {
              email: '',
              password: ''
            };
          });
        }
      };

      AuthService.isAuthenticated().then(isAuthed => {
        if (isAuthed) {
          doPostLoginTasks();
        }
      });
    })

    .controller('ChangePasswordController', function ($scope, $rootScope, AuthService, $state, $uibModal, UserService) { // eslint-disable-line max-params
      $scope.inProgress = false;

      AuthService.changePasswordStatus().then(result => {
        if (result.status !== 200) {
          $scope.alerts = [
            {
              type: 'danger',
              msg: 'Error fetching user data'
            }
          ];
        } else {
          $scope.username = result.data.name;
          $scope.id = result.data.id;
        }
      });
      $scope.unsavedUser = {};
      function reportAlert(type, msg) {
        const msgStr = msg || 'Error while changing password, please try again from login page';
        $scope.alerts = [];
        $scope.alerts = [
          {
            type: type,
            msg: msgStr
          }
        ];
      }

      $scope.changePassword = function () {
        $scope.inProgress = true;
        const model = {};
        model.old = $scope.unsavedUser.oldPassword;
        model.new = $scope.unsavedUser.userPassword;
        AuthService.changePassword(model).then(result => {
          $scope.inProgress = false;
          if (result.status !== 200) {
            reportAlert('danger', result.data.description);
          } else {
            $scope.alerts = [];
            $scope.unsavedUser = {};
            AuthService.logout($scope.username).then(() => {
              $rootScope.$broadcast('ClearSocketInterval');
              $state.go('login');
            })
              .catch(err => {
                $scope.inProgress = false;
                reportAlert('danger', err.data.description);
              });
          }
        });

      };

      $scope.logout = function () {
        AuthService.logout($scope.username).then(() => {
          $rootScope.$broadcast('ClearSocketInterval');
          $state.go('login');
        }).catch(err => {
          $scope.inProgress = false;
          reportAlert('danger', err.data.description);
        });
      }

      $scope.verifyInputFields = function () {
        if ($scope.inProgress) {
          return true;
        }
        if ($scope.unsavedUser.userPassword && $scope.unsavedUser.repeatPassword) {
          return false;
        }
        return true;
      };
    });
})();
