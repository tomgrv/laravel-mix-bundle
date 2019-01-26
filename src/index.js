const mix = require('laravel-mix');

mix.extend('bundle', new class {

    register(params) {
        Config.sourceFile = params.sourceFile || 'resources/assets/index.js';
        Config.outputName = params.outputName || process.env.npm_package_name || 'app';
        Config.extractVueStyles = '[name].css';
        Config.postCss.push(
            require('postcss-url')({
                url: (asset, dir, options, decl, warn, result) => {
                    if (path.isAbsolute(asset.originUrl)) {
                        const relativeUrl = path.relative(decl.source.input.file, asset.absolutePath);
                        return relativeUrl.replace(/\\/g, '////');
                    }
                }
            })
        );

        mix
            .js(Config.sourceFile, '.build/package.js')
            .extract()
            .babel(Config.publicPath + '/.build/*.js', Config.publicPath + '/js/' + Config.outputName + (Mix.inProduction() ? '.min.js' : '.js'))
            .babel(Config.publicPath + '/.build/*.css', Config.publicPath + '/css/' + Config.outputName + (Mix.inProduction() ? '.min.css' : '.css'))
    }

    dependencies() {
        const deps = pkg.sync().pkg.bundleDependencies || [];
        deps.push('postcss-url', 'read-pkg-up');
        return deps;
    }

});
