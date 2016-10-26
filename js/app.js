'use strict';

angular.module('exampleApp', [
    'ngRoute',
    'ngjsColorPicker',
    'hljs'
]).
    config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(false);

            $routeProvider.when('/', {
                templateUrl: 'js/main/index.html',
                controller: 'ExampleCtrl'
            });

            $routeProvider.otherwise('/');

        }
    ]);
