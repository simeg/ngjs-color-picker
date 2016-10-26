'use strict';

angular.module('demoApp').
    controller('DemoCtrl', ['$scope', function($scope) {

        $scope.customOptions = {
            size: 30,
            roundCorners: true
        };

        $scope.optionsRandom = {
            randomColors: 10
        };

        $scope.optionsGradient = {
            start: '#BA693E',
            count: 10,
            step: 1
        };

        $scope.optionsVertical = {
            horizontal: false,
            total: 5
        };

        $scope.optionsColumn = {
            columns: 4,
            roundCorners: true
        };

    }]);
