var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var PACKAGE = require('./package.json');

module.exports = {
    entry: {
        'dist/outkit-animator.js': './src/index.ts'
    },
    output: {
        path: path.resolve(__dirname),
        filename: '[name]',
        libraryTarget: 'umd',
        library: 'ok-animator'
    },
    resolve: {
        modules: [path.resolve(__dirname, '/src'), 'node_modules/'],
        descriptionFiles: ['package.json'],
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [
            // Typescript
            { test: /\.ts$/, loader: 'babel-loader?presets[]=es2015!ts-loader' }
        ]
    },
    plugins: [
        new webpack.BannerPlugin("Outkit Animator v" + PACKAGE.version + " - Copyright 2017" + (new Date().getFullYear() !== 2017 ? "-" + new Date().getFullYear() : "") + " James Ehly - MIT License"),
        new webpack.SourceMapDevToolPlugin({
            filename: null, // if no value is provided the sourcemap is inlined
            test: /\.(ts|js)($|\?)/i // process .js and .ts files only
        })
    ],
    // Development options...
    devtool: "source-map",
    devServer: {
        compress: true,
        port: 9000,
        watchContentBase: true,
        inline: true
    }
};