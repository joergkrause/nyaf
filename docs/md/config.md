# Configuration Files

Because the preferred installation is based on TypeScript, it's very recommended to use WebPack and TypeScript's configuration file *tsconfig.json*.

## Project

The *package.json* of your project may look like this:

~~~json
{
  "name": "your-project",
  "version": "0.0.0",
  "description": "My first @nyaf project",
  "main": "index.js",
  "scripts": {
    "test": "echo \"no test defined\"",
    "start": "webpack-dev-server",
    "build": "webpack"
  },
  "devDependencies": {
    "@types/node": "^12.12.26",
    "clean-webpack-plugin": "^3.0.0",
    "copy-webpack-plugin": "^6.0.2",
    "css-loader": "^3.6.0",
    "file-loader": "^6.0.0",
    "html-webpack-plugin": "^4.3.0",
    "postcss-loader": "^3.0.0",
    "style-loader": "^1.2.1",
    "ts-loader": "^7.0.5",
    "tsconfig-paths-webpack-plugin": "^3.2.0",
    "typescript": "^3.9.5",
    "webpack": "^4.41.5",
    "webpack-cli": "^3.3.10",
    "webpack-dev-server": "^3.10.1"
  },
  "dependencies": {
    "@nyaf/cli": "~0.6.2",
    "@nyaf/lib": "~0.6.2"
  }
}
~~~

Of course, you have to add anything you might need in addition to that, such as CSS frameworks, fonts, or specific libraries. Also it's worth to note that the various WebPack plug-ins are just a recommendation and you can replace the whole packer stuff with whatever you like. The only thing really needed is the package *@nyaf/lib*.

## TypeScript

The *tsconfig.json* looks like this:

~~~json
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
~~~

## WebPack

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

## The Build Process

Now, on command line, just type `npm run build`.

To start WebPack's dev server type:

~~~sh
npm start
~~~

An now enjoy writing a component based SPA with only 34 KB of lib code in total.

