// @AngularClass

var helpers = require('./helpers');
// Webpack Plugins
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin  = require('webpack/lib/DefinePlugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ENV = process.env.ENV = process.env.NODE_ENV = 'test';

/*
 * Config
 */
module.exports = helpers.defaults({
  devtool: 'inline-source-map',
  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: [
          helpers.root('node_modules')
        ]
      },
      {
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: [
          helpers.root('node_modules/rxjs')
        ]
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        query: {
          "compilerOptions": {
            "noEmitHelpers": true,
            "removeComments": true,
          }
        },
        exclude: [ /\.e2e\.ts$/ ]
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.css$/,  loader: 'raw-loader' },
      
      // This is for global styles
      { test: /shared\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader") },
      
      { test: /\.png$/,  loader: "file-loader?name=assets/img/[name].[ext]?[hash]" },
      
      { test: /\.less$/,  loader: "raw!less", exclude: [ helpers.root('src/app/shared.less')] }
    ],
    postLoaders: [
      // instrument only testing sources with Istanbul
      {
        test: /\.(js|ts)$/,
        include: helpers.root('src'),
        loader: 'istanbul-instrumenter-loader',
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/
        ]
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      // Environment helpers
      'process.env': {
        'ENV': JSON.stringify(ENV),
        'NODE_ENV': JSON.stringify(ENV)
      }
    }),
    
    new ExtractTextPlugin("[name].css"),
    new ProvidePlugin({
      // TypeScript helpers
      '__metadata': 'ts-helper/metadata',
      '__decorate': 'ts-helper/decorate',
      '__awaiter': 'ts-helper/awaiter',
      '__extends': 'ts-helper/extends',
      '__param': 'ts-helper/param',
    })
  ],
});

