import angular from 'angular';
require('./ngjs-color-picker');
import '../style/ngjs-color-picker.css';

class AppCtrl {
  constructor() {

    // Set $scope variables here on _this_
    this.options = {
      // randomColors: 12,
      // size: 30,
      // columns: 4,
      // roundCorners: true,
    };

    /*this.optionsGradient = {
      start: '#BA693E',
      count: 10,
      step: 1
    };*/
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
