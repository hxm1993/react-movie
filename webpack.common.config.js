const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');   //这个插件，每次会自动把js插入到你的模板index.html里面去。
const webpack = require('webpack');

commonConfig = {
    entry: {
        app: [
            "babel-polyfill",
            path.join(__dirname,"src/index.jsx")
        ],
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[name].[chunkhash].js',   //chunkFilename是除了entry定义的入口js之外的js,如果不加这个参数，按需加载的时候名字都是0.bundle.js这样子的，这分不清楚是哪个页面的js呀
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory=true'],
                include: path.join(__dirname, 'src')
            }, 
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192      //options limit 8192意思是，小于等于8K的图片会被转成base64编码，直接插入HTML中，减少HTTP请求。
                    }
                }]
            },
            {
                test: /\.jsx?$/,
                loaders:['babel-loader?presets[]=es2015&presets[]=react'],
                exclude: path.join(__dirname,'node_modules')
            },
            {
              test: /\.sass$/,
              loaders: ["style-loader", "css-loader?sourceMap", "sass-loader?sourceMap"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        }),
        new webpack.HashedModuleIdsPlugin(),

        //webpack4以前
        // //生成vender.xxx.js文件，用来包含entry中的vendor配置项中的js文件，这些文件一般都是不需要更新文件公共代码，使用户缓存下来。从此以后，用户再也不用下载这些库了，无论是否发布项目
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor'
        // }),
        // //注意，引入顺序在这里很重要。CommonsChunkPlugin 的 'vendor' 实例，必须在 'runtime' 实例之前引入。
        // //优化缓存：使得vendor.xxx.js字永久不变，因为这个是一直缓存在用户本地的。
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'runtime'
        // })
        // 
        new webpack.HashedModuleIdsPlugin(),
        new webpack.NamedChunksPlugin(chunk => chunk.name || 'faceless-chunk'), // a chunk has no name!!!
    ],
    optimization: {
        splitChunks: {
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              chunks: 'initial',
              name: 'vendor',
            }
          }
        }
    },

    resolve: {
        extensions:['.js',".jsx"],
    }
};

module.exports = commonConfig;