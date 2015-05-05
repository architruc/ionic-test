/**
 * Created by yo on 20/10/14.
 */

// Run in shell:
// webpack --progress --colors --watch --harmony
// Build:
// webpack --progress --colors --harmony -p

//var webpack = require("webpack");
var glob = require("glob");

module.exports = {
    devtool: 'source-map',

    //resolve: {
    //    alias: {
    //        // Aliases
    //        cssFolder: __dirname + "/public/css",
    //        jsFolder: __dirname + "/public/js",
    //        src: "jsFolder/src",
    //        dataFolder: "jsFolder/src/data",
    //        modelFolder: "jsFolder/src/model",
    //        lib: "jsFolder/lib",
    //        config: "src/config/config.js",
    //        env: "src/config/env.js",
    //        React: "react"
    //
    //    },
    //    root: [
    //        __dirname + '/public/js/lib',
    //        __dirname + '/node_modules'
    //        //,__dirname + '/bower_components'
    //    ]
    //},

    resolve: {root: [__dirname + '/www/lib']},

    //entry: "src/main.js",
    entry: glob.sync('./src/js/**/*.js'),

    output: {
        path: __dirname + "/www/js",
        filename: "app.bundle.js",//[name]
        publicPath: "/js/"
    },

    // These modules are implicitly required.
    //plugins: [
    //    new webpack.ProvidePlugin({
    //        _: "underscore",
    //        config: "config",
    //        env: "env",
    //        $: "jquery",
    //        T: "src/translate",
    //        Utils:"utils",
    //        PAAS:"PAAS",
    //        React:"react/addons",
    //        Actions:"./actions",
    //        Stores:"./stores",
    //        ReactBootstrap :"react-bootstrap",
    //        Router: "react-router",
    //        Link: "react-router/Link",
    //        LoaderComponent:"src/components/loaderComponent",
    //        Reflux: "reflux",
    //        userDb: "src/components/userDb",
    //        LOG: "src/utils/log"
    //    })
    //],

    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ],
        loaders: [
            //{test: /\.less$/, loader: "style-loader!css-loader!less-loader"},
            //{test: /\.css$/, loader: "style-loader!css-loader"},
            //{test: /\.json$/, loader: "json-loader"},
            //{test: /\.(eot|woff|woff2|svg|ttf|jpg|gif)$/, loader: "file-loader"},
            //{test: /\.png$/, loader: "url-loader?limit=100000&mimetype=image/png"},
            {test: /\.(js|jsx)$/, loader: 'babel'} // loaders can take parameters as a querystring
        ]
    }

};