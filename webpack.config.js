const dev = process.env.NODE_ENV === 'dev';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const exec = require('child_process').exec;

// Main entry point
const indexConfig = {
  template: './src/index.html',
  excludeChunks: ['electron'],
  inject: 'body',
  baseHref: './'
};

const webpackConfig = {
  mode: 'development',
  // How source maps are generated : style of source mapping
  devtool: dev ? 'eval-cheap-module-source-map' : false,
  // Development server configuration
  devServer: {
    historyApiFallback: true,
    // Execute custom middleware after all other middleware internally within the server
    after() {
      // Fix whitescreen bug on build with Electron BrowserWindow
      exec('electron . --dev');
    }
  },
  // Where webpack looks to start building the bundle
  entry: {
    electron: './src/win.ts', // Electron entry point
    app: './src/main.ts' // App entry point
  },
  // How the different types of modules within a project will be treated
  module: {
    rules: [
      { test: /\.ts|\.tsx$/, loader: 'ts-loader' },
      // All files with a '.scss' extension will be handled by sass-loader
      {
        test: /\.(scss)$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [require('autoprefixer'), require('postcss-flexbugs-fixes')];
              }
            }
          },
          'sass-loader'
        ]
        // })
      },
      // CSS loader
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
  // Configure how modules are resolved
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [path.resolve('./src'), path.resolve('./node_modules')],
    alias: {
      // bind to modules;
      modules: path.join(__dirname, 'node_modules')
    }
  },
  // How and where webpack should output bundles, assets and anything else
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js'
  },
  // What bundle information gets displayed
  stats: {
    warnings: false
  },
  // Target a specific environment (cf. doc)
  target: 'electron-main',
  // Configure whether to polyfill or mock certain Node.js globals and modules
  node: {
    __dirname: false
  },
  // Customize the webpack build process with additionals plugins
  plugins: [
    new HtmlWebpackPlugin(indexConfig),
    new CopyWebpackPlugin([
			{ from: './node_modules/msnodesqlv8/lib/bin/*.node', flatten: true, to: './bin' },
			{ from: './src/assets/*.png',
			  flatten: true, to: './assets/' },
      {
        from: './src/app/**/*.html',
        flatten: false,
        to: '.',
        transformPath(targetPath, absolutePath) {
          return targetPath.replace('src/app', '');
        }
      },
      {
        from: './src/assets/images/*.*',
        flatten: true,
        to: './assets/images/'
      },
      {
        from: './src/assets/styles/*.css',
        flatten: true,
        to: './assets/css/'
      },
      {
        from: './src/assets/styles/images/*.*',
        flatten: true,
        to: './assets/css/images'
      },
      {
        from: './src/assets/icons',
        flatten: false,
        to: './assets/icons/'
      },
      {
        from: './src/assets/fonts',
        flatten: false,
        to: './assets/fonts/'
      },
      {
        from: './src/assets/data',
        flatten: false,
        to: './'
      },
      {
        from: './package.dist.json',
        to: './package.json'
      }
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new webpack.DefinePlugin({
      __static: `"${path.join(__dirname, '/static').replace(/\\/g, '\\\\')}"`
    })
  ]
};

// Export the config
module.exports = webpackConfig;
