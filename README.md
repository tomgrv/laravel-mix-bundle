<div align="center">

[![npm version](https://img.shields.io/npm/v/laravel-mix-bundle.svg)](https://www.npmjs.com/package/laravel-mix-bundle)
[![npm downloads](https://img.shields.io/npm/dt/laravel-mix-bundle.svg)](https://www.npmjs.com/package/laravel-mix-bundle)
[![license](https://img.shields.io/github/license/tomgrv/laravel-mix-bundle.svg)](https://github.com/tomgrv/laravel-mix-bundle/blob/master/LICENSE)

</div>

# Laravel Mix Bundle

This extension provides zero configuration Webpack asset bundling support to your Mix (v2.1 and up) builds.

This extension will:
*  Install packages mentionned in package.json as 'bundledDependencies'
*  Generate in your public folder a unique js (+ manifest.js by webpack) and a unique css file containing all js & css referenced from the specified entry source file, recursively:
    * Local project ressources
    * External, npm managed ressources
* Copy in your public folder all referenced assets (fonts, images) from the specified entry source file, recursively:
    * Local project ressources
    * External, npm managed ressources

All folders are taken from standard mix config.

In production mode, js and css files will be minified.

## Usage

First, install the extension.

```bash
$ npm install laravel-mix-bundle --save-dev
```

Then, require it within your `webpack.mix.js` file, like so:

```js
let mix = require('laravel-mix');

require('laravel-mix-bundle');

mix.setPublicPath('public')
    .bundle({
        sourceFile : "resources/assets/index.js",
        outputName : "my-app"
    });
```

(If outputName is empty, takes name from current package.json)

And you're done! Compile everything down with `npm run dev`.

Bundled files are generated in temporary .build folder, then published in css-js-fonts-images folders (respectively), in dist folder.

## Npm packages

In your package.json file, you can now add following references:

```json
"style": "public/css/my-app.css",
"module": "public/js/my-app",
"unpkg": "public/js/my-app.js",
```

(You can change 'public' folder by 'dist' folder for module bundling)

## Blade

In your blade template, you can now include generated files:

* Unique css file :

```html
<link rel="stylesheet" href="{{ asset('css/my-app.css') }}">
```

* Unique js files & manifest :

```html
 <script src="{{ asset('js/manifest.js') }}"></script>
 <script src="{{ asset('js/my-app.js') }}"></script>
 ```
