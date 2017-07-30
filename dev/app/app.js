import angular from 'angular';
require('../../source/ngjs-color-picker.js');

class AppCtrl {
    constructor() {

        // Set $scope variables here on _this_
        this.customOptions = {
            size: 30,
            roundCorners: true
        };

        this.optionsRandom = {
            randomColors: 10
        };

        this.optionsGradient = {
            start: '#BA693E',
            count: 10,
            step: 1
        };

        this.optionsVertical = {
            horizontal: false,
            total: 5
        };

        this.optionsColumn = {
            columns: 4,
            roundCorners: true
        };
    }
}

/* Angular configuration (no need to touch this) */
let app = () => {
    return {
        template: require('./app.html'),
        controller: 'AppCtrl',
        controllerAs: 'app'
    }
};

const MODULE_NAME = 'app';
angular.module(MODULE_NAME, ['ngjsColorPicker'])
    .directive('app', app)
    .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;
