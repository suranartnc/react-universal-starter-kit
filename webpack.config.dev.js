var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var DashboardPlugin = require('webpack-dashboard/plugin');

var config = require('./src/shared/configs');

module.exports = {

  devtool: 'source-map',

  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${config.host}:${config.wdsPort}`,
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'src/shared/theme/styles/app.scss'),
    path.join(__dirname, 'src/client/client.dev.js')
  ],

  output: {
    path: path.join(__dirname, "static", "build"),
    publicPath: `http://${config.host}:${config.wdsPort}/build/`,
    filename: '[name].js',
    chunkFilename: "[name].chunk.js"
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules|\.git/,
        loader: 'babel-loader'
      }, {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            query: {
              module: true,
              importLoaders: 2,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
              includePaths: [path.join(__dirname, "src/shared/theme/styles")]
            }
          },
          'postcss-loader'
        ]
      }, {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
      }, {
        test: /\.(jpg|png|gif)$/,
        loaders: 'file-loader'
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.json', '.js'],
    modules: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'node_modules')
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        'BROWSER': JSON.stringify(true)
      }
    }),
    new DashboardPlugin()
  ],

  devServer: {
    port: config.wdsPort,
    hot: true,
    inline: false,
    historyApiFallback: true
  }
};