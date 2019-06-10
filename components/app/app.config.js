(function (angular) {
    'use strict';

    angular.module('app')
        .config(AppConfig);


    AppConfig.$inject = ['$logProvider', '$locationProvider', '$mdThemingProvider'];

    function AppConfig($logProvider, $locationProvider, $mdThemingProvider) {
        $logProvider.debugEnabled(true);
        // remove the usual SPA hash mark from URLs so angular routing looks like simple URLs
        // need to configure server for URL rewriting back to root '/'
        // https://server/app/#/view --> https://server/app/view
        $locationProvider.html5Mode(true);

        $mdThemingProvider.theme('default')
            .primaryPalette('grey')
            .accentPalette('blue');
    }

})(window.angular);