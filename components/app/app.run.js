(function (angular) {
    'use strict';

    angular.module('app')
        .run(AppRun);

    AppRun.$inject = ['$rootScope', 'Settings', '$mdDialog'];

    function AppRun($rootScope, Settings, $mdDialog) {
        // the following data is fetched from the JavaScript variables created by wp_localize_script(), and stored in the Angular rootScope
        // Settings.dir = BlogInfo.url;
        // Settings.site = BlogInfo.site;
        // Settings.api = AppAPI.url;

        Settings.load()
            .catch(function (error, status) {
                //$mdDialog.show(...An error has occurred...);
            });
    }

})(window.angular);