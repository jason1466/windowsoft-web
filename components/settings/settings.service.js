(function (angular) {
    'use strict';

    angular.module('app')
        .factory('Settings', SettingsService);

    SettingsService.$inject = ['$log', 'SettingsRepo'];

    function SettingsService($log, SettingsRepo) {
        $log.debug('SettingsService - ', this, arguments);

        //
        // private properties with defaults
        //

        //
        // public interface
        //

        var service = {
            load: load,
            state: {
                isLoading: false,
            },
            dir: null,
            site: null,
            api: null,
        };
        this.SettingsService = service; // useful for developer tracing
        return service;

        //
        // private methods
        //

        function load() {
            return SettingsRepo.loadFromFile()
                .then(function (result) {
                    angular.forEach(result.data, function (value, key) {
                        service[key] = value;
                    });
                })
                .catch(function (error, status) {
                    $log.debug('SettingsRepo - File settings load failed. \nStatus: ' + status + '\nError: ' + angular.toJson(error, true));
                    throw error;
                })
                .finally(function () {
                    service.state.isLoading = false;
                });
        }
    }

})(window.angular);