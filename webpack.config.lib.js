const dev = process.env.NODE_ENV === 'dev';
const path = require('path');
const webpack = require('webpack');

const webpackConfig = {
  mode: 'development',
  // How source maps are generated : style of source mapping
  devtool: dev ? 'eval-cheap-module-source-map' : false,
  // Where webpack looks to start building the bundle
  entry: {
    lib: './projects/@nyaf/lib/src/index.ts',
    forms: './projects/@nyaf/forms/src/index.ts',
    store: './projects/@nyaf/store/src/index.ts'
  },
  // How the different types of modules within a project will be treated
  module: {
    rules: [
      { test: /\.ts|\.tsx$/, loader: 'ts-loader' },
    ]
  },
  // Configure how modules are resolved
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [path.resolve('./src'), path.resolve('./node_modules')],
    alias: {
      // bind to modules;
      modules: path.join(__dirname, 'node_modules'),
      nyaf: path.join(__dirname, 'projects/@nyaf/lib/src')
    }
  },
  // How and where webpack should output bundles, assets and anything else
  output: {
    path: path.resolve('./dist'),
    libraryTarget: 'umd',
    filename: '@nyaf/[name]/[name].umd.js'
  },
  // What bundle information gets displayed
  stats: {
    warnings: false
  },
  // Target a specific environment (cf. doc)
  target: 'web',
  // Configure whether to polyfill or mock certain Node.js globals and modules
  node: {
    __dirname: false
  }
};

// Export the config
module.exports = webpackConfig;
