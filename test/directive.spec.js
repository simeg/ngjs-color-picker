'use strict';

describe('ngjs-color-picker', function() {
    var $compile, $rootScope;

    beforeEach(module('ngjsColorPicker'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('changes selected color on click', function() {
        var element = $compile('<ngjs-color-picker></ngjs-color-picker>')($rootScope);
        $rootScope.$digest();
        var content = element.contents();

        var listItems = content.find('li');
        var firstListItem = listItems[0];
        var secondListItem = listItems[1];
        expect(firstListItem.outerHTML).toContain('class="ng-scope selectedColor"');
        secondListItem.click();
        expect(firstListItem.outerHTML).not.toContain('class="ng-scope selectedColor"');
        expect(secondListItem.outerHTML).toContain('class="ng-scope selectedColor"');
    });

    describe('without custom options', function() {
        var element, content;
        beforeEach(function() {
            element = $compile('<ngjs-color-picker></ngjs-color-picker>')($rootScope);
            // angular.element(document).find('body').append(element);
            $rootScope.$digest();
            content = element.contents();
        });

        it('has default scope variables set', function() {
            var defaultOptions = {
                size: 20,
                columns: 0,
                randomColors: 0,
                total: 12,
                horizontal: true,
                roundCorners: false
            };
            expect(element.isolateScope().options).toEqual(defaultOptions);
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
            expect(element.isolateScope().colors).toEqual(defaultColors);
        });

        describe('renders', function() {
            it('list container element', function() {
                var listElement = element.find('ul');
                expect(listElement.length).toBe(1);
            });

            it('correct amount of color boxes', function() {
                var listItems = content.find('li');
                expect(listItems.length).toBe(12);
            });

            it('one selected color box', function() {
                var selectedItem = content.find('li.selectedColor');
                expect(selectedItem.length).toBe(1);
            });

            it('first color box as selected', function() {
                var listItems = content.find('li');
                var firstListItem = listItems[0];
                expect(firstListItem.outerHTML).toContain('class="ng-scope selectedColor"');
            });

            it('with default width and height', function() {
                var defaultWidth = '20px';
                var defaultHeight = '20px';
                var listItems = content.find('li');
                var listElement = listItems[0];
                expect(listElement.style.width).toEqual(defaultWidth);
                expect(listElement.style.height).toEqual(defaultHeight);
            });

            it('in horizontal mode', function() {
                var listItems = content.find('li');
                var blockElements = listItems.filter(function (index, item) {
                    return item.style.display === 'block';
                });
                expect(blockElements.length).toEqual(0);
            });

            it('with default colors', function() {
                var defaultColors = [
                    'rgb(123, 209, 72)',
                    'rgb(84, 132, 237)',
                    'rgb(164, 189, 252)',
                    'rgb(70, 214, 219)',
                    'rgb(122, 231, 191)',
                    'rgb(81, 183, 73)',
                    'rgb(251, 215, 91)',
                    'rgb(255, 184, 120)',
                    'rgb(255, 136, 124)',
                    'rgb(220, 33, 39)',
                    'rgb(219, 173, 255)',
                    'rgb(225, 225, 225)'
                ];
                var listItems = content.find('li');
                var matches = listItems.filter(function (index, item) {
                    return item.style.backgroundColor === defaultColors[index];
                });
                expect(matches.length).toEqual(listItems.length);
            });
        });
    });

    describe('with single custom option', function() {
        it('adds provided option to scope', function() {
            var $scope = $rootScope.$new();
            $scope.options = {
                customOption: 'shouldExist'
            };
            var element = $compile(
                '<ngjs-color-picker options="options"></ngjs-color-picker>')($scope);
            expect(element.isolateScope().options.hasOwnProperty('customOption')).toEqual(true);
            expect(element.isolateScope().options.customOption).toEqual('shouldExist');
        });

        describe('(customColors)', function() {
            var element, content, customColors;
            beforeEach(function() {
                customColors = [
                    'rgb(27, 209, 72)',
                    'rgb(20, 132, 237)',
                    'rgb(161, 189, 252)',
                    'rgb(22, 214, 219)',
                    'rgb(26, 231, 191)',
                    'rgb(17, 183, 73)'
                ];
                var $scope = $rootScope.$new();
                $scope.customColors = customColors;
                element = $compile(
                    '<ngjs-color-picker custom-colors="customColors"></ngjs-color-picker>')($scope);
                $rootScope.$digest();
                content = element.contents();
            });

            it('renders with custom colors', function() {
                var listItems = content.find('li');
                var matches = listItems.filter(function (index, item) {
                    return item.style.backgroundColor === customColors[index];
                });
                expect(matches.length).toEqual(listItems.length);
            });
        });

        describe('(total)', function() {
            var element, content;
            beforeEach(function() {
                var $scope = $rootScope.$new();
                $scope.options = { total: 3 };
                element = $compile(
                    '<ngjs-color-picker options="options"></ngjs-color-picker>')($scope);
                $rootScope.$digest();
                content = element.contents();
            });

            it('limits rendered list items', function() {
                var listItems = content.find('li');
                expect(listItems.length).toBe(3);
            });
        });

        describe('(selectedColor)', function() {
            var element, content;
            beforeEach(function() {
                var $scope = $rootScope.$new();
                $scope.selectedColor = '#46d6db';
                element = $compile('<ngjs-color-picker selected-color="selectedColor">' +
                        '</ngjs-color-picker>')($scope);
                $rootScope.$digest();
                content = element.contents();
            });

            it('sets selected color as selected', function() {
                var listItems = content.find('li');
                var selectedListItem = listItems[3];
                expect(selectedListItem.outerHTML).toContain('class="ng-scope selectedColor"');
            });
        });

        describe('(size)', function() {
            var element, content;
            beforeEach(function() {
                var $scope = $rootScope.$new();
                $scope.options = { size: 30 };
                element = $compile(
                    '<ngjs-color-picker options="options"></ngjs-color-picker>')($scope);
                $rootScope.$digest();
                content = element.contents();
            });

            it('renders with correct size', function() {
                var customWidth = '30px';
                var customHeight = '30px';
                var listItems = content.find('li');
                var listElement = listItems[0];
                expect(listElement.style.width).toEqual(customWidth);
                expect(listElement.style.height).toEqual(customHeight);
            });
        });

        describe('(round corners)', function() {
            var element, content;
            beforeEach(function() {
                var $scope = $rootScope.$new();
                $scope.options = { roundCorners: true };
                element = $compile(
                    '<ngjs-color-picker options="options"></ngjs-color-picker>')($scope);
                $rootScope.$digest();
                content = element.contents();
            });

            it('renders with rounded corners', function() {
                var listItems = content.find('li');
                var firstListItem = listItems[0];
                var lastListItem = listItems[listItems.length - 1];
                expect(firstListItem.outerHTML).toContain('class="ng-scope selectedColor hRDF"');
                expect(lastListItem.outerHTML).toContain('class="ng-scope hRDL"');
            });
        });

        describe('(random colors)', function() {
            var element, content;
            beforeEach(function() {
                var $scope = $rootScope.$new();
                $scope.options = { randomColors: 10 };
                element = $compile(
                    '<ngjs-color-picker options="options"></ngjs-color-picker>')($scope);
                $rootScope.$digest();
                content = element.contents();
            });

            it('renders with random colors', function() {
                var sortedDefaultColorsInRgb = [
                    'rgb(123, 209, 72)',
                    'rgb(84, 132, 237)',
                    'rgb(164, 189, 252)',
                    'rgb(70, 214, 219)',
                    'rgb(122, 231, 191)',
                    'rgb(81, 183, 73)',
                    'rgb(251, 215, 91)',
                    'rgb(255, 184, 120)',
                    'rgb(255, 136, 124)',
                    'rgb(220, 33, 39)',
                    'rgb(219, 173, 255)',
                    'rgb(225, 225, 225)'
                ];
                sortedDefaultColorsInRgb.sort();
                var listItems = content.find('li');
                var randomColors = [];
                for (var i = 0; i < listItems.length; i++) {
                    var item = listItems[i];
                    randomColors.push(item.style.backgroundColor);
                }
                var sortedRandomColors = randomColors.slice();
                sortedRandomColors.sort();
                expect(sortedDefaultColorsInRgb).not.toEqual(sortedRandomColors);
            });
        });

        describe('(gradient colors)', function() {
            var element, content;
            beforeEach(function() {
                var $scope = $rootScope.$new();
                $scope.gradient = {
                    start: '#BA693E',
                    count: 10,
                    step: 1
                };
                element = $compile(
                    '<ngjs-color-picker gradient="gradient"></ngjs-color-picker>')($scope);
                $rootScope.$digest();
                content = element.contents();
            });

            it('renders with gradient colors', function() {
                var listItems = content.find('li');
                var firstListItem = listItems[0];
                var lastListItem = listItems[listItems.length - 1];
                expect(firstListItem.style.backgroundColor).toEqual('rgb(189, 108, 65)');
                expect(lastListItem.style.backgroundColor).toEqual('rgb(255, 246, 203)');
            });
        });

        describe('(vertical direction)', function() {
            var element, content;
            beforeEach(function() {
                var $scope = $rootScope.$new();
                $scope.options = {
                    horizontal: true
                };
                element = $compile(
                    '<ngjs-color-picker options="options"></ngjs-color-picker>')($scope);
                $rootScope.$digest();
                content = element.contents();
            });

            it('renders directive in vertical mode', function() {
                var listItems = content.find('li');
                var inlineBlockElements = listItems.filter(function (index, item) {
                    return item.style.display === 'inline-block';
                });
                expect(inlineBlockElements.length).toEqual(listItems.length);
            });
        });

        describe('(columns)', function() {
            var element, content;

            var setupDirectiveWithNColumns = function (n) {
                var $scope = $rootScope.$new();
                $scope.options = {
                    columns: n
                };
                element = $compile(
                    '<ngjs-color-picker options="options"></ngjs-color-picker>')($scope);
                $rootScope.$digest();
                content = element.contents();
            };

            var getListWidth = function(columns, listItemWidth) {
                listItemWidth = listItemWidth || 20; // 20 is default width
                return columns * listItemWidth + 'px';
            };

            var getListHeight = function (columns, listItemWidth, listLength) {
                return (listItemWidth * (listLength / columns)) + 'px';
            };

            it('renders directive in column mode', function() {
                setupDirectiveWithNColumns(4);
                var listContainer = element.find('ul')[0];
                expect(listContainer.style.width).not.toEqual('');
                expect(listContainer.style.height).not.toEqual('');
                var listItems = content.find('li');
                var floatLeftItems = listItems.filter(function (index, item) {
                    return item.style.float === 'left';
                });
                expect(floatLeftItems.length).toEqual(listItems.length);
            });

            it('renders with specified columns', function() {
                for (var i = 1; i <= 10; i++) {
                    var columns = i;
                    setupDirectiveWithNColumns(columns);
                    var listContainer = element.find('ul')[0];
                    var listItems = content.find('li');
                    var columnDirectiveWidth = getListWidth(columns, 20);
                    var columnDirectiveHeight = getListHeight(columns, 20, listItems.length);
                    expect(listContainer.style.width).toEqual(columnDirectiveWidth);
                    expect(listContainer.style.height).toEqual(columnDirectiveHeight);
                }
            });
        });
    });

    describe('with multiple custom options', function () {
        describe('with prioritizes', function () {
            it('has custom colors as prio 1', function () {
                var $scope = $rootScope.$new();
                $scope.customColors = [
                    'rgb(27, 209, 72)',
                    'rgb(20, 132, 237)',
                    'rgb(161, 189, 252)',
                    'rgb(22, 214, 219)',
                    'rgb(26, 231, 191)',
                    'rgb(17, 183, 73)'
                ];

                $scope.options = {
                    randomColors: 10
                };

                $scope.gradient = {
                    start: '#BA693E',
                    count: 10,
                    step: 1
                };

                var element = $compile(
                    '<ngjs-color-picker options="options" custom-colors="customColors">' +
                    '</ngjs-color-picker>')($scope);
                $rootScope.$digest();
                var content = element.contents();

                var listItems = content.find('li');
                var matches = listItems.filter(function (index, item) {
                    return item.style.backgroundColor === $scope.customColors[index];
                });
                expect(matches.length).toEqual(listItems.length);
            });

            it('has random colors as prio 2', function () {
                var $scope = $rootScope.$new();
                $scope.options = {
                    randomColors: 10
                };

                $scope.gradient = {
                    start: '#BA693E',
                    count: 10,
                    step: 1
                };

                var element = $compile(
                    '<ngjs-color-picker options="options"></ngjs-color-picker>')($scope);
                $rootScope.$digest();
                var content = element.contents();

                // Check that first and last list elements do not match
                // provided gradient spectre. That is good enough.
                var listItems = content.find('li');
                var firstListItem = listItems[0];
                var lastListItem = listItems[listItems.length - 1];
                expect(firstListItem.style.backgroundColor).not.toEqual('rgb(189, 108, 65)');
                expect(lastListItem.style.backgroundColor).not.toEqual('rgb(255, 246, 203)');
            });
        });
    });

});
