var autoprefixer = require('autoprefixer');
var postcssImport = require('postcss-import');
var postcssUrl = require('postcss-url');

module.exports = {
    context: __dirname + '/src',
    entry: './app.js',
    output: {
        path: __dirname + '/build',
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-1']
                }
            },
            {
                test: /\.css/,
                loaders: ['style', 'css', 'postcss']
            },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
        ]
    },
    postcss: function () {
        return [postcssImport, postcssUrl, autoprefixer];
    },
    devServer: {
        contentBase: './public',
        historyApiFallback: {
            index: 'index.html'
        }
    }
};
