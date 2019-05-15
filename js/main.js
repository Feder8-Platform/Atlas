const bustCache = (() => {
    const key = 'bustCache';
    let hash = localStorage.getItem(key) || (localStorage[key] = Math.random().toString(36).substring(7));
    return '_=' + hash;
})();

const localRefs = {
    "configuration": "components/configuration",
    "conceptset-editor": "components/conceptset/conceptset-editor",
    "conceptset-modal": "components/conceptsetmodal/conceptSetSaveModal",
    "conceptset-list-modal": "components/conceptset/conceptset-list-modal",
    "user-bar": "components/user-bar",
    "faceted-datatable": "components/faceted-datatable",
    "explore-cohort": "components/explore-cohort",
    "r-manager": "components/r-manager",
    "home": "components/home",
    "welcome": "components/welcome",
    "forbidden": "components/ac-forbidden",
    "unauthenticated": "components/ac-unauthenticated",
    "roles": "components/roles",
    "role-details": "components/role-details",
    "loading": "components/loading",
    "atlas-state": "components/atlas-state",
    "feedback": "components/feedback",
    "export-button": "components/export-button",
    "import-button": "components/import-button",
    "conceptsetbuilder": "modules/conceptsetbuilder",
    "conceptpicker": "modules/conceptpicker",
    "webapi": "modules/WebAPIProvider",
    "errors": "components/errors",
    "vocabularyprovider": "modules/WebAPIProvider/VocabularyProvider",
    "css": "plugins/css.min",
};

require(["./settings"], (settings) => {
    requirejs.config({
        ...settings,
        paths: {
            ...settings.paths,
            ...settings.localRefs,
        },
//		urlArgs: bustCache,
    });
    require([
        'bootstrap',
        'ko.sortable',
        ...Object.values(settings.cssPaths),
    ], function () { // bootstrap must come first
        $.fn.bstooltip = $.fn.tooltip;
        require([
                'knockout',
                'Application',
                'Model',
                'const',
                'pages/Router',
                'atlas-state',
                'loading',
                'user-bar',
                'welcome',
                'components/white-page',
                'components/terms-and-conditions/terms-and-conditions',
            ],
            (
                ko,
                Application,
                Model,
                constants,
                Router,
                sharedState,
            ) => {
                const app = new Application(new Model(), new Router());

                app.bootstrap()
                    .then(() => app.checkOAuthError())
                    .then(() => app.synchronize())
                    .catch(er => {
                        sharedState.appInitializationStatus(constants.applicationStatuses.failed);
                        console.error('App initialization failed', er);
                    });

                return app;
            });
    });
});