const dev = process.env.NODE_ENV === 'dev';
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
      {
        test: /\.ts|\.tsx$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.webpack.json'
        }
      },
    ]
  },
  externals: [
    '@nyaf/lib'
  ],
  // Configure how modules are resolved
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [
      path.resolve('./src'),
      path.resolve('./src/packages'),
      path.resolve('./node_modules')
    ],
    alias: {
      //      modules: path.join(__dirname, 'node_modules'),
      '@nyaf/lib': path.join(__dirname, 'src/packages/@nyaf/lib'),
      '@nyaf/forms': path.join(__dirname, 'src/packages/@nyaf/forms'),
      '@nyaf/store': path.join(__dirname, 'src/packages/@nyaf/store')
    },
    // plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.webpack.json" })]
  },
  // How and where webpack should output bundles, assets and anything else
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    filename: '@nyaf/[name]/[name].umd.js'
  },
  // What bundle information gets displayed
  stats: {
    warnings: false,
    assets: false,
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
        { from: '**/*.d.ts', to: '@nyaf/lib', context: path.resolve(__dirname, 'out-tsc/@nyaf/lib') },
        { from: '**/*.d.ts', to: '@nyaf/forms', context: path.resolve(__dirname, 'out-tsc/@nyaf/forms') },
        { from: '**/*.d.ts', to: '@nyaf/store', context: path.resolve(__dirname, 'out-tsc/@nyaf/store') },
        {
          from: '@nyaf/cli/**/*',
          context: './src/packages',
          to: '',
          toType: 'dir'
        }
      ],
      options: {
        concurrency: 100
      }
    }),
  ]
};

if (dev) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

// Export the config
module.exports = webpackConfig;
