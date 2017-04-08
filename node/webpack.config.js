const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './client/src/index.js'
    ],

    output: {
        filename: '[name].[hash].js',
        path: resolve(__dirname, './client/dist'),
        publicPath: './client/public'
    },

    context: resolve(__dirname),

    devtool: 'inline-source-map',

    devServer: {
        hot: true,
        contentBase: resolve(__dirname, './client/dist'),
        publicPath: './client/public',
        historyApiFallback: true
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: [/node_modules/, /server/]
            },
            {
                test: /\.(scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|woff|woff2|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
                use: 'url-loader?limit=100000'
            }
        ],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            template: './client/public/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.IgnorePlugin(/^(net|http|child_process|timers|dns|fs|zlib)$/)
    ]
};