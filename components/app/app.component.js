(function (angular) {
    'use strict';

    angular.module('app')
        .value('duScrollOffset', 70)
        .value('duScrollDuration', 1000)
        .component('app', {
            controller: AppComponent,
            templateUrl: 'components/app/app.html',
            bindings: {
                // '@' : local scope value
                test1: '@',
                // '<' : 1-way expression
                // '=' : 2-way value
                // '&' : execute parent expression
            },
        });

    AppComponent.$inject = ['$window', '$document', '$timeout', '$log', '$http', '$scope', 'Settings', '$mdDialog', '$mdSidenav'];

    function AppComponent($window, $document, $timeout, $log, $http, $scope, Settings, $mdDialog, $mdSidenav) {
        /* jshint validthis:true */
        var $ctrl = this;

        // https://docs.angularjs.org/guide/component
        //this.$onInit = 
        //this.$onChanges = function(changesObj) {
        //this.$doCheck = 
        //this.$onDestroy = 
        //this.$postLink = 
        //this.$routerOnActivate = 
        this.$onInit = function () {
            $log.debug('AppComponent.$onInit - ', this, arguments);
            
            //document.querySelector(objectFitImages.supportsObjectFit ? '.of-supported' : '.of-not-supported').style.display = 'block';
            //objectFitImages();
            
            // // load posts from the WordPress API
            // $http({
            //     method: 'GET',
            //     url: Settings.api,
            //     params: {
            //         json: 'get_posts'
            //     }
            // }).
            //     success(function (data, status, headers, config) {
            //         $ctrl.postdata = data.posts;
            //     }).
            //     error(function (data, status, headers, config) {
            //     });
        };

        //
        // private properties with defaults
        //


        //
        // public interface
        //
        
        $ctrl.isDialogOpen = false;
        $ctrl.recaptchaSiteKey = Settings.recaptchaSiteKey;
        $ctrl.newsletterEmail = null;
        $ctrl.sendOk = false;
        $ctrl.newsletterSent = false;
        $ctrl.newsletterMessageColor = 'unset';
        $ctrl.contactSent = false;
        $ctrl.contactMessageColor = 'unset';
        $ctrl.foo = true;
        $ctrl.today = new Date();
        $ctrl.newsletterRequest = newsletterRequest;
        $ctrl.contactRequest = contactRequest;
        $ctrl.toggleSideNav = buildToggler('right');
        $ctrl.isOpenSideNav = function () {
            return $mdSidenav('right').isOpen();
        };
        $ctrl.closeSideNav = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav('right').close()
                .then(function () {
                    $log.debug("closed right");
                });
        };

        function buildToggler(navID) {
            return function () {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggled " + navID);
                    });
            }
        }


        $ctrl.openDialog = function (template, ev) {

            $ctrl.isDialogOpen = true;

            $mdDialog.show({
                controller: DialogController,
                templateUrl: "components/app/" + template + ".html",
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true // Only for -xs, -sm breakpoints.
            }).then(function (target) {
                $ctrl.isDialogOpen = false;
                switch (target) {
                    case 'contact':
                        var someElement = angular.element(document.getElementById('section-40'));
                        $document.scrollTo(someElement, 70, 1000);
                        break;
                    default:
                        $ctrl.openDialog(target);
                        break;
                }
            }, function () {
                $ctrl.isDialogOpen = false;
                $log.debug("You cancelled the dialog.");
            });
        };

        function DialogController($scope, $mdDialog) {

            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.link = function (target) {
                $mdDialog.hide(target);
            };
        }
        
        
// $scope.login = function (token) {
//   // your login logic
// }
$window.onNewsletterRequest = newsletterRequest;
$ctrl.validateNewsletterRequest = validateNewsletterRequest;

        function validateNewsletterRequest() {
            //grecaptcha.reset();
            //grecaptcha.execute();
        }
        
        function newsletterRequest(token) {
            $ctrl.newsletterMessage = null;
            $ctrl.newsletterMessageColor = "unset";
            sendEmail("Windowsoft.com Newsletter Request",
                "<h4>Windowsoft has received the following newsletter sign-up request.  The details are as follows:</h4><h4>" + $ctrl.newsletterEmail + "</h4>"
                ).then(function () {
                if ($ctrl.sendOk) {
                    $ctrl.newsletterMessage = "Thank you!  We have added you as a new subscriber.";
                    $ctrl.newsletterSent = true;
                } else {
                    $ctrl.newsletterMessageColor = "red";
                    $ctrl.newsletterMessage = "We're sorry, but something went wrong.  Please try again, or contact us via email or phone.";
                }
            });
        }
        
        function contactRequest() {
            $ctrl.contactMessage = null;
            $ctrl.contactMessageColor = "unset";
            sendEmail("Windowsoft.com Contact Request",
                "<h4>Windowsoft has received the following new contact request.  The details are as follows:</h4>" +
                "<h4>Name: " + $ctrl.contact.name + "</h4>" +
                "<h4>Company: " + ($ctrl.contact.company ? $ctrl.contact.company : 'Not provided') + "</h4>" +
                "<h4>Email: " + $ctrl.contact.email + "</h4>" +
                "<h4>Phone: " + ($ctrl.contact.phone ? $ctrl.contact.phone : 'Not provided') + "</h4>" +
                "<h4>Message: " + ($ctrl.contact.message ? $ctrl.contact.message : 'Not provided') + "</h4>" +
                "").then(function () {
                if ($ctrl.sendOk) {
                    $ctrl.contactMessage = "Thank you!  We will get back to you soon.";
                    $ctrl.contactSent = true;
                } else {
                    $ctrl.contactMessageColor = "red";
                    $ctrl.contactMessage = "We're sorry, but something went wrong and your message was not sent.  Please try again, or contact us via email or phone.";
                }
            });
        }
        
        
        //
        // private methods
        //

        function sendEmail(subject, body) {
            // send email to customer mailbox using windowsoft-mailer
            return $http({
                method: "POST",
                url: Settings.mailerUrl,
                data: {
                    "toEmail": Settings.mailbox,
                    "subject": subject,
                    "body": body
                }
            }).then(function (response) {
                $log.debug("Email request sent. Status response: " + response.status + "\nData response: " + response.data);
                $ctrl.sendOk = true;
            }, function (response) {
                    $log.error("Email failed to send. Status response: " + response.status + "\nData response: " + response.data);
                    $ctrl.sendOk = false;
                });
        }

    }

})(window.angular);
