// import { Auth } from '+core/actions'; // Found in Angular 2 half, see `src/+core/actions`
angular.module('lighting-ui-login').provider('AuthService', function AuthServiceProvider() {
  var self = this;
  self.$get = [
    '$rootScope', 'RestService', '$q',
    function AuthServiceFactory($rootScope, RestService, $q) {
      var user = {},
        service = {
          name: 'AuthService'
        };
      $rootScope.isLogged = false;
      service.getUser = function () {
        return user;
      };
      service.login = function (username, password) {
        $rootScope.isLogged = false;
        var d = $q.defer();
        console.log('here');
        RestService.post('login', {
          username: username,
          password: password
        }).then(function (results) {
          console.log('data is ', results);
          service.isAuthenticated().then(function () {
            d.resolve(results);
          });
        }).catch(function (err) {
          d.resolve(err);
        });
        return d.promise;
      };
      service.logout = function (username) {
        return RestService.post('logout', {
          'username': username
        }).then(function (result) {
          user = {};
          // LightSocket.socketClose();
          $rootScope.isLogged = false;
          return result;
        });
      };
      service.isAuthenticated = function () {
        return $q(function (resolve) {
          if ($rootScope.isLogged) {
            resolve($rootScope.isLogged);
            // StoreDispatcher.dispatch(new Auth.LoginSuccessAction(user));
          } else {
            getExistingSession().then(function () {
              resolve($rootScope.isLogged);
            });
          }
        });
      };
      service.setAuthenticated = function (isAuthed) {
        $rootScope.isLogged = isAuthed;
      };
      var getExistingSession = function () {
        var d = $q.defer();
        RestService.all('login').then(function (result) {
          if (result.data) {
            user.id = result.data.id;
            user.username = result.data.name;
            user.level = result.data.role;
          }
          // StoreDispatcher.dispatch(new Auth.LoginSuccessAction(user));
          // PermissionService.set().then(function () {
          //   $rootScope.isLogged = true;
          //   d.resolve();
          // });
        }).catch(function () {
          $rootScope.isLogged = false;
          d.resolve();
          // StoreDispatcher.dispatch(new Auth.LogoutAction());
        });
        return d.promise;
      };
      return service;
  }];
});