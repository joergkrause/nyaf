[![Build](https://img.shields.io/travis/joergkrause/nyaf/master.svg?style=flat-square)](https://travis-ci.org/joergkrause/nyaf)
[![Version](https://img.shields.io/npm/v/%40nyaf%2Flib.svg?style=flat-square)](https://npmjs.com/package/@nyaf/lib)
[![License](https://img.shields.io/npm/l/%40nyaf%2Flib.svg?style=flat-square)](https://npmjs.com/package/@nyaf/lib)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/joergisageek)

# NYAF is "Not Yet Another Framework"

And it is, well, just another framework. It's simple, has a flat learning curve, doesn't need any special tools.

> No dependencies! No bullshit! Pure HTML 5 DOM API and ES 2015 Code. Super small, super smart, super powerful. Period!

**Write frontend apps without the hassle of a complex framework, use the full power of HTML 5, keep a component based style.**

## Idea

* I want to use JSX/TSX syntax for quick component dev.
* I want to have support to make a Single Page App (SPA).
* I want to use any current HTML 5 API, such as web components, fetch, and all this with ES2015.
* I want to have a simple template language, that avoids clunky map, reduce, filter stuff within the HTML.
* I want to use TypeScript from the beginning.
* I want to get a very small package.
* I want to use WebPack and other common tools.
* I want to use standards, no weird CLI, no vendor lock in.
* I want to use smart decorators for controlling stuff, not code within the component, for separation of concerns style.

## Approach

I'm using TSX. I don't use React, though. So it's just a feature of the TypeScript compiler.

Excerpt from `tsconfig.json`:

~~~
"jsx": "react",
"reactNamespace": "JSX",
~~~

A class `JSX` is the core, it handles the element definitions and extract the template extensions.

## Components

Components are the core ingredients. You write components as classes, decorated with the decorator `CustomElement`. This defines a [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components). The Component must be registered, then. This is done by calling the static method `GlobalProvider.bootstrap`.

### Registration

Web Components must be registered. To support this, you must use decorators:

~~~
import { CustomElement } from '@nyaf/lib;

@CustomElement('app-main')
export class MainComponent extends BaseComponent<{}> {

  constructor() {
    super();
  }

  protected render() {
    return (
      <>
        <h1>Demo</h1>
      </>
    );
  }

}
~~~

The name is determined by `@CustomElement('app-main')`. This is mandatory. Also note the base class, which gets a generic that later controls the properties.

In *main.ts* (or wherever your app is bootstrapped) call this:

~~~
import { GlobalProvider } from '@nyaf/lib;
import { MainComponent } from './components/main.component';

GlobalProvider.bootstrap({
  components: [MainComponent]
});
~~~

That's it, the component works now. Use it in the HTML part:

~~~
<body class="container">
  <app-main></app-main>
</body>
~~~

Once you have more components, it may look like this:

~~~
  GlobalProvider.bootstrap({
    components: [
      ButtonComponent,
      TabComponent,
      TabsComponent,
      MainComponent]
  });
~~~

The main goal is to add template features to the JSX part.

### Life Cycle

Components have a life cycle. Instead of several events, there is just one method you must override (or ignore if not needed):

~~~
lifeCycle(cycle: LifeCycle){
  if (cycle === LifeCycle.Load){
    // it's ready to go
  }
}
~~~

Note, that the method has lower case "l". The `LifeCycle`-enum (upper case "L") has these fields:

* `Init`: Start, ctor is being called.
* `Connect`: Component connects to backend
* `SetData`: A change in the data object occurred.
* `Load`: The render process is done and the component has been loaded
* `PreRender`: The render method has been called and content is written to `innerHTML`.
* `Disconnect`: Component is going to be unloaded.
* `Disposed`: After calling the `dispose` method.

## Template Features

Template Features avoid using creepy JavaScript for loops and branches. You can use:

* `n-repeat`
* `n-if`, `n-else`
* `n-hide`, `n-show`
* `n-on-<event>` (see further down)

### n-repeat

Repeats the element. The argument must be an array.

Assume we have this object:

~~~
{ text: string, content: string }
~~~

It's in an array like this:

~~~
[
  {
    text: "hallo",
    content: "Hello NYAF"
  },
  {
    text: "world",
    content: "This is really nice"
  }
]
~~~

Than you show the data on the page like this:

~~~
<app-tab n-repeat={tabs} title="@title" content="@content"></app-tab>
~~~

The array shall contain objects. If one property is needed, it's accessible within any attribute by writing `attribute="@propName"`. Note the usage of the quotes and the "@" character.

You can repeat anything, even plain HTML elements such as `<span>` or `<li>`. The behavior is comparable to Angular's `*ngFor` directive.

### n-if, n-else

The value will be evaluated and the element does or does not render, then:

~~~
<div class="main-header"
     n-if={this.props.title !== 't1'}>
  <span>Any content will not render if container doesn't render</span>
</div>
~~~

If there is an else-branch it can direct to a slot template. `<slot>` elements are native web component parts.

~~~
<div class="main-header"
     n-if={this.props.title !== 't1'}
     n-else="noShow">
  <span>Any content will not render if container doesn't render</span>
</div>
<slot name="noShow">
  This is shown instead.
</slot>
~~~

### n-hide, n-show

Works same as `n-if`, but just adds an inline style `display: none` (or remove one) if `true` (`n-hide`) or `false` (`n-show`).

## Events

Events are defined by a special instruction. They are attached to `document` object, regardless the usage.

### n-on-[event]

Events are easy to add directly using it like `n-on-click`. All JavaScript events are supported. Just replace 'click' in the example with any other JavaScript event.

~~~
  <button n-on-click={() => this.clickMe()}>OK</button>
~~~

> There is no `bind` necessary, events are bound to components anyway.

You can get the (original HTML 5 API) event using a parameter, like *e* in the example below:

~~~
  <button n-on-click={(e) => this.clickMe(e)}>OK</button>
~~~

There is an alternative syntax that takes the method name directly (note that here are single quotes being used instead of curly braces):

~~~
  <button n-on-click='clickMe'>OK</button>
~~~

The method is bound with the event object as a parameter, hence the method can have a parameter like this:

~~~
clickMe(e: Event) {

}
~~~

The `Event` type conforms to HTML 5 DOM. Replace according the attached event (`MouseEvent` etc., see [here](https://developer.mozilla.org/en-US/docs/Web/API/Event) for details).


### Async

You can combine any event with the attribute `n-async` to make the call to the event's handler function async. This attribute does not take any parameters. The handler method must not be decorated with `async`.

~~~
<button n-on-click={(e) => this.clickMe(e)} n-async>OK</button>
~~~

### Custom Events

Sometimes the JavaScript events are not flexible enough. So you can define your own ones. That's done by three simple steps:

* Add a decorator `@Events` to declare the events (it's an array to declare multiple in one step)
* Create `CustomEvent` object and dispatch (that's [native Web Component behavior](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent))
* use the `n-on-<myCustomEventName>` attribute to attach the event.

Imagine a button component like this:

~~~
@CustomElement('app-button')
@Events(['showAlert'])
export class ButtonComponent extends BaseComponent {
  constructor() {
    super();
  }

  clickMe(e) {
    const checkEvent: CustomEventInit = {
      bubbles: true,
      cancelable: false,
    };
    super.dispatch('showAlert', checkEvent);
  }

  render() {
    return (
      <button type="button" n-on-click={e => this.clickMe(e)}>
        Demo
      </button>
    );
  }
}
~~~

The custom event in this example is called *showAlert*. It's invoked by a click. The element's host component has code like this:

~~~
<app-button n-on-showAlert={(e) => this.someHandler(e)} />
~~~

The argument *e* contains the `CustomEvent` object. It can carry any number of custom data. The `click`-invoker is just an example, any action can call a custom event, even a web socket callback, a timer, or an HTTP request result.

## Router

Usually we create SPAs (Single Page Apps). Hence we need a router. The included router is very simple.

First, define an outlet where the components appear:

~~~
<div n-router-outlet></div>
~~~

Any kind of parent element will do. The router code sets the property `innerHTML`. Components, that are being used to provide router content need registration too. They ___must___ have a name, too, because that's the way the router internally activates the component.

> There is just one default outlet. See further below for using named outlets.

### Register Routes

The following code shows how to register routes:

~~~
let routes = {
  '/': { component: DemoComponent },
  '/about': { component: AboutComponent },
  '/demo': { component: DemoComponent },
  '/contact': { component: ContactComponent },
  '**': { component: DemoComponent }
};

GlobalProvider.bootstrap({
  components: [DemoComponent, AboutComponent, ContactComponent, MainComponent],
  routes: routes
});
~~~

The first entry `'/': { component: DemoComponent },` shall always exist, it's the default route loaded on start. It's being recognized by the `'/'` key (the position in the array doesn't matter).
The entry `'**': { component: DemoComponent }` is optional and defines a fallback in case an invalid path is being used.

### Use Routes

To activate a router you need a hyperlink. The router's code looks for a click onto an anchor tag. An appropriate code snippet to use the routes looks like this:

~~~
<a href="#/" n-link>Home</a>
<a href="#/about" n-link>About</a>
<a href="#/demo" n-link>Demo</a>
<a href="#/contact" n-link>Contact</a>
<div n-router-outlet></div>
~~~

The important part here is the `n-link` attribute. Using this you can distinguish between navigation links for routing and any other anchor tag. You can also use a `<button>` element or any other. Internally it's just a `click`-event that's handled and that checks for the attribute, then.

Please note the hash sign (#). It's required. No code or strategies here, write it by yourself and then enjoy the very small footprint of the outcome.

> **Pro Tip!** Import the router definition and use additional fields to create a menu directly from router configuration.

If you have some sort of CSS framework running, that provides support for menu navigation by classes, just add the class for the currently active element to the `n-link` attribute like this:

~~~
<a href="#/" n-link="active">Home</a>
<a href="#/about" n-link="active">About</a>
<a href="#/demo" n-link="active">Demo</a>
<a href="#/contact" n-link="active">Contact</a>
<div n-router-outlet></div>
~~~

After this, by clicking the hyperlink, the class "active" will be added to the anchor tag. Any click on any `n-link` decorated tag will remove all these classes from all these elements, first. The class' name can differ and you can add multiple classes. It's treated as string internally.

### Named Routes

The underlying Route definition type `Routes`, allows two additional fields:

~~~
const routes: Routes = {
  '/': { component: HomeComponent },
  '/docu': { component: DocuComponent, data: { notlocal: true} },
  '/about': { component: AboutComponent },
  '/demo': { component: DemoComponent,
  '/router': { component: RouterComponent },
  '/router/page1': { component: Page1Component, outlet: 'router' },
  '/router/page2': { component: Page2Component, outlet: 'router' },
  '/router/page2/other': { component: Page2Component, outlet: 'other' },
  '/router/page3/other': { component: Page3Component, outlet: 'other' },
  '/contact': { component: ContactComponent }
};
~~~

With `outlet` one can define a named outlet. It my reside everywhere. It may look like this:

~~~
<div n-router-outlet="other"></div>
~~~

There is no difference on the link side, the decision to address another outlet is made in the configuration only. If the outlet doesn't exists nothing happens and a warning appears on the console (in DEBUG mode).

> In the example I use routes that look like child routes. That's a hint for the intended behavior, but it's technically not necessary doing so. The resolver is very simple and doesn't care about routes, it's just matching the string and seeking the outlet.

### Addition Data

The last example showed another field `data`. This is a dictionary with arbitrary data just stored here. If you setup a navigation dynamically based on the configuration data you can control the behavior in a well defined way. However, There is no code intercepting these data, it's task of the implementer to do something useful here.

## Shadow DOM

By default the shadow DOM is ____not____ used. If it would, it would mean, that styles are isolated. No global styles are available, then.

One option to activate the Shadow DOM:

~~~
@ShadowDOM()
~~~

The property can be set explicitly. The default is `false`, hence if the decorator is being omitted, the component is ____not____ shadowed.

~~~
@ShadowDOM(true | false)
~~~

Another interesting option controls the style behavior:

~~~
@UseParentStyles()
~~~

* The decorator *ShadowDOM* must be set, otherwise the decorator *@UseParentStyle* does nothing
* If active, it copies all global styles into component so they work as expected even in Shadow DOM

> It's a trade-off. Shadow DOM increases performance and brings isolation. Copying many styles decreases performance and contradicts isolation.

Example:

~~~
@CustomElement('app-contact')
@ShadowDOM()
@UseParentStyles()
export class ContactComponent extends BaseComponent {
  // omitted for brevity
}
~~~

## State and Properties

There is no explicit difference between State and Property. Compared with React it's much more simpler. A state still exists and it supports smart rendering.

### State

To declare a state object use a generic like this:

~~~
export class MainComponent extends BaseComponent<{ cnt: number}> {
  // ... omitted for brevity
}
~~~

> The State generic is optional. If there is no state necessary just use `any` or an empty object such  as `{}`.

Now two functions are available:

* `data`: Returns the instance of the data object and contains all properties defined in the generic.
* `setData`: Sets a changed value and, if the value differs, re-renders the component.

A simple counter shows how to use:

~~~
export class CounterComponent extends BaseComponent<{ cnt: number }> {

  constructor() {
    super();
    super.setData('cnt',  10);
  }

  clickMeAdd(v: number) {
    super.setData('cnt', super.data.cnt + 1);
  }

  clickMeSub(v: number) {
    super.setData('cnt', super.data.cnt - 1);
  }

  render() {
    return (
      <>
        <div>
          <button type='button' n-on-click={e => this.clickMeAdd(e)}>
            Add 1
          </button>
          <button type='button' n-on-click={e => this.clickMeSub(e)}>
            Sub 1
          </button>
        </div>
        <pre style='border: 1px solid gray;'>{ super.data.cnt }</pre>
      </>
    );
  }
}
~~~

### Properties

To use properties, you can define those. Each property is automatically part of the state and once it changes, the component re-renders.

~~~
@CustomElement('app-btn')
@Properties<{ title: string }>({ title: 'Default' })
export class ButtonComponent extends BaseComponent<{ title: string, cnt: number }> {
  // ... omitted for brevity
}
~~~

The initializer with default's is ____not____ optional, you must provide an object that matches the generic.

This is how you use such a component (part of the render method):

~~~
const someTitle='Demo';
return (<app-btn title={someTitle} />);
~~~

The `@Properties` decorator defines all properties, that are now monitored (observed) and hence the value is evaluated and rendered. If the value changes the component renders itself automatically.

### Properties and View Models

For a nice view decorators applied to class properties control the appearance.

~~~
export class Model {
  id: number = 0;
  name: string = '';
}


@CustomElement('app-main')
@Properties<{ data: Model }>()
export class MainComponent extends BaseComponent {
  // ... omitted for brevity
}
~~~

Within the component, this is now present. In the above definition `super.data` contains an actual model.

## Services

Want to access an injectable service?

~~~
@CustomElement('app-main')
@InjectService('localNameA', ServiceClass1)
@InjectService('localNameB', ServiceClass2, true)
export class MainComponent extends BaseComponent<{}> {

  // ... omitted for brevity

  protected async render() {
    let data = await this.services('localNameA').callAnyServiceFunctionHereAsync();
  }

}
~~~

> Async is an option, can by sync, too.

*this.services* is a function, that returns an instance of the service. Services are singleton on the level of the local name. The same name used in different components will return the same instance. Using a different name will create a new instance.

The third option of `@InjectService` allows to define a singleton. Instead of providing a type for the decorator, here you must provide an instance. The same name will be shared across components.

# How to use

This section describes setup and first steps.

## Prepare a project

Install the package:

~~~
npm i @nyaf/lib -S
~~~

Create a file `main.ts` in the *src* folder that looks like this:

~~~
import { GlobalProvider } from '@nyaf/lib';

import { MainComponent } from './main.component';

GlobalProvider.bootstrap({
  components: [MainComponent],
});
~~~

Create file *main.component.ts* in the same folder. Fill this content in:

~~~
import JSX, { BaseComponent, CustomElement } from '@nyaf/lib';

@CustomElement('app-main')
export class MainComponent extends BaseComponent {

	constructor() {
		super();
	}

	render() {
		return (
			<section>
        <h2>Demo</h2>
        <p>Hello NYAF</p>
			</section>
		);
	}

}
~~~

> Watch the default import for *JSX* - this IS required, even if there is no explicit call. The TypeScript transpiler needs this when handling JSX files.

Create a file named *index.html* in the very same folder and fill it like this:

~~~
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Hello NYAF</title>
</head>
<body>
  <h1>Hell NYAF</h1>
  <app-main></app-main>
</body>
</html>
~~~

## Setup

Now, because it's based on TypeScript, it's very recommended to use WebPack and TypeScript.

The *tsconfig.json* looks like this:

~~~~~
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

~~~
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

~~~
build: "webpack",
~~~

## Build

Now, on command line, just type `npm run build`.

To start WebPack's dev server type:

~~~
npm start
~~~

An now enjoy writing a component based SPA with only very few KB of lib code.

# Recap

Is it worth coding with NYAF and vanilla JS? For smaller projects and for apps that must load quickly, yes.

The zipped package of the lib is 7 KBytes. Expanded just 20 KBytes. Demo code is 115 KB but already includes a good bunch of Bootstrap's CSS.

However, compared with React or Angular it's a lot simpler. Compared to Vue or Polymer it's simpler and even smaller, but the delta is not that thrilling.

## Tool Support

What tool support? It's Web Components - any editor will do. It's JSX/TSX, so any good editor can handle this. And there are TypeScript decorators, even this is well supported. So, you don't need to tweak your editor. It works, no red squiggles, guaranteed.

## Restrictions

The package runs, if there are no polyfills, only with ES2015. This limits the usage to any modern browser. It's pretty bold in Electron projects.

## Credits

Inspired by:

* Angular (thanks for the idea of using decorators)
* Polymer (especially lit-element, thanks for showing that Web Components are bold)
* React (thanks for JSX)
* Vue (thanks for showing short custom attributes)
* TypeScript (thanks for making JS cool again)

## Next

Look out for 'nyaf-forms' (forms validation) and 'nyaf-store' (flux store). Simple but powerful!

Add https://github.com/ArthurClemens/Polythene support.
