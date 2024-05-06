const path = require('path');

module.exports = {
    entry: './src/main.ts',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'src', 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /(node_modules)/,
                use: 'ts-loader',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext][query]'
                }
            }
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'src'),
            watch: true,
        },
        compress: true,
        port: 8080,
        open: '/index.html'
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    devtool: 'source-map',
};
