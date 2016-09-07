const path = require('path')
const autoprefixer = require('autoprefixer')

module.exports = {
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?module&importLoaders=2',
          'sass-loader',
          'postcss-loader',
        ],
        include: path.resolve(__dirname, '../'),
      },
    ],
  },

  resolve: {
    extensions: ['', '.json', '.js', '.jsx'],
    root: [
      path.join(__dirname, '..', 'src'),
      path.join(__dirname, '..', 'node_modules'),
    ],
  },

  postcss: [
    autoprefixer({ browsers: ['last 2 versions', 'IE > 10'] }),
  ],
}
