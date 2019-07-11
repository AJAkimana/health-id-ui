const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  node: {
    fs: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader', 'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader', 'css-loader', 'sass-loader',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2?)$/,
        use: {
          loader: 'file-loader',

        },
      },
      {
        test: /\.(tsv|csv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      },

      {
        test: /\.(gif|png|jpe?g|svg|ico)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new Dotenv()
  ],
  devServer: {
    historyApiFallback: {
      disableDotRule: true,
    },
  },
};
