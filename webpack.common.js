const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    entry: {
        app: './src/app.js'
    },
    plugins: [
        new CleanWebpackPlugin(['docs']),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        }),
        new HtmlWebpackPlugin({
            title: 'Caching',
            chunks: ['app', 'common'],
            template: './src/index.html',
            filename: 'index.html'
        }),
        new ExtractTextPlugin('style.css'),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: '[name].[hash].js',
        publicPath: "./"
    },
    module: {
        loaders: [{
            test: /\-tpl.html$/,
            loader: 'handlebars-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /(node_modules)/
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.scss/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use:  ['css-loader', 'sass-loader']
              })
        }, {
            test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader',
            options: {
                name: '[hash].[ext]',
                limit: 10000
            }
        }]
    }
};