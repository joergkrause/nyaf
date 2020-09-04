## Project Configuration

An **@nyaf** application consists of:

1. An entry file for registering components, typically called *main.ts*
2. At least one root component
3. The *index.html* file the browser loads first
4. The configuration for TypeScript, *tsconfig.json*
5. The Packer / Builder setup;
  * The best choice is probably WebPack, in that case a *webpack.config.js* file is recommended

> To get a new project quickly you can use Yeoman and the various generators explained [here](yeoman)

### Entry File

The browser starts here and the basics structure looks like this:

![](/assets/main_ts.png)

The recommended folder structure looks like this:

~~~
|
\--\src
|  |-- index.html
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

### TypeScript Configuration

The TypeScript configuration is typical, but two things are crucial to know:

1. You need to compile with the target "es2015" (minimum). ES 5 is explicitly not supported anymore.
2. The template language is a variety of JSX, so the setting *"jsx"* and *"reactNamespace"* are required.

> **@nyaf** does not use React, has no relation to React and has almost nothing in common. The setting just tricks the compiler to transpile the templates.

~~~json
{
  "compilerOptions": {
    "target": "es2015",       // The target must be at least ES 2015
    "module": "commonjs",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "sourceMap": true,
    "lib": ["es2018", "es5", "dom"],
    "jsx": "react",           // tell the compiler to accept JSX
    "reactNamespace": "JSX",  // the name of the support class in @nyaf (this IS mandatory)
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

### WebPack Configuration

WebPack is the recommended packer tool,  but you can use any other if you like. There is no dependency.

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
  // How and where webpack should output bundles, assets and anything else
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
