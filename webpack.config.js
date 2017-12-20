module.exports = {
    context: __dirname + '/src',
    entry: {
        app: './main.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\-tpl.html$/,
            loader: 'handlebars-loader'
        }]
    }
};