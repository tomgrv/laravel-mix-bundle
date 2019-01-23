<p align="center">
<a href="https://www.npmjs.com/package/laravel-mix-bundle"><img src="https://img.shields.io/npm/v/laravel-mix-bundle.svg" alt="NPM"></a>
<a href="https://npmcharts.com/compare/laravel-mix-bundle?minimal=true"><img src="https://img.shields.io/npm/dt/laravel-mix-bundle.svg" alt="NPM"></a>
<a href="https://www.npmjs.com/package/laravel-mix-bundle"><img src="https://img.shields.io/npm/l/laravel-mix-bundle.svg" alt="NPM"></a>
</p>

# Laravel Mix Bundle

This extension provides zero configuration Webpack asset bundling support to your Mix (v2.1 and up) builds.

This extension will:
*  Generate in your public folder a unique js and a unique css file containing all js & css referenced from the specified entry source file, recursively:
    * Local project ressources
    * External, npm managed ressources
* Copy in your public folder all referenced assets (fonts, images) from the specified entry source file, recursively:
    * Local project ressources
    * External, npm managed ressources

All folders are taken from standard mix config.

In production mode, js and css files will be minified and generated with the .min extension prefix

## Usage

First, install the extension.

```
npm install laravel-mix-bundle --save-dev
```

Then, require it within your `webpack.mix.js` file, like so:

```js
let mix = require('laravel-mix');

require('laravel-mix-bundle');

mix.setPublicPath('public')
    .bundle({
        sourceFile : "resources/assets/index.js"
        outputName : "app"
    });
```

And you're done! Compile everything down with `npm run dev`.
