define(
    (require, exports) => {
        const buildRoutes = require('./routes');

        return {
            title: 'HSS Service User',
            buildRoutes,
            navUrl: () => '#/hss-service-user',
            icon: 'users',
            statusCss: () => ''
        };
    }
);