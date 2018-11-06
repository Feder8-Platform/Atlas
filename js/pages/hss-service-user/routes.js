define(
    (require, factory) => {
        const { AuthorizedRoute } = require('providers/Route');
        function routes(appModel, router) {
            return {
                '/hss-service-user': new AuthorizedRoute(() => {
                    appModel.activePage(this.title);
                    require([
                        './hss-service-user'
                    ], function () {
                        router.setCurrentView('hss-service-user');
                    });
                })
            };
        }

        return routes;
    }
);