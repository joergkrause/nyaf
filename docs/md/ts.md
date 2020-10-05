## Project Configuration with TypeScript

An **ny@f** application consists of:

1. An entry file for registering components, typically called *main.ts*
2. At least one root component
3. The *index.html* file the browser loads first
4. The configuration for TypeScript, *tsconfig.json*
5. The Packer / Builder setup;

The best choice for a Packer is probably WebPack, in that case a *webpack.config.js* file is recommended.

### The Entry File

The recommended folder structure looks like this:
<style>
  code.txt { white-space: pre !important; }
</style>
~~~txt
|
\--\src
|  |-- index.html
|  |-- main.ts
|  \-- \components
|  |             |
|  |             \-- main.component.tsx
|  |
|  \-- \assets
|
|-- webpack.config.js
|-- tsconfig.json
~~~

The application starts with the code in *main.ts* and the basics structure looks like Figure A-1.

![Figure A-1: Entry File](assets/main_ts.png)

### TypeScript Configuration

The TypeScript configuration is typical, but two things are crucial to know:

1. You need to compile with the target "es2015" (minimum). ES 5 is explicitly not supported anymore.
2. The template language is a variety of JSX, so the setting *"jsx"* and *"reactNamespace"* are required.

> **ny@f** does not use React, has no relation to React and has almost nothing in common. The setting just tricks the compiler to transpile the templates.

~~~json
{
  "compilerOptions": {
    "target": "es2015",
    "module": "commonjs",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "sourceMap": true,
    "lib": ["es2018", "es5", "dom"],
    "jsx": "react",
    "reactNamespace": "JSX",
    "declaration": false,
    "experimentalDecorators": true,
    "noImplicitAny": false,
    "suppressImplicitAnyIndexErrors": true,
    "removeComments": false,
    "outDir": "out-tsc",
    "baseUrl": "./src",
    "typeRoots": [
      "node_modules/@types",
      "src/types"
    ]
  },
  "files": ["./src/main.ts"]
}
~~~

First, the target must be "es2015" or higher. There are some native features used here that don't have polyfills. The recommended template language is JSX (or in TypeScript it's called TSX). It's not enforced, you can also use pure string templates, but all examples in this documentation and the snippets shown online are using JSX. Hence the following settings are highly recommended:

* "jsx": "react" -- this activates JSX, though we don't use React
* "reactNamespace": "JSX" -- the name of the support class in **ny@f** (this **is** mandatory if JSX is used)

All other settings follow the common requirements of a typical TypeScript application.

### WebPack Configuration

WebPack is the recommended packer tool, but you can use any other if you like. There is no dependency.

A typical configuration will look like this:

~~~js
const dev = process.env.NODE_ENV === 'dev';
const path = require('path');
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
    'app': './src/main.ts' // App entry point
  },
  // How the different types of modules within
  // a project will be treated
  module: {
    rules: [
      { test: /\.ts|\.tsx$/, loader: 'ts-loader' },
      // All files with a '.scss' extension
      // will be handled by sass-loader
      {
        test: /\.(scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpeg)$/,
        loader: 'url-loader?limit=8192'},
      {
        test: /\.(woff|woff2)$/,
        loader: 'file-loader'
      }
    ]
  },
  // Configure how modules are resolved
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss']
  },
  // How and where webpack should output
  // bundles, assets and anything else
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js'
  },
  // Customize the webpack build process with additional plugins
  plugins: [
    new HtmlWebpackPlugin(indexConfig)
  ]
};

// Export the config
module.exports = webpackConfig;
~~~

See the comments inline for important explanations. Apart from this the configuration has no special settings and follows the common rules of a typical WebPack setup.
