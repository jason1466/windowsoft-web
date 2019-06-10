(function (angular) {
    'use strict';

    angular.module('app')
        .component('navBar', {
            controller: NavBarComponent,
            templateUrl: 'components/nav-bar/nav-bar.html',
            // templateUrl: function ($element, $attrs) {
            //     // access to $element and $attrs
            //     //alert('count: ' + $attrs.count);
            //     //$element.addClass('hideMe');
            //     return 'components/nav-bar/nav-bar.html'
            // },
            //restrict: 'EA', // A needed for $router
            bindings: {
                // '@' : local scope value
                // '<' : 1-way expression
                // '=' : 2-way value
                isDialogOpen: '=',
                // '&' : execute parent expression
                onMenuClick: '&',
            },
        });

    NavBarComponent.$inject = ['$log', '$window', '$scope', '$mdSidenav', '$timeout'];

    function NavBarComponent($log, $window, $scope, $mdSidenav, $timeout) {
        $log.debug('NavBarController loading');
        /* jshint validthis:true */
        var $ctrl = this;

        // public interface with defaults
        $ctrl.isScrollTop = true;
        //$ctrl.onMenuClick = this.onMenuClick;

        // https://docs.angularjs.org/guide/component
        //this.$onInit = 
        //this.$onChanges = function(changesObj) {
        //this.$doCheck = 
        //this.$onDestroy = 
        //this.$postLink = 
        //this.$routerOnActivate = 
        this.$onInit = function () {
            $log.debug('NavBarComponent.$onInit - ', this, arguments);

            $window.onscroll = function () {
                $ctrl.isScrollTop = window.pageYOffset === 0;
                $scope.$digest();
            };
        }

        //private interface

    }

})(window.angular);