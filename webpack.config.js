var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var nodeModules = {};

fs.readdirSync(path.resolve(__dirname, 'node_modules'))
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => { nodeModules[mod] = `commonjs ${mod}`; });

module.exports = [
    {
        name: 'browser',
        entry: [
            'babel-polyfill', './frontend/index'
        ],
        module: {
            loaders: [
                {
                    test: /\.js?$/, loader: 'babel-loader', exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    loaders: [
                        'style?sourceMap',
                        'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
                    ]
                }
            ]
        },
        resolve: {
            extensions: ['.js']
        },
        output: {
            path: path.join(__dirname, '/dist'),
            publicPath: '/',
            filename: 'bundle.js'
        },
        devServer: {
            contentBase: './dist',
            hot: true
        },
        plugins: [
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ]
    },
    {
        name: 'server',
        target: 'node',
        entry: [
            'babel-polyfill', './server'
        ],
        output: {
            path: path.join(__dirname, '/dist'),
            publicPath: 'bin/',
            filename: 'server.js'
        },
        externals: nodeModules,
        module: {
            loaders: [
                { test: /\.js$/,

                    loaders: [
                        'babel-loader'
                    ]
                },
                { test:  /\.json$/, loader: 'json-loader' },
            ]
        },
        node: {
            __dirname: true
        }
    }
];