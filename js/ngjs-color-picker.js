'use strict';

angular.module('ngjsColorPicker', [])
    .directive('ngjsColorPicker', function() {
        var template =
            '<ul ng-style="ulCss"> \
                <li ng-repeat="color in colors | limitTo: options.total" \
                    ng-class="{ \
                    selectedColor: (color===selectedColor), \
                    hRDF: $first&&hzRound, \
                    hRDL: $last&&hzRound, \
                    vRDF: $first&&vertRound, \
                    vRDL: $last&&vertRound, \
                    tlRound: $first&&columnRound, \
                    trRound: $index==(options.columns-1)&&columnRound, \
                    brRound: $last&&columnRound, \
                    blRound: $index==(colors.length-options.columns)&&columnRound \
                    }" \
                    ng-click="pick(color)" \
                    ng-attr-style="background-color:{{color}};" \
                    ng-style="getCss(color)"> \
                    </li>\
                </ul>';
        return {
            scope: {
                selectedColor: '=?',
                customColors: '=?',
                options: '=?',
                gradient: '=?'
            },
            restrict: 'E',
            template: template,
            link: function (scope, element, attr) {

                var defaultColors =  [
                    '#7bd148',
                    '#5484ed',
                    '#a4bdfc',
                    '#46d6db',
                    '#7ae7bf',
                    '#51b749',
                    '#fbd75b',
                    '#ffb878',
                    '#ff887c',
                    '#dc2127',
                    '#dbadff',
                    '#e1e1e1'
                ];

                // Priorities
                // 1. Custom colors
                // 2. Random colors
                // 3. Gradient
                // 4. Default colors

                // Set options
                scope.colors = scope.customColors || defaultColors;
                scope.options = scope.options || {};
                scope.options.size = scope.options.size || 20;
                scope.options.columns = scope.options.columns || 0;
                scope.options.randomColors = scope.options.randomColors || 0;
                scope.options.total = scope.options.total || scope.colors.length;
                scope.options.horizontal = (scope.options.hasOwnProperty('horizontal') ? scope.options.horizontal : true);
                scope.options.roundCorners = (scope.options.hasOwnProperty('roundCorners') ? scope.options.roundCorners : false);
                scope.gradient = scope.gradient || null;

                // Contains all css styles for all <li> elements
                scope.css = {};
                // Contains all css styles for the <ul> element
                scope.ulCss = {};
                // Set bar to horizontal/vertical
                scope.css.display = (scope.options.horizontal ? 'inline-block' : 'block');
                // Set size of squares
                scope.css.width = scope.css.height = scope.options.size + 'px';

                // - If uneven columns - no round corners at all
                // - Horizontal or vertical has no effect if columns are not "even"
                if(scope.options.columns > 0){
                    var indexOfPx = scope.css.width.indexOf('p');
                    scope.ulCss.width = scope.options.columns*(parseInt(scope.css.width.substr(0,indexOfPx))) + 'px';
                    scope.ulCss.height = scope.options.size*(scope.colors.length/scope.options.columns) + 'px';
                    scope.css.cssFloat = 'left';
                }

                // Set if rounded corners (horizontal or vertical)
                scope.hzRound = (scope.options.horizontal && scope.options.roundCorners && scope.options.columns === 0);
                scope.vertRound = (!scope.options.horizontal && scope.options.roundCorners && scope.options.columns === 0);

                // Generate random colors
                if(scope.options.randomColors >0 && !scope.customColors){
                    scope.colors = [];
                    var count = scope.options.randomColors;
                    while(count !== 0){
                        scope.colors.push(_randomHexColor());
                        count--;
                    }
                }

                // Generate random hex color
                function _randomHexColor() {
                    return ("#" + (Math.random().toString(16) + '000000').slice(2, 8));
                }

                // Generate gradient colors
                // Example: { count:10, start:'#DFCA4A', step:1 }
                // count (default 10): how many boxes (integer)
                // start: starting color (#08a35c || 08a35c) (must be full hex (6 characters))
                // step (default 1): If you pass in 100 for percent it will make your color pure white.
                // If you pass in 0 for percent, nothing will happen.
                // If you pass in 1 for percent it will add 3 shades to all colors (2.55 shades per 1%, rounded).
                // (positive or negative integer)
                // ----
                // - Max count is 14, cannot produce more colors than that
                if(scope.gradient && !scope.customColors && !scope.options.randomColors){
                    var validHex = _formatToHex(scope.gradient.start);
                    var isOkHex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(validHex);
                    if(isOkHex){
                        scope.colors = [];
                        count = (scope.gradient.hasOwnProperty('count') ? scope.gradient.count : 10);
                        var interval = (scope.gradient.hasOwnProperty('step') ? scope.gradient.step : 1);
                        while(count !== 0){
                            scope.colors.push(_shadeColor(scope.colors.length === 0 ? validHex : scope.colors[scope.colors.length-1], interval));
                            interval+=scope.gradient.step;
                            count--;

                            // If black or white - stop generating more colors
                            if(scope.colors[scope.colors.length-1].toLowerCase() === '#ffffff' || scope.colors[scope.colors.length-1] === '#000000')
                                count = 0;
                        }
                    }
                }

                // Set if rounded corners (columns)
                var isOkColumn = (scope.colors.length%scope.options.columns === 0);
                scope.columnRound = (scope.options.columns && scope.options.roundCorners && isOkColumn);

                // Transfer input to valid hex
                function _formatToHex(hex) {
                    var index = +(hex.charAt(0) === '#');
                    return '#' + hex.substr(index).toLowerCase();
                }

                // Darken or lighten color
                function _shadeColor(color, percent) {
                    var num = parseInt(color.slice(1),16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
                    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
                }

                // Returns the existing css, but setting its background property to the passed color
                scope.getCss = function(color) {
                    scope.css.background = color;
                    return scope.css;
                };

                // Pick a color from the view
                scope.pick = function(color) {
                    scope.selectedColor = color;
                };

                // Set selection to chosen color or first color
                scope.selectedColor = scope.selectedColor || scope.colors[0];

            }
        };

    });
