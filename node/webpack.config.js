const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './client/src/index.js'
    ],

    output: {
        filename: '[name].[hash].js',
        path: resolve(__dirname, 'dist'),
        publicPath: '/'
    },

    context: resolve(__dirname),

    devtool: 'inline-source-map',

    devServer: {
        hot: true,
        contentBase: resolve(__dirname, 'dist'),
        publicPath: '/',
        historyApiFallback: true
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loaders: 'babel-loader',
                include: [/client/],
                exclude: [/node_modules/, /server/]
            },
            {
                test: /\.(scss|css)$/,
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
            template: './client/src/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.IgnorePlugin(/^(net|http|child_process|timers|dns|fs|zlib)$/)
    ]
};