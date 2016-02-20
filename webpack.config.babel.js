import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';

const env = process.env.npm_lifecycle_event;
const paths = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, '.'),
};

let config = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: paths.dist,
        filename: 'cards.js',
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devtool: 'inline-source-map',
    module: {
        loaders: [
            {
                test: /\.css$/,
                include: paths.src,
                loaders: ['style', 'css'],
            },
            {
                test: /\.jsx?$/,
                include: paths.src,
                loader: 'babel-loader',
            }
        ],
    },
};

if (env === 'serve' || !env) {
    config = merge(config, {
        devServer: {
            contentBase: paths.dist,
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            stats: 'errors-only',
            host: process.env.HOST,
            port: process.env.PORT
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}

if(env === 'build') {
    config = merge(config, {});
}

export default config;
