module.exports = {

    entry: {
        main: './app/main.jsx',
    },

    output: {
        publicPath: 'app/scripts/',
        path: './app/scripts',
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            }
        ]
    }
};