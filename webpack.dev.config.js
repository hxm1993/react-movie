const merge = require('webpack-merge');
var proxy = require('http-proxy-middleware')  
const path = require('path');
var webpack = require('webpack');
const commonConfig = require('./webpack.common.config.js');


const devConfig = {
    // devtool: 'inline-source-map',     会报错，错误为在当前使用的简化好的版本，可能不太适应你的生产环境，它建议你自己做简化
    devtool: 'eval-source-map',   //inline-source-map在浏览器调试模式可以查看错误出现的位置，还可以打断点
    /*入口*/
    // entry: path.join(__dirname, 'src/index.js'),
    // entry: [
    //     'react-hot-loader/patch',
    //     path.join(__dirname, 'src/index.js')
    // ],
    // 提取公共代码
    entry: {
        app: [
            'babel-polyfill',
            'react-hot-loader/patch',
            path.join(__dirname,"src/index.jsx")
        ]
    },
    /*输出到dist文件夹，输出文件名字为bundle.js*/
     output: {
        filename: '[name].[hash].js',
    },
    module: {
	    rules: [
            {
               test: /\.css$/,
               use: ['style-loader', 'css-loader',"postcss-loader"]
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                exclude: /^node_modules$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
	},
	// devServer: {
	// 	// Q: --content-base是什么？
	// 	// A：URL的根目录。如果不设定的话，默认指向项目根目录。
	// 	// webpack-dev-server编译后的文件，都存储在内存中，我们并不能看见的。你可以删除之前遗留的文件dist/bundle.js
 //        contentBase: path.join(__dirname, './dist'),
 //        port:3000,
 //        historyApiFallback: true,
 //        host: '0.0.0.0'
 //    },
    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new webpack.DefinePlugin({
          'process.env': {
              'NODE_ENV': JSON.stringify('development')   //指定环境
           }
        })
    ],

    devServer: {  
         host: 'localhost',  
         port: '3000',  
         proxy: {
            '/api': {
                target: 'http://m.maizuo.com/v4',
                secure: true,
                changeOrigin: true
            }
        }
    }  
};


let config = merge({
    customizeArray(a, b, key) {
        /*entry.app不合并，全替换*/
        if (key === 'entry.app') {
            return b;
        }
        return undefined;
    }
})(commonConfig, devConfig)
console.log(config)
module.exports = config;