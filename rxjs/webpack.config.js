var webpack = require('webpack')
var htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: {
		app: ['./index.js']
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].js'
	},
	module: {
		loaders: [
			{ 
				test: '/\.js$/', 
				loader: 'babel-loader',
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			template: './index.html',
			filename: 'index.html',
			inject: 'body'
		})
	],
	devServer: {
		historyApiFallback: true,
    	noInfo: true
	},
	devtool: 'eavl-source-map'
}