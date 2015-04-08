# ngjs-color-picker

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
```
$ bower install --save ngjs-color-picker
```

You may have to run

 ```
 $ grunt wiredep
 ```
 
to make grunt automatically add the needed files to your `index.html` (if using Yeoman - which I recommend).

####via npm:
```
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

# TODO
* Click (or something) to get the hex-code for the color (rgb should also be available)
* Add reverse option for gradient
* Include color themes (Good palettes: http://jsfiddle.net/nicgirault/bqph3pkL/)
* Add option to select rows instead of columns
* Add information about all the options to the GitHub page

# License
The MIT License (MIT)

Copyright (c) 2015 Simon Egersand

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.