# ngjs-color-picker [![npm](https://img.shields.io/npm/dm/ngjs-color-picker.svg)](https://npmjs.org/package/ngjs-color-picker) [![Build Status](https://travis-ci.org/simeg/ngjs-color-picker.svg?branch=master)](https://travis-ci.org/simeg/ngjs-color-picker) 

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
### npm:
``` bash
npm install --save ngjs-color-picker
```

### bower:
``` bash
bower install --save ngjs-color-picker
```

You may have to run

 ``` bash
grunt wiredep
 ```
 
to make grunt automatically add the needed files to your `index.html`.

### manually:
Clone or [download](https://github.com/simeg/ngjs-color-picker/archive/master.zip) the repository and include the production file in your application.

``` html
<script type="text/javascript" src="dist/ngjs-color-picker.js"></script>
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

# Contribute :octocat: :raised_hands:
Run `npm install` and then you're able to start dev server with
``` bash
npm run serve
```

The server is then available at [http://localhost:8080](http://localhost:8080).

The file `dev/app/ngjs-color-picker.js` is a symlink to `source/ngjs-color-picker.js`, so you can edit either one of them and the change will be shown on the dev server. 

(Development server environment created using awesome [angular-webpack](https://github.com/preboot/angular-webpack)).

# TODO
* **See [issues](https://github.com/simeg/ngjs-color-picker/issues)**
* Click (or something) to get the hex-code for the color (rgb should also be available)
* Add reverse option for gradient
* Include color themes (Good palettes: http://jsfiddle.net/nicgirault/bqph3pkL/)
* Add option to select rows instead of columns
