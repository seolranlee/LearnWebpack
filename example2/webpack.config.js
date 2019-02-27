var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
var path = require('path');

module.exports = {
    entry: {
        main: './app/index.js',
        vendor: [
            'moment',
            'lodash'
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    // webpack 4.x부터는 이걸로 해결
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        },
        runtimeChunk: {
            name: 'manifest',
        }
    },
    plugins: [
        new ManifestPlugin({
            fileName: 'manifest.json',
            basePath: './dist/'
        })
    ]
}