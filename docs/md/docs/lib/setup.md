## Setup

Now, because it's based on TypeScript, it's very recommended to use WebPack and TypeScript's configuration file *tsconfig.json*.

The *tsconfig.json* looks like this:

~~~~~json
{
  "compilerOptions": {
    "target": "es2015",
    "module": "commonjs",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "sourceMap": true,
    "lib": [
      "es2018",
      "es5",
      "dom"
    ],
    "jsx": "react",
    "declaration": true,
    "reactNamespace": "JSX",
    "experimentalDecorators": true,
    "noImplicitAny": false,
    "suppressImplicitAnyIndexErrors": true,
    "removeComments": false,
    "outDir": "out-tsc",
    "baseUrl": "src",
    "typeRoots": [
      "node_modules/@types",
      "src/types"
    ]
  }
}
~~~~~

The *webpack.config.json* looks like this (with SCSS support and dev server):

~~~js
const dev = process.env.NODE_ENV === 'dev';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Main entry point
const indexConfig = {
  template: './src/index.html',
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
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  // Where webpack looks to start building the bundle
  entry: {
    app: './src/main.ts' // Demo app entry point
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
          'css-loader',
          'sass-loader'
        ]
        // })
      },
      // CSS loader
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  // Configure how modules are resolved
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss']
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
  target: 'web',
  // Customize the webpack build process with additionals plugins
  plugins: [
    new HtmlWebpackPlugin(indexConfig)
  ]
};

// Export the config
module.exports = webpackConfig;
~~~

The *package.json* gets an entry in `scripts` section:

~~~js
build: "webpack",
~~~

### The Build Process

Now, on command line, just type `npm run build`.

To start WebPack's dev server type:

~~~sh
npm start
~~~

An now enjoy writing a component based SPA with only 34 KB of lib code in total.

