'use strict';

angular.module('demoApp', [
    'ngRoute',
    'ngjsColorPicker',
    'hljs'
]).
    config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(false);

            $routeProvider.when('/', {
                templateUrl: 'js/main/index.html',
                controller: 'DemoCtrl'
            });

            $routeProvider.otherwise('/');

        }
    ]);
