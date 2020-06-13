const dev = process.env.NODE_ENV === 'dev';
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');

const webpackConfig = {
  mode: dev ? 'development' : 'production',
  // How source maps are generated : style of source mapping
  devtool: dev ? 'eval-cheap-module-source-map' : false,
  // Where webpack looks to start building the bundle
  entry: {
    lib: './src/packages/@nyaf/lib/index.ts',
    forms: './src/packages/@nyaf/forms/index.ts',
    store: './src/packages/@nyaf/store/index.ts'
  },
  optimization: {
    minimize: dev ? false : true
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
      '@nyaf/lib': path.join(__dirname, 'src/packages/@nyaf/lib')
    },
    // plugins: [new TsconfigPathsPlugin( {  configFile: './tsconfig.json' })]

  },
  // How and where webpack should output bundles, assets and anything else
  output: {
    path: path.resolve(__dirname, 'dist'),
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
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: '**/README.md', to: '', context: 'src/packages', toType: 'dir' },
        { from: '**/package.json', to: '', context: 'src/packages', toType: 'dir' },
        { from: '**/*.d.ts', to: './@nyaf', context: 'out-tsc', toType: 'dir' },
        { from: 'store/*.d.ts', to: '@nyaf/store', context: 'out-tsc', toType: 'dir' },
        { from: 'forms/*.d.ts', to: '@nyaf/forms', context: 'out-tsc', toType: 'dir' }
      ],
      options: {
        concurrency: 10,
      }
    }),
    new TypedocWebpackPlugin({
      name: 'Contoso',
      mode: 'file',
      theme: './typedoc-theme/',
      includeDeclarations: false,
      ignoreCompilerErrors: true,
  })
  ]
};

// Export the config
module.exports = webpackConfig;
