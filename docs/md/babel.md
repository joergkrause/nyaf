## Project Configuration with Babel

If you don't want to use TypeScript, you can still get the full power of **@nyaf**. All features that the package requires are provided by ES2017 and above. The recommended tool to setup a package for ES2015 any modern browser supports is _Babel_.

> This section describes the setup and usage with pure ECMAScript.

### Setup the Environment

If you use Visual Studio Code it's recommended to tell the editor the specific features you use, especially decorators. To do so, add a file _jsconfig.json_ in the project root and add this content:

```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "target": "es6",
    "module": "commonjs",
    "experimentalDecorators": true
  },
  "include": ["src/**/*"]
}
```

This assumes your sources are in the folder _./src_. Adjust the settings according your needs.

### Project Dependencies

Next add the following dependencies to your project's _package.json_. This is the current Babel 7 setup.

```json
"dependencies": {
    "@nyaf/forms": "^0.6.4",
    "@nyaf/lib": "^0.6.4",
    "@nyaf/store": "^0.6.4",
    "babel-loader": "^8.1.0"
  },
  "devDependencies": {
    "@babel/core": "^7.11.6",
    "@babel/plugin-proposal-decorators": "^7.10.5",
    "@babel/preset-env": "^7.11.5",
    "@babel/preset-react": "^7.10.4",
    "html-webpack-plugin": "^4.4.1",
    "webpack-cli": "^3.3.12",
    "webpack": "^4.44.1",
    "webpack-dev-server": "^3.11.0"
  }
```

This setup allows the compilation and packaging with WebPack, but the transformation invoked from WebPack is based on the Babel plug-ins.

### Configuring Babel

Next, configure Babel to support the features **@nyaf** needs. This is primarily the JSX namespaces, that are different from React. It's similar to the procedure described for TypeScript. However, the settings look a bit different.

You can use either _.babelrc_ or the settings in _package.json_. The following example shows the settings in _package.json_ (on root level).

```json
"babel": {
    "presets": [
      "@babel/preset-env",
      [
        "@babel/preset-react", {
          "runtime": "classic",
          "pragma": "JSX.createElement",
          "pragmaFrag": "null"
        }
      ]
    ],
    "plugins": [
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ]
    ]
  }
```

The core settings you'll need are _preset-react_ and _plugin-proposal-decorators_. The first activates the compilation for the _JSX_ namespace `JSX.createElement`. This is the exact and complete call to the **@nyaf** JSX module. The second parameter _pragmaFrag_ is the support for the `<></>` fragment syntax. In React it's _React.fragment_. In **@nyaf** it's just nothing, as the _JSX_ module treats a missing element information as fragment. To enforce this, we provide `null`.

The decorator support is provided by a plugin. Babel takes care to compile this using a polyfill so it runs on the selected ECMAScript version.

## Packer

You can, of course, use any packer. Most examples use WebPack, but it will work with others, too. The following section covers WebPack and Rollup.

### Configure WebPack

The Babel transpiler can create a bundle, but putting it all together requires additional steps. The most powerful way (not always the easiest) is WebPack. The following _webpack.config.js_ file is all you need to setup WebPack to create a bundle using Babel:

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/index.html',
    }),
  ],
};
```

The entry point is the file _main.js_. All component files have the extension _.jsx_, so we need to resolve that extension, too. Apart from this the _babel-loader_ invokes the Babel transpiler and these settings, described above, apply here. The bundle is copied to the distribution folder _dist_ and the bundle is added to the HTML file using the appropriate plug-in.

### Configure Rollup

The following *packagejson* file shows a setup with Babel and Rollup. It has several plug-ins to handle the tasks required to make a small bundle. We experienced issues with the typical uglify plug-in and got much better results using *Terser*. Other compression and mangle tools may work, too.

```json
{
  "name": "nyaf-todo",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@nyaf/lib": "^0.6.2"
  },
  "devDependencies": {
    "@babel/cli": "^7.11.6",
    "@babel/core": "^7.11.6",
    "@babel/plugin-proposal-class-properties": "^7.10.4",
    "@babel/plugin-proposal-decorators": "^7.10.5",
    "@babel/preset-env": "^7.11.5",
    "@babel/preset-react": "^7.10.4",
    "@rollup/plugin-babel": "^5.2.1",
    "@rollup/plugin-commonjs": "^15.1.0",
    "@rollup/plugin-image": "^2.0.5",
    "@rollup/plugin-node-resolve": "^9.0.0",
    "babel-plugin-external-helpers": "^6.22.0",
    "http-server": "^0.12.3",
    "rollup": "^2.28.1",
    "rollup-plugin-postcss": "^3.1.8",
    "terser": "^5.3.2"
  },
  "scripts": {
    "start": "http-server ./dist -p 8080 -o",
    "build": "rollup -c && npx terser --compress --mangle -- dist/index.js > dist/index.min.js",
    "test": "echo \"No tests\""
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "babel": {
    "presets": [
      [
        "@babel/preset-env",
         {
          "targets": {
            "esmodules": true
          }
         }
      ],
      [
        "@babel/preset-react",
        {
          "runtime": "classic",
          "pragma": "JSX.createElement",
          "pragmaFrag": "null"
        }
      ]
    ],
    "plugins": [
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ],
      "@babel/plugin-proposal-class-properties"
    ]
  }
}
```

The whole build procedure uses this command (here on command line for manual execution):

~~~bash
$ npx rollup -c
$ npx terser --compress --mangle -- dist/index.js > dist/index.min.js
~~~

Rollup itself comes with its own configuration. It's JavaScript and consists mainly of some plug-ins.

```js
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';

import postcss from 'rollup-plugin-postcss';

const extensions = ['.js', '.jsx'];

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'iife',
    name: 'bundle',
  },
  plugins: [
    postcss({
      plugins: []
    }),
    image(),
    resolve({
      extensions
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    babel({
      exclude: 'node_modules/**',
    })
  ],
};
```

This file starts with the processing of inline CSS. In a component you can use something like this:

```js
import JSX, { GlobalProvider, BaseComponent, CustomElement } from '@nyaf/lib';

import 'main.css';

@CustomElement('app-main')
export class MainComponent extends BaseComponent {
  // omitted for brevity
}
```

Here, the CSS is being importat directly into the code and you can use the class names in JSX elements (the code assumes that *main.css* has a rule like `.ClassName { color: red }`):

```jsx
<div class={ClassName}>
```

A similar behavior happens to image resources with the plug-in *@rollup/plugin-image*. *@rollup/plugin-node-resolve* is required to resolve the *jsx* file extension. It's not really a requiement, the component files could be named *.js*, but the typical editors and IDEs process the JSX stuff better, then. *@rollup/plugin-commonjs* is used to handle the *umd* bundle and `import`/`export` syntax. Finally we call Babel to transform the ES2020 JavaScript into something any modern browser can read.

> Note that in typical Rollup setups the compression is made by *rollup-plugin-uglify*. This makes trouble processing the *umd*-files of the *@nyaf* package. Hence we use *Terser* to do a final compression for prduction environments.

This setup leads to a quite small package. The **nyaf-todo** app has a final bundle of 26KB zipped, including the *@nyaf/lib* package, all the CSS, some components, and the loader provided by Rollup.

### Writing Components

The components look exactly like the ones using TypeScript, apart from missing types and generics. Let's assume you have this _index.html_:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>JS Demo</title>
  </head>
  <body>
    <app-main></app-main>
  </body>
</html>
```

This requires to load and upgrade one component. To do this, you need the start procedure in _main.js_:

```js
import JSX, { GlobalProvider } from '@nyaf/lib';
import { MessageComponent } from './components/message.component';
import { MainComponent } from './components/main.component';

GlobalProvider.bootstrap({
  components: [MainComponent, MessageComponent],
});
```

The two demo components are shown below.

```js
import JSX, { GlobalProvider, BaseComponent, CustomElement } from '@nyaf/lib';

@CustomElement('app-main')
export class MainComponent extends BaseComponent {
  render() {
    return (
      <>
        <h1>Hello NYAF</h1>
        <app-message></app-message>
      </>
    );
  }
}
```

```js
import JSX, { GlobalProvider, BaseComponent, CustomElement } from '@nyaf/lib';

@CustomElement('app-message')
export class MessageComponent extends BaseComponent {
  render() {
    return <div>Hallo @nyaf</div>;
  }
}
```

As you can see you use JSX and decorators along with ES2018 import/export instructions.

### Improvements

Imagine a main file like this:

~~~js
import JSX, { GlobalProvider } from '@nyaf/lib';

import * as cmp from '@components';

GlobalProvider.bootstrap({
    components: [
        cmp.MainComponent,
        cmp.MessageComponent
    ]
});
~~~

The import from *@components* makes it so much more convenient. To setup this local path resolution you need to create an index file (*index.js*) for your components in the root folder of the components:

~~~js
export * from './main.component';
export * from './message.component';
~~~

Then, set an alias in *webpack.config.js* to resolve this file:

~~~js
resolve: {
    extensions: ["*", ".js", ".jsx"],
    alias: {
      "@components": path.join(__dirname, "src/components"),
    },
  }
~~~

To let Visual Studio Code accept this, too, add this *jsconfig.json* (look for the key *paths*):

~~~json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "target": "es6",
    "module": "commonjs",
    "experimentalDecorators": true,
    "paths": {
      "@components/*": ["./src/components/*"]
    }
  },
  "include": ["src/**/*"]
}
~~~

Both, the alias' for WebPack as well as the *paths* key can handle multiple entries for more complex setups.

### Bundle Size

For the demo files shown in the code above the whole bundle is 43.7 KB (11.6 KB zipped). The HTML remains with 230 Bytes (squeezed).

With all the loader and polyfill stuff this is an extremely small footprint for a client app. Forms and Flux Store would add another 10 KBytes roughly.

### The @nyaf CLI

The @nyaf CLI currently creates TypeScript projects only. To use Babel and pure JS refer to the documentation in this section.
