var debug = process.env.NODE_ENV !== "production";
var Webpack = require('webpack');

module.exports = {
  context: __dirname + '/src',
  devtool: debug ? 'inline-sourcemap' : null,
  entry: './js/app.js',
  module: {
      loaders: [
        {
          test: /\.js?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015', 'stage-0'],
            plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
          }
        },
        {
          test: /\.scss$/,
          exclude: "/node_modules/",
          loaders: ["style", "css?sourceMap", "sass?sourceMap"]
        }
      ]
  },
  output: {
      path: __dirname + '/src/',
      filename: 'bundle.js'
  },
  plugins: debug ? [] : [
    new Webpack.optimize.DedupePlugin(),
    new Webpack.optimize.OccurenceOrderPlugin(),
    new Webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false}),
  ],
};
