let mix = require('laravel-mix');


class Bundle {

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
        return ['postcss-url']
    }

}


mix.extend('bundle', new Bundle());