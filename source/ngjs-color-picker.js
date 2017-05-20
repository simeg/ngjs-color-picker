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

        var styling = [
            {
                selector: 'ul',
                rules: [
                    'padding: 0',
                    'outline: none',
                    'list-style-type: none'
                ]
            },
            {
                selector: 'li',
                rules: [
                    'padding: 0',
                    'margin: 0',
                    'box-sizing: border-box',
                    'outline: none'
                ]
            },
            {
                selector: 'li.selectedColor',
                rules: [
                    'border: 1px solid #333'
                ]
            },
            {
                selector: 'li.hRDF',
                rules: [
                    'border-radius: 5px 0 0 5px'
                ]
            },
            {
                selector: 'li.hRDL',
                rules: [
                    'border-radius: 0 5px 5px 0'
                ]
            },
            {
                selector: 'li.vRDF',
                rules: [
                    'border-radius: 5px 5px 0 0'
                ]
            },
            {
                selector: 'li.vRDL',
                rules: [
                    'border-radius: 0 0 5px 5px'
                ]
            },
            {
                selector: 'li.tlRound',
                rules: [
                    'border-radius: 5px 0 0 0'
                ]
            },
            {
                selector: 'li.trRound',
                rules: [
                    'border-radius: 0 5px 0 0;'
                ]
            },
            {
                selector: 'li.brRound',
                rules: [
                    'border-radius: 0 0 5px 0;'
                ]
            },
            {
                selector: 'li.blRound',
                rules: [
                    'border-radius: 0 0 0 5px;'
                ]
            }
        ];

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

        var defaultValues = {
            colors: defaultColors,
            options: {
                size: 20,
                columns: null,
                randomColors: null
            },
            gradient: null
        };

        var setInitValues = function(scope) {
            scope.colors = defaultColors;
            scope.options = scope.options || {};
            scope.options.size = scope.options.size || defaultValues.options.size;
            scope.options.columns = scope.options.columns || defaultValues.options.columns;
            scope.options.randomColors =
                scope.options.randomColors || defaultValues.options.randomColors;
            scope.options.total = scope.options.total || scope.colors.length;
            scope.options.horizontal =
                (scope.options.hasOwnProperty('horizontal') ? scope.options.horizontal : true);
            scope.options.roundCorners =
                (scope.options.hasOwnProperty('roundCorners') ?
                    scope.options.roundCorners : false);
            scope.gradient = scope.gradient || defaultValues.gradient;

            scope.ulCss = {};
            scope.css = {};
            scope.css.display = (scope.options.horizontal ? 'inline-block' : 'block');
            scope.css.width = scope.css.height = scope.options.size + 'px';
        };

        var setColors = function(scope) {
            if (!!scope.options.customColors) {
                scope.colors = scope.options.customColors;
            } else if (scope.options && !!scope.options.randomColors) {
                if (scope.options.randomColors > 0) {
                    scope.colors = [];
                    var randomColors = scope.options.randomColors;
                    while (randomColors !== 0) {
                        scope.colors.push(getRandomHexColor());
                        randomColors--;
                    }
                } else {
                    // TODO: Handle this
                    // Random colors array is empty
                }
            } else if (!!scope.gradient) {
                // If step === 0        => nothing will happen.
                // If step === 1        => it will add 3 shades to all
                //                         colors (2.55 shades per 1%, rounded)
                var validHex = formatToHex(scope.gradient.start);
                var isOkHex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(validHex);
                if (isOkHex) {
                    scope.colors = [];
                    var count =
                        (scope.gradient.hasOwnProperty('count') ? scope.gradient.count : 10);
                    var interval =
                        (scope.gradient.hasOwnProperty('step') ? scope.gradient.step : 1);
                    while (count !== 0) {
                        scope.colors.push(shadeColor(scope.colors.length === 0 ?
                            validHex : scope.colors[scope.colors.length - 1], interval));
                        interval+=scope.gradient.step;
                        count--;

                        // If black or white - stop generating more colors
                        if (scope.colors[scope.colors.length - 1].toLowerCase() === '#ffffff' ||
                            scope.colors[scope.colors.length - 1] === '#000000')
                            count = 0;
                    }
                } else {
                    // TODO: Handle this
                    // Hex is not valid
                }
            }
        };

        var setColumns = function(scope) {
            // Uneven amount of columns     => no round corners
            //                              => horizontal or vertical has no effect
            var indexOfPx = scope.css.width.indexOf('p');
            scope.ulCss.width = scope.options.columns *
                (parseInt(scope.css.width.substr(0, indexOfPx), 10)) + 'px';
            scope.ulCss.height =
                scope.options.size * (scope.colors.length / scope.options.columns) + 'px';
            scope.css.cssFloat = 'left';

            // Set rounded corners
            var isOkColumn = (scope.colors.length % scope.options.columns) === 0;
            scope.columnRound =
                (isOkColumn && scope.options.columns && scope.options.roundCorners);
        };

        var setRoundedCorners = function(scope) {
            scope.hzRound = scope.options.horizontal && scope.options.roundCorners &&
                !scope.options.columns;
            scope.vertRound = !scope.options.horizontal && scope.options.roundCorners &&
                !scope.options.columns;
        };

        var setInitialSelectedColor = function(scope) {
            scope.selectedColor = scope.selectedColor || scope.colors[0];
        };

        var getHtmlCssStyle = function(selector, rules) {
            var prefix = 'ngjs-color-picker';
            return prefix + ' ' + selector + ' {' + rules.join(';') + '}';
        };

        var applyCssToHtml = function() {
            var styles = styling.map(function(element) {
                return getHtmlCssStyle(element.selector, element.rules);
            });

            angular.element(document).find('head').prepend(
                '<style type="text/css">' + styles.join(' ') + '</style>');
        };

        /* Util functions */
        var getRandomHexColor = function() {
            return ('#' + (Math.random().toString(16) + '000000').slice(2, 8));
        };

        var formatToHex = function(hex) {
            var index = +(hex.charAt(0) === '#');
            return '#' + hex.substr(index).toLowerCase();
        };

        var shadeColor = function(color, percent) {
            var num = parseInt(color.slice(1), 16),
                amt = Math.round(2.55 * percent),
                R = (num >> 16) + amt,
                G = (num >> 8 & 0x00FF) + amt,
                B = (num & 0x0000FF) + amt;
            return '#' + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 +
                (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
        };

        return {
            scope: {
                selectedColor: '=?',
                options: '=?',
                gradient: '=?'
            },
            restrict: 'E',
            template: template,
            link: function(scope) { // element, attr

                setInitValues(scope);
                setColors(scope);
                setInitialSelectedColor(scope);
                setRoundedCorners(scope);
                applyCssToHtml();

                if (!!scope.options.columns) {
                    setColumns(scope);
                }

                scope.getCss = function(color) {
                    scope.css.background = color;
                    return scope.css;
                };

                scope.pick = function(color) {
                    scope.selectedColor = color;
                };

            }
        };

    });
