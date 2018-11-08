define(
  (require, factory) => {
    const { Route } = require('providers/Route');
    const authApi = require('webapi/AuthAPI');
    function routes(appModel, router) {
      return {
        '/': new Route(() => {
          appModel.activePage(this.title);
          document.location = "#/home";
        }),
        '/home': new Route(() => {
          appModel.activePage(this.title);
          require(['./home'], function () {
            router.setCurrentView('home');
          });
        }),
        '/welcome/:token': new Route((token) => {
          appModel.activePage(this.title);
          require(['welcome'], function () {
            authApi.token(token);
            document.location = "#/welcome";
          });
        }),
          '/hss-service-user': new Route((token) => {
              appModel.activePage(this.title);
              require(['components/hss-service-user/hss-service-user'], function () {
                  router.setCurrentView('hss-service-user');
              });
          }),
      };
    }

    return routes;
  }
);