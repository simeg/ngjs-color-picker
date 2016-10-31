ngjs-color-picker
=================

[![Build Status](https://travis-ci.org/simeg/ngjs-color-picker.svg?branch=master)](https://travis-ci.org/simeg/ngjs-color-picker)
[![npm](https://img.shields.io/npm/dm/ngjs-color-picker.svg)](https://npmjs.org/package/ngjs-color-picker)

A small directive which essentially is a color picker but with a few extra functions - for AngularJS. Based on [ng-color-picker](https://github.com/joujiahe/ng-color-picker).

**Requirements**: Angular 1.2+

# Features
- Customize the appearance of the color picker (vertical, horizontal, columns etc.)
- Generate random colors
- Generate gradient colors

# Demo
- [Demo](http://simeg.github.io/ngjs-color-picker)
- [Plunker](http://embed.plnkr.co/INXf3efkYeP1gWaF9SId/preview)

# Installation
####via bower:
``` bash
$ bower install --save ngjs-color-picker
```

You may have to run

 ``` bash
 $ grunt wiredep
 ```
 
to make grunt automatically add the needed files to your `index.html`.

####via npm:
``` bash
$ npm install --save ngjs-color-picker
```

####manually:
Clone or [download](https://github.com/simeg/ngjs-color-picker/archive/master.zip) the repository and include the `js` and `css` files in your app.

**JS**

``` html
<script type="text/javascript" src="js/ngjs-color-picker"></script>
```

**CSS**

``` html
<link rel="stylesheet" href="css/ngjs-color-picker.css" />
```

Inject the directive as a dependency in your app:

``` javascript
angular.module('myApp', ['ngjsColorPicker']);
```

# Usage and documentation
For documentation, examples and usage see the [GitHub page for this repository](http://simeg.github.io/ngjs-color-picker).

## Option prioritization
1. Custom colors
2. Random colors
3. Gradient
4. Default colors

# TODO
* Click (or something) to get the hex-code for the color (rgb should also be available)
* Add reverse option for gradient
* Include color themes (Good palettes: http://jsfiddle.net/nicgirault/bqph3pkL/)
* Add option to select rows instead of columns
* See issues
