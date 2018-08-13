const path = require('path');
const { HashedModuleIdsPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    mode: isProduction
        ? 'production'
        : 'development',

    devtool: isProduction
        ? undefined // 'source-map'
        : 'eval-source-map',

    target: 'web',
    entry: [
        './app/app.js',
    ],

    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/static/',
        ...(isProduction ? {
            filename: '[name].[chunkhash].js',
            chunkFilename: '[name].[chunkhash].chunk.js',
        } : {
            filename: '[name].js',
            chunkFilename: '[name].chunk.js',
        }),
    },

    optimization: isProduction
        ? {
            minimize: true,
            nodeEnv: 'production',
            sideEffects: true,
            concatenateModules: true,
            splitChunks: { chunks: 'all' },
            runtimeChunk: true,
        }
        : {
            minimize: false,
        },

    performance: isProduction
        ? {
            assetFilter: (assetFilename) => !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
        }
        : {
            hints: false,
        },

    resolve: {
        modules: ['node_modules', 'app'],
        extensions: ['.js', '.jsx', '.react.js'],
        mainFields: ['browser', 'jsnext:main', 'main'],
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules|packages/,
                use: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            // modules: true,
                            // localIdentName: '[local]'
                            // localIdentName: '[name]---[local]---[hash:base64:5]'
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins() {
                                return [
                                    require('precss'),
                                    require('autoprefixer'),
                                ];
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                // Preprocess our own .css files
                // This is the place to add your own loaders (e.g. sass/less etc.)
                // for a list of loaders, see https://webpack.js.org/loaders/#styling
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
            {
                // Preprocess 3rd party .css files located in node_modules
                test: /\.css$/,
                include: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(eot|otf|ttf|woff|woff2)$/,
                use: 'file-loader',
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            // Inline files smaller than 10 kB
                            limit: 10 * 1024,
                            noquotes: true,
                        },
                    },
                ],
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // Inline files smaller than 10 kB
                            limit: 10 * 1024,
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                enabled: false,
                                // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                                // Try enabling it in your environment by switching the config to:
                                // enabled: true,
                                // progressive: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 7,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                use: 'html-loader',
            },
            {
                test: /\.(mp4|webm)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                    },
                },
            },
        ],
    },

    plugins: [
        !!process.env.BUNDLE_ANALYZER && new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)(),

        new HtmlWebpackPlugin({
            inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
            template: 'app/index.html',

            ...(isProduction ? {
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                },
            } : {}),
        }),

        ...(isProduction ? [
            new HashedModuleIdsPlugin({
                hashFunction: 'sha256',
                hashDigest: 'hex',
                hashDigestLength: 20,
            }),
        ] : [
            new CircularDependencyPlugin({
                exclude: /a\.js|node_modules/, // exclude node_modules
                failOnError: false, // show a warning when there is a circular dependency
            }),
        ]),
    ].filter(Boolean),
};

module.exports.serve = require('./webpack-serve');
