const path = require('path');
const webpack = require('webpack');

const useBundleAnalizer = !!process.env.BUNDLE_ANALYZER;
const outputPath = path.join(process.cwd(), 'node_modules/.dlls');

module.exports = {
    mode: 'development',

    devtool: 'eval',

    target: 'web',

    entry: {
        dllDeps: [
            'connected-react-router/immutable',
            'history',
            'immutable',
            'intl',
            'prop-types',
            'react',
            'react-dom',
            'react-helmet',
            'react-hot-loader',
            'react-intl',
            'react-loadable',
            'react-redux',
            'react-router-dom',
            'redux',
            'redux-immutable',
            'redux-saga',
            'reselect',
            'styled-components',
        ],
    },

    resolve: {
        extensions: ['.js', '.jsx', '.react.js'],
        mainFields: ['browser', 'jsnext:main', 'main'],
    },

    optimization: {
        minimize: false,
    },

    performance: {
        hints: false,
    },

    output: {
        crossOriginLoading: 'anonymous',
        publicPath: '/static/',
        filename: '[name].dll.js',
        path: outputPath,
        library: '[name]_[hash]',
    },

    plugins: [
        useBundleAnalizer && new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)(),

        new webpack.DllPlugin({
            path: path.join(outputPath, '[name]-manifest.json'),
            name: '[name]_[hash]',
        }),
    ].filter(Boolean),
};
