const mix = require('laravel-mix');
const pkg = require('read-pkg-up');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

mix.extend(
	'bundle',
	new class {
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
				.js(Config.sourceFile, '.build/' + Config.outputName + '.js')
				.extract()
				.copy(Config.publicPath + '/.build/*.js', Config.publicPath + '/js/')
				.copy(Config.publicPath + '/.build/*.css', Config.publicPath + '/css/');
		}

		dependencies() {
			const deps = pkg.sync().bundleDependencies || [];
			deps.push('postcss-url', 'read-pkg-up', 'clean-webpack-plugin');
			return deps;
		}

		webpackConfig(webpackConfig) {
			webpackConfig.plugins.push(
				new CleanWebpackPlugin({
					cleanOnceBeforeBuildPatterns: [ './css', './js', './fonts' ],
					cleanAfterEveryBuildPatterns: [ './.build/**/*' ]
				})
			);
		}
	}()
);
