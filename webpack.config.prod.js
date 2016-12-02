var path = require('path');
var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {

  entry: {
    app: [
      path.join(__dirname, 'src/shared/theme/styles/app.scss'),
      path.join(__dirname, 'src/client/client.prod.js')
    ],
    vendor: [
      "es6-promise",
      "isomorphic-fetch",
      "firebase",
      "normalizr",
      "react",
      "react-cookie",
      "react-dom",
      "react-helmet",
      "react-redux",
      "react-router",
      "react-router-redux",
      "react-router-scroll",
      "redux",
      "redux-form",
      "redux-thunk",
      "reselect"
    ]
  },

  output: {
    path: path.join(__dirname, "static", "build"),
    publicPath: "/build/",
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].chunk.js'
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules|\.git/,
        loader: 'babel-loader',
        query: {
          babelrc: false,
          presets: [
            ["es2015", { "modules": false, loose: true }],
            "react",
            "stage-0"
          ],
          plugins: [
            "lodash", 
            "transform-react-constant-elements",
            "transform-react-remove-prop-types", 
            "transform-react-pure-class-to-function"
          ]
        }
      }, {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({ 
          fallbackLoader: 'style-loader',
          loader: 'css-loader'
        })
      }, {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                importLoaders: 2,
                localIdentName: '[name]__[local]___[hash:base64:5]',
                minimize: true,
              },
            },
            'postcss-loader',
            {
              loader: 'sass-loader',
              query: {
                includePaths: [path.join(__dirname, "src/shared/theme/styles")],
              },
            },
          ],
        })
      }, {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
      }, {
        test: /\.(jpg|png|gif)$/,
        loaders: [
          'file-loader',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ],
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
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'BROWSER': JSON.stringify(true)
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new AssetsPlugin({
      filename: 'assets.json',
      path: path.join(__dirname, 'static'),
      prettyPrint: true
    }),
    new ExtractTextPlugin({ 
      filename: '[name]-[contenthash].css',
      allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.scss$/,
      options: {
        context: __dirname,
        postcss: [
          autoprefixer({ browsers: ['last 2 versions', 'IE > 10'] }),
        ],
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity
    }),
    new ProgressBarPlugin()
  ]
};