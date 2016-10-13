/*
 * @Author: nlwy
 * @Date:   2016-09-27 20:27:24
 * @Last Modified by:   y_4132@qq.com
 * @Last Modified time: 2016-10-12 17:09:00
 */

var path              = require('path');
var precss            = require('precss');
var webpack           = require('webpack');
var autoprefixer      = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var config = {
	/**
	 * [entry 入口文件配置]
	 * @type {String or Object}
	 */
	entry: {
		index: __dirname + '/app/index.js',
		vendor: ['react', 'react-dom']
	}, //__dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
	/**
	 * [output 入口文件输出配置]
	 * @type {Object}
	 */
	output: {
		path: __dirname + "/build", //打包后文件输出位置
		filename: "js/[hash:8].[name].js" //打包后输出文件名
	},
	/**
	 * [module loader 处理器配置]
	 * @type {Object}
	 */
	module: {
		loaders: [{
			test: /\.json$/,
			loader: "json"
		}, {
			test: /\.css$/,
			//分离css文件
			loader: 'style!css?modules&localIdentName=[local]!postcss' //添加对样式表的处理
		}, {
			test: /\.scss?$/,
			exclude: /node_modules/,
			loader: 'style!css?modules&localIdentName=[local]!postcss!sass' //添加对样式表的处理
		}, {
			test: /\.ttf|.eot|.woff|.svg/,
			loader: 'url?limit=1024&name=[hash:8].[name].[ext]'
		}, {
			test: /\.(png|jpg|gif)$/,
			loader: 'url?limit=1024&name=[hash:8].[name].[ext]'
		}, {
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel'
		}]
	},
	postcss: function() {
		return {
			defaults: [precss, autoprefixer],
			cleaner: [autoprefixer({
				browsers: ["ios >= 7", "android >= 4.0"]
			})]
		};
	},
	/**
	 * [devServer 本地服务器配置]
	 * @type {Object}
	 */
	devServer: {
		//contentBase: "./build", //本地服务器所加载的页面所在的目录
		//port: 3000, //设置默认监听端口，如果省略，默认为”8080“
		colors: true, //终端中输出结果为彩色
		historyApiFallback: true, //不跳转
		inline: true, //实时刷新
		hot: true //是否热更新
	},

	plugins: [
		new OpenBrowserPlugin({ //自动打开浏览器
			url: 'http://localhost:8080'
		}),
		//第三方库单独打包
		new webpack.optimize.CommonsChunkPlugin({
			minChunks: 5,
			names: 'vendor'
		}),
		new HtmlWebpackPlugin({
			template: __dirname + "/app/index.tmpl.html", //new 一个这个插件的实例，并传入相关的参数
		}),
		new webpack.HotModuleReplacementPlugin() //热加载插件
	],
}
module.exports = config;