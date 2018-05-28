const path = require("path");

const commonConfig = require('./webpack.common.config.js');
const merge = require('webpack-merge');

var webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');   //webpack使用UglifyJSPlugin来压缩生成的文件。使得打包后的文件大小减少很多
const CleanWebpackPlugin = require('clean-webpack-plugin');  //每次打包前自动清理[dist](下面配置的)文件
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const publicConfig = {
	devtool: 'cheap-module-source-map',

	module: {
		rules:[
            //分离css
			     {
                test: /\.css$/,
                exclude: path.join(__dirname,'node_modules'),
                use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: ["css-loader","postcss-loader"]
                })
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                exclude: /^node_modules$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                          limit: 10000,
                          name: 'icon/[name].[ext]'
                        }
                    }
                ]
            }
		]
	},
	plugins: [
        
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
          'process.env': {
              'NODE_ENV': JSON.stringify('production')   //指定环境
           }
        }),
        new CleanWebpackPlugin(['dist/*.*']),
        new ExtractTextPlugin({
             filename: 'css/[name].[hash].css',
             allChunks: true
        })
    ]
}

module.exports = merge(commonConfig, publicConfig);