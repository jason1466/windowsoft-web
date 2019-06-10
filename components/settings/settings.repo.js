(function (angular) {
    'use strict';

    angular.module('app')
        .factory('SettingsRepo', SettingsRepo);

    SettingsRepo.$inject = ['$http', '$resource', '$log'];

    function SettingsRepo($http, $resource, $log) {
        $log.debug('SettingsRepo - ', this, arguments);

        //
        // private properties with defaults
        //

        //
        // public interface
        //

        var service = {
            loadFromApi: loadFromApi,
            loadFromFile: loadFromFile,
        };
        this.SettingsRepo = service; // useful for developer tracing
        return service;

        //
        // private methods
        //

        function loadFromApi() {
            return $resource('api/ref/settings:@id', {
                id: '@id',
            });
        }

        function loadFromFile() {
            return $http.get('components/settings/settings.json');
        }
    }

})(window.angular);