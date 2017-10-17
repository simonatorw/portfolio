//init
const path = require('path');
const webpack = require('webpack');

//plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CssPlugin = new ExtractTextPlugin({
	filename: '[name].[contenthash:8].css'
});
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

//path
const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build')
};

//production configuration
const prodConfig = {
    entry: {
		app: PATHS.app,
		vendor: [
			'react',
			'react-dom',
			'react-redux',
			'redux',
			'babel-polyfill',
			'redux-saga',
			'chartist'
		]
	},
    output: {
        path: PATHS.build,
		filename: '[name].[chunkhash:8].js'
    },
	resolve: {
		extensions: ['.js', '.jsx']
	},	
    module: {
        rules: [
			{
				test: /\.css$/,
				use: CssPlugin.extract({
					use: ['css-loader', 'postcss-loader'],
					fallback: 'style-loader'
				})
			},
            { 
                test: /\.jsx?$/, 
				include: PATHS.app, 
				use: [
					{
						loader: 'babel-loader', 
						options: {
							cacheDirectory: true,
							presets: ['react', 
								["env", {
									"modules": false,
									"targets": {
										"browsers": ["last 2 versions"]
									}
								}]
							],
							plugins: ['transform-class-properties', 'transform-object-rest-spread'],
							env: {
								test: {
									plugins: ['transform-es2015-modules-commonjs']
								}
							}
						}
					}
				]
            }				
        ]
    },	
	plugins: [
		new CleanWebpackPlugin(PATHS.build),
		new webpack.optimize.ModuleConcatenationPlugin(),		
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),		
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		CssPlugin,
		new OptimizeCssAssetsPlugin(),
        new HtmlWebpackPlugin({
			title: 'Open Point',
			favicon: 'favicon.ico'
		}),		
		new Visualizer()	
	]
};

//development configuration
const devConfig = {
	entry: {
		app: PATHS.app
	},
	output: {
		path: PATHS.build,
		filename: '[name].js'
	},	
    module: {
        rules: [
            { 
                test: /\.jsx?$/, 
				include: PATHS.app, 
				use: [
					{
						loader: 'babel-loader', 
						options: {
							cacheDirectory: true,
							presets: ['react', 
								["env", {
									"modules": false,
									"targets": {
										"browsers": ["last 2 versions"]
									}
								}]							
							],
							plugins: ['transform-class-properties', 'transform-object-rest-spread'],
							env: {
								test: {
									plugins: ['transform-es2015-modules-commonjs']
								}
							}
						}
					}
				]
            },
			{
				test: /\.css$/,
				use: [
					'style-loader', 
					{ loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 }}, 
					'postcss-loader'
				]
			}				
        ]
    },	
	resolve: {
		extensions: ['.js', '.jsx']
	},		
	devtool: 'eval-source-map',
	devServer: {
		historyApiFallback: true,
		stats: 'errors-only',
		host: process.env.HOST,
		port: process.env.PORT,
		overlay: {
			errors: true,
			warnings: true
		}
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new HtmlWebpackPlugin({
			title: 'Open Point',
			favicon: 'favicon.ico'
		})
	]	
};

//run build!
module.exports = (env) => {
	console.log('env', env);
	if (env === 'production') {
		return prodConfig;
	} else if (env === 'development') {
		return devConfig;
	}
	
};