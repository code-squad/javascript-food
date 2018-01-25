module.exports = {
    context: __dirname + '/src',
    entry: {
        app: './app.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\-tpl.html$/,
            loader: 'handlebars-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                },
            ]
        }, {
            test: /\.scss/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                },
                {
                    loader: 'sass-loader'
                }
            ]
        }]
    },
    devtool: '#inline-source-map'
};