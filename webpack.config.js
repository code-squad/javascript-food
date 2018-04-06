module.exports = {
    context: __dirname + '/src',
    entry: {
        app: './app.js'
    },
    output: {
        path: __dirname + '/docs',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\-tpl.html$/,
            loader: 'handlebars-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.scss/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }]
    },
    devtool: '#inline-source-map'
};