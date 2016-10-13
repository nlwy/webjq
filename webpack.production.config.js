/*
 * @Author: y_4132@qq.com
 * @Date:   2016-10-12 12:21:32
 * @Last Modified by:   y_4132@qq.com
 * @Last Modified time: 2016-10-12 16:22:48
 */

'use strict';
var path               = require('path');
var precss             = require('precss');
var webpack            = require('webpack');
var autoprefixer       = require('autoprefixer');
var HtmlWebpackPlugin  = require('html-webpack-plugin');
var ExtractTextPlugin  = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');
/**
 * [plugins 插件配置]
 * @type {Array}
 */
var plugins = [
	/**
	 * [template 生成并压缩html文件]
	 * @type {[type]}
	 */
	new HtmlWebpackPlugin({
		template: __dirname + "/app/index.tmpl.html", //new 一个这个插件的实例，并传入相关的参数
		//压缩html
		minify: {
			collapseWhitespace: true,
			collapseInlineTagWhitespace: true,
			removeRedundantAttributes: true,
			removeEmptyAttributes: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true,
			removeComments: true
		}
	}),
	/**
	 * [verbose 清理编译后的文件不叠加生成]
	 * @type {[type]}
	 */
	new CleanWebpackPlugin(
		['build'], {
			verbose: true
		}
	),
	/**
	 * [name 打包第三方库]
	 * @type {String}
	 */
	new webpack.optimize.CommonsChunkPlugin({
		name: 'vendor',
		minChunks: Infinity
	}),
	/**
	 * [output 压缩生成的代码包括css和js]
	 * @type {Object}
	 */
	new webpack.optimize.UglifyJsPlugin({
		output: {
			comments: false, // 去掉所有注释
		},
		compress: {
			warnings: false
		},
		mangle: {
			except: ['$', 'exports', 'require']
		}
	}),
	/**
	 * [NODE_ENV 开发模式]
	 * @type {[type]}
	 */
	new webpack.DefinePlugin({
		"process.env": {
			NODE_ENV: JSON.stringify(process.env.NODE_ENV)
		}
	}),
	new webpack.HotModuleReplacementPlugin(), //热加载插件
	new webpack.optimize.AggressiveMergingPlugin(), //合并相似chunk
	new webpack.optimize.OccurenceOrderPlugin(), //为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
	new webpack.NoErrorsPlugin(), //保证编译不能出错
	new ExtractTextPlugin("[name].[hash].css")//抽出css文件
];
module.exports = {
	entry: {
		index: __dirname + '/app/index.js',
		vendor: ['react', 'react-router', 'react-dom']
	},
	output: {
		publicPath: __dirname + '/build',
		path: __dirname + '/build', //打包后文件输出位置
		filename: "js/[hash:8].[name].js" //打包后输出文件名 8位[文件名]-[hash].js
	},
	postcss: function() {
		return {
			defaults: [precss, autoprefixer],
			cleaner: [autoprefixer({
				browsers: ["ios >= 7", "android >= 4.0"]
			})]
		};
	},
	module: {
		loaders: [{
			test: /\.json$/,
			loader: "json"
		}, {
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel'
		}, {
			test: /\.(jpe?g|png|gif|svg)$/i,
			loaders: [
				"file?limit=8192&name=image/[hash:16].[ext]",
				"image-webpack?bypassOnDebug&optimizationLevel=9&interlaced=false"
			]
		}, {
			test: /\.css$/,
			loader: ExtractTextPlugin.extract('style', 'css!modules&localIdentName=[hash:8].[local]!postcss')
		}, {
			test: /\.scss$/,
			loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[hash:8].[local]!postcss!sass')
		}, {
			test: /\.(eot|svg|ttf|woff)/,
			loader: 'file?limit=8192&name=fonts/[hash].[ext]'
		}]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	plugins: plugins
};