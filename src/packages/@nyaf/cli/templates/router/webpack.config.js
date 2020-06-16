const dev = process.env.NODE_ENV === 'dev';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Main entry point
const indexConfig = {
  template: './src/index.html',
  inject: 'body',
  baseHref: './'
};

const webpackConfig = {
  mode: dev ? 'development' : 'production',
  devtool: dev ? 'eval-cheap-module-source-map' : false,
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    open: true,
    port: 9000
  },
  entry: {
    'app': './src/main.ts'
  },
  module: {
    rules: [
      { test: /\.ts|\.tsx$/, loader: 'ts-loader' },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: { extensions: ['.ts', '.tsx', '.js'] },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js'
  },
  stats: {
    warnings: false
  },
  target: 'web',
  node: {
    __dirname: false
  },
  plugins: [
    new HtmlWebpackPlugin(indexConfig),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/link.css',
          flatten: true,
          to: './assets/css/'
        }
      ]
    })
  ]
};

// Export the config
module.exports = webpackConfig;
