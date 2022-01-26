[![Build](https://img.shields.io/travis/joergkrause/nyaf/master.svg?style=flat-square)](https://travis-ci.org/joergkrause/nyaf)
[![Version](https://img.shields.io/npm/v/%40nyaf%2Flib.svg?style=flat-square)](https://npmjs.com/package/@nyaf/lib)
[![License](https://img.shields.io/npm/l/%40nyaf%2Flib.svg?style=flat-square)](https://npmjs.com/package/@nyaf/lib)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/joergisageek)
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

# Introducing @nyaf

The name @nyaf is an acronym for "Not Yet Another Framework". It is, in fact, an entirely new concept of Web development support libraries, a so called "thin library". If you want to talk about, pronunce it like 'knife' (naɪf, and think of a swiss knife, it's quite close).

It's simple, has a flat learning curve, doesn't need any special tools. Keep your tool chain, get the power. It can replace all the complex stuff such as React or Angular entirely, indeed.

> No dependencies! No bullshit! Pure HTML 5 DOM API and ES 2015 Code. Super small, super smart, super powerful. Period!

**Write frontend apps without the hassle of a complex framework, use the full power of HTML 5, keep a component based style.**

## Documentation

@nyaf is very well documented.

* **[Home Page and Interactive Demos](https://nyaf.comzept.de/)**
* **[Read the Manual](https://nyaf.readthedocs.io/en/latest/)**

### API Documentation

* **[Full API Documentation Base Library](https://nyaf.comzept.de/apidoc/lib/index.html)**
* **[Full API Documentation Forms Library](https://nyaf.comzept.de/apidoc/forms/index.html)**
* **[Full API Documentation Store Library](https://nyaf.comzept.de/apidoc/store/index.html)**

## Approach

* **@nyaf** uses JSX/TSX syntax for quick component dev.
* **@nyaf** supports Single Page App (SPA) directly.
* **@nyaf** can use any current HTML 5 API, such as web components, fetch, and all this with ES2015+.
* **@nyaf** provides a simple template language, that avoids clunky map, reduce, filter stuff within the HTML.
* **@nyaf** uses TypeScript from the beginning (and is written in TypeScript).
* **@nyaf** creates a very small package.
* **@nyaf** works well with WebPack and other common tools.
* **@nyaf** uses standards, no weird or enforced CLI, no vendor lock in.
* **@nyaf** uses smart decorators for controlling stuff, not code within the component, for separation of concerns style.

> All three base parts (library, form binding, store) together have less than 100 KB; 26 KB zipped in total.

## First Steps

This section provides a quick setup instruction.

### I have no time, can I get it even quicker?

Yes, sure. First, assure you have NodeJs 10+ and **npm** version 6+.

1. Open terminal and go to a folder where you want to create the app.
2. Enter this:

~~~sh
npm i @nyaf/cli -g
npx nyaf n
~~~

You'll be prompted by some questions:

~~~txt
(C) JoergIsAGeek 2021
? What project template would you like to generate? basic
? What style environment shall the project use? css
? Project name: testme
? Description (optional): no
? Shall we execute "npm install" immediately? Yes
Creating testme for you. Standby...
Install modules...
~~~

After a while you'll see this:

~~~
Done. To continue:
  cd testme
  npm start
~~~

Do as instructed ('testme' is just a demo name, use any valid name). A browser will open and show the running app.

# Learn how to make an App

Components are usually based on a TSX-like template styles. It has no relation to React, though. It's just a feature of the TypeScript compiler.

Excerpt from `tsconfig.json`:

~~~json
"jsx": "react",
"reactNamespace": "JSX",
~~~

A class `JSX` is the core, it handles the element definitions and extract the template extensions.

> You can use simply strings for the HTML part. TSX is just an option, any other template engine could be used, too.

See the full documentation about a setup without TypeScript and by using Babel/Rollup if you like to work with E2015 directly.

## Components

Components are the core ingredients of your app. You write components as classes, decorated with the decorator `CustomElement`. This defines a [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components). The Component must be registered, then. This is done by calling the static method `GlobalProvider.bootstrap` once.

### Registration

The decorators makes it quite easy to define a component without knowing the details of the browser's API. The name is determined by `@CustomElement('my-name')`. This decorator is mandatory. Note the base class, which gets a generic that later controls the attributes. The name shall follow the common rules of Web Components, that means, it must have at least one dash '-' so there is no risk of a collision with common HTML element names and it is always in all lower case (kebap style).

~~~tsx
import JSX, { CustomElement } from '@nyaf/lib';

@CustomElement('app-main')
export class MainComponent extends BaseComponent<{}> {

  constructor() {
    super();
  }

  render() {
    return (
      <>
        <h1>Demo</h1>
      </>
    );
  }

}
~~~

Let's go step by step through this simple component.

First, the import includes not only the decorator, but the type `JSX` too. That's necessary, if you want to use JSX (or TSX) and let the TypeScript compiler translate the HTML syntax properly. The supporting class comes from *@nyaf* and has absolutely no relation to React. It has, in some details, a different behavior. The import is necessary, even if there is no explicit usage in the module. Both, the TypeScript transpiler and linter such as TSLint know about this and will not complain.

Second, the component has a base class. All **@nyaf** components are derived from `HTMLElement`. Currently we don't support inheriting from other element types.

Now, that the component is defined, it must be registered. In a file called *main.ts* (or wherever your app is bootstrapped) call this:

~~~ts
import { GlobalProvider } from '@nyaf/lib';
import { MainComponent } from './components/main.component';

GlobalProvider.bootstrap({
  components: [MainComponent]
});
~~~

That's it, the component works now. Use it in the HTML part:

~~~html
<body class="container">
  <app-main></app-main>
</body>
~~~

## Features

Once you have more components, it may look like this:

~~~ts
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

~~~ts
lifeCycle(cycle: LifeCycle){
  if (cycle === LifeCycle.Load){
    // it's ready to go
  }
}
~~~

Note, that the method has lower case "l". The `LifeCycle`-enum (upper case "L") has these fields:

* `Init`: Start, ctor is being called.
* `Connect`: Component connects to backend.
* `SetData`: A change in the data object occurred.
* `Load`: The render process is done and the component has been loaded.
* `PreRender`: The render method has been called and content is written to `innerHTML`.
* `Disconnect`: Component is going to be unloaded.
* `Disposed`: After calling the `dispose` method.

The life cycle is available through an event `lifecycle`. It's exposed via a property called `onlifecycle` on the element level, too. The events are fired after the internal hook has been called.

## Template Features

Template Features avoid using creepy JavaScript for branches and interaction. You can use:

* `n-if`, `n-else`
* `n-hide`, `n-show`
* `n-on-<event>` (see further down)
* `n-expand`

### n-if, n-else

The value will be evaluated and the element does or does not render, then:

~~~tsx
<div class="main-header"
     n-if={this.props.title !== 't1'}>
  <span>Any content will not render if container doesn't render</span>
</div>
~~~

If there is an else-branch it can direct to a slot template. `<slot>` elements are native web component parts.

~~~tsx
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

### n-expand

Expand a group of attributes. Imagine this:

~~~tsx
<input type="text" placeholder="Name" role="search" class="materialinput" id="a1" />
<input type="text" placeholder="Name" role="search" class="materialinput" id="a2" />
<input type="text" placeholder="Name" role="search" class="materialinput" id="a3" />
~~~

You need this several times, each with different id. It's easier doing it with an expander:

~~~tsx
<input n-expand="search" id="a1" />
<input n-expand="search" id="a2" />
<input n-expand="search" id="a3" />
~~~

To define it, just create a class like this:

~~~tsx
@Expand("search")
export class SearchExpander extends Expander {
  constructor(){
    super();
  }
  'type'="text";
  'placeholder'="Name";
  'role'="search";
  'class'="materialinput";
}
~~~

And yes, these are equal signs in the class. The quoted 'xxx' names are only required if the attribute name contains dashes. Finally, add the definition to the global provider:

~~~tsx
Globalprovider.bootstrap({
  components: [...components], // as usual
  expanders: [SearchExpander]  // expanders must ne registered
})
~~~

That's it, a lot less to write without the effort to create components. It's just text-replacement before the renderer grabs the content, so NO performance penalty at runtime.

#### Quick Expanders

This is even easier, but more for local expanding:

~~~tsx
const d = {
  'type': "text";
  'placeholder': "Name";
  'role': "search";
  'class': "materialinput";
}
<app-button  {...d} />
~~~

It's just pure ECMAScript magic, no code from @nyaf required.

## Events

Events are defined by a special instruction. They are attached to `document` object, regardless the usage.

### n-on-[event]

Events are easy to add directly using them like `n-on-click`. All JavaScript events are supported. Just replace 'click' in the example with any other JavaScript event.

~~~tsx
<button n-on-click={() => this.clickMe()}>OK</button>
~~~

> There is no `bind` necessary, events are bound to components anyway.

You can get the (original HTML 5 API) event using a parameter, like *e* in the example below:

~~~tsx
<button n-on-click={(e) => this.clickMe(e)}>OK</button>
~~~

There is an alternative syntax that takes the method name directly (note that here are single quotes being used instead of curly braces):

~~~tsx
<button n-on-click='clickMe'>OK</button>
<button n-on-click={this.clickMe}>OK</button>
~~~

The method is bound with the event object as a parameter, hence the method can have a parameter like this:

~~~tsx
clickMe(e: Event) {

}
~~~

The `Event` type conforms to HTML 5 DOM. Replace according the attached event (`MouseEvent` etc., see [here](https://developer.mozilla.org/en-US/docs/Web/API/Event) for details).

### Async

You can combine any event with the attribute `n-async` to make the call to the event's handler function async. This attribute does not take any parameters. The handler method must not be decorated with `async`.

~~~tsx
<button n-on-click={(e) => this.clickMe(e)} n-async>OK</button>
~~~

### Custom Events

Sometimes the JavaScript events are not flexible enough. So you can define your own ones. That's done by three simple steps:

* Add a decorator `@Events` to declare the events (it's an array to declare multiple in one step). Mandatory.
* Create `CustomEventInit` object and dispatch (that's [native Web Component behavior](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent)) it.
* Use the `n-on-<myCustomEventName>` attribute to attach the event.

Imagine a button component like this:

~~~tsx
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
    this.dispatch('showAlert', checkEvent);
  }

  async render() {
    return await (
      <button type="button" n-on-click={e => this.clickMe(e)}>
        Demo
      </button>
    );
  }
}
~~~

The custom event in this example is called *showAlert*. It's invoked by a click. The element's host component has code like this:

~~~tsx
<app-button n-on-showAlert={(e) => this.someHandler(e)} />
~~~

The argument *e* contains an `CustomEvent` object. It can carry any number of custom data. The `click`-invoker is just an example, any action can call a custom event, even a web socket callback, a timer, or an HTTP request result. Both `CustomEvent` and `CustomEventInit` have a field `detail` that can carry any object or scalar and is the proposed way to transport custom data with the event. The event handler could look like this:

~~~ts
private showAlert(e: CustomEvent) {
  const data = e.detail;
  // Your code that handles the event
}
~~~

> Custom events can be async, too. Just add `n-async` to the element that fires the event and add the `async` modifier to the handler.

## Quick Selector

To have elements handy, just use the `@Select` decorator:

~~~ts
@Select('#id') element: MyCustomElement;

@Select('.all') elements: QueryList<MyCustomElement>;
~~~

This avoids using `this.querySelector()` in your code many times.

## Router

Usually we create SPAs (Single Page Apps). Hence we need a router. The included router is very simple but powerful.

First, define an outlet where the components appear:

~~~html
<div n-router-outlet></div>
~~~

Any kind of parent element will do. The router code sets the property `innerHTML`. Components, that are being used to provide router content need registration too. They ___must___ have a name, too, because that's the way the router internally activates the component.

> There is just one default outlet. See further below for using named outlets.

### Register Routes

The following code shows how to register routes:

~~~tsx
const routes = {
  '/': { component: DemoComponent },
  '/about': { component: AboutComponent },
  '/demo': { component: DemoComponent },
  '/contact': { component: ContactComponent },
  '**': { component: DemoComponent }
};

GlobalProvider.bootstrap({
  components: [
    DemoComponent,
    AboutComponent,
    ContactComponent,
    MainComponent
  ],
  routes
});
~~~

The first entry `'/': { component: DemoComponent },` shall always exist, it's the default route loaded on start. It's being recognized by the `'/'` key (the position in the array doesn't matter).
The entry `'**': { component: DemoComponent }` is optional and defines a fallback in case an invalid path is being used.

### Using Routes

To activate a router you need a hyperlink or any other method that invokes a `hashchange` event. The router's code looks for a click onto an anchor tag. An appropriate code snippet to use the routes looks like this:

~~~tsx
<a href="#/" n-link>Home</a>
<a href="#/about" n-link>About</a>
<a href="#/demo" n-link>Demo</a>
<a href="#/contact" n-link>Contact</a>
<div n-router-outlet></div>
~~~

The important part here is the `n-link` attribute. Using this you can distinguish between navigation links for routing and any other anchor tag. You can also use a `<button>` element or any other. Internally it's just a `click`-event that's handled and that checks for the attribute, then.

Please note the hash sign (#). It's mantdatory. There are no code or strategies here, write it by yourself and then enjoy the very small footprint of the outcome.

> **Pro Tip!** Import the router definition and use additional fields to create a menu directly from router configuration.

If you have some sort of CSS framework running, that provides support for menu navigation by classes, just add the class for the currently active element to the `n-link` attribute like this:

~~~tsx
<a href="#/" n-link="active">Home</a>
<a href="#/about" n-link="active">About</a>
<a href="#/demo" n-link="active">Demo</a>
<a href="#/contact" n-link="active">Contact</a>
<div n-router-outlet></div>
~~~

After this, by clicking the hyperlink, the class "active" will be added to the anchor tag. Any click on any `n-link` decorated tag will remove all these classes from all these elements, first. The class' name can differ and you can add multiple classes. It's treated as string internally.

### Named Routes

The underlying route definition, the type `Routes`, allows three additional fields (`outlet`, `data`, and `forced`):

~~~tsx
const routes: Routes = {
  '/': { component: HomeComponent, outlet: 'main' },
  '/docu': {
    component: DocuComponent,
    outlet: 'main',
    data: { notlocal: true} },
  '/about': { component: AboutComponent, outlet: 'main' },
  '/demo': { component: DemoComponent, outlet: 'main',
  '/router': { component: RouterComponent, outlet: 'main' },
  '/router/page1': { component: Page1Component, outlet: 'router' },
  '/router/page2': { component: Page2Component, outlet: 'router' },
  '/router/2/other': { component: Page2Component, outlet: 'other' },
  '/router/3/other': { component: Page3Component, outlet: 'other' },
  '/contact': { component: ContactComponent }
};
~~~

With `outlet` one can define a named outlet. If you use this, you must name all routes as there is no fallback currently. The route outlet might reside everywhere. It may look like this:

~~~tsx
<div n-router-outlet="other"></div>
~~~

If the route's components deliver `<li>` elements, you can also use something like this to build well formatted HTML:

~~~tsx
<ul n-router-outlet="other"></div>
~~~


There is no difference on the link side, the decision to address another outlet is made in the configuration only. If the outlet doesn't exists nothing happens and a warning appears on the console (in DEBUG mode).

> In the example I use routes that look like child routes. That's a hint for the intended behavior, but it's technically not necessary doing so. The resolver is very simple and doesn't care about routes, it's just matching the string and seeking the outlet.

### Additional Routing Data

The last example showed another field `data`. This is a dictionary with arbitrary data just stored here. If you setup a navigation dynamically based on the configuration data you can control the behavior in a well defined way. However, There is no code intercepting these data, it's task of the implementer to do something useful here.

If you use `data: { title: 'Some Title' } ` the value in the field *title* is being copied to the websites `title` field. That way it appears on the tab (or header bar in Electron). If it's omitted, it's not being set at all.

### Navigate to Route

You can navigate by code:

~~~tsx
GlobalProvider.navigateRoute('/my-route');
~~~

The outlet is pulled from configuration, but if provided as second parameter it can be overwritten.

> **Hint:** In the link elements you use the '#' prefix. In the `navigateRoute` method this is not necessary and hence not allowed.

### Route Events

The router fires two events, available through the static `GlobalProvider` class like this:

~~~tsx
GlobalProvider.routerAction.addEventListener('navigate', (evt) => {
  const route = evt.detail;
  // optionally cancel before execution
  evt.cancel = true;
}
~~~

~~~tsx
GlobalProvider.routerAction.addEventListener('navigated', (evt) => {
  const route = evt.detail;
  // this event can't be cancelled
}
~~~

## Shadow DOM

By default the shadow DOM is ____not____ used. If it would, it would mean, that styles are isolated. No global styles are available, then.

One option to activate the Shadow DOM:

~~~tsx
@ShadowDOM()
~~~

The property can set the mode explicitly. The default is `true`, hence if nothing is set the mode is 'open'. To set to close use the value `false`.

~~~tsx
@ShadowDOM(false)
~~~

Another interesting option controls the style behavior:

~~~tsx
@UseParentStyles()
~~~

* The decorator *ShadowDOM* must be set, otherwise the decorator *@UseParentStyle* does nothing
* If active, it copies all global styles into component so they work as expected even in Shadow DOM

> It's a trade-off. Shadow DOM increases performance and brings isolation. Copying many styles decreases performance and contradicts isolation.

Example:

~~~tsx
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

~~~tsx
export class MainComponent extends BaseComponent<{ cnt: number}> {
  // ... omitted for brevity
}
~~~

> The State generic is optional. If there is no state necessary just use `any` or an empty object such  as `{}`.

Now a property and a function are available:

* `data` (property): Returns the instance of the data object and contains all properties defined in the generic.
* `setData(prop: string, val: any)` (function): Sets a value and if the value differs re-renders the component.

A simple counter shows how to use:

~~~tsx
export class CounterComponent extends BaseComponent<{ cnt: number }> {

  constructor() {
    super();
    this.setData('cnt',  10);
  }

  clickMeAdd(v: number) {
    this.setData('cnt', this.data.cnt + 1);
  }

  clickMeSub(v: number) {
    this.setData('cnt', this.data.cnt - 1);
  }

  async render() {
    return await (
      <>
        <div>
          <button type='button' n-on-click={e => this.clickMeAdd(e)}>
            Add 1
          </button>
          <button type='button' n-on-click={e => this.clickMeSub(e)}>
            Sub 1
          </button>
        </div>
        <pre style='border: 1px solid gray;'>{ this.data.cnt }</pre>
      </>
    );
  }
}
~~~

### Properties

To use properties, you can define those. Each property is automatically part of the state and once it changes, the component re-renders.

~~~tsx
@CustomElement('app-btn')
@Properties<{ title: string }>({ title: 'Default' })
export class ButtonComponent extends BaseComponent<{ title: string, cnt: number }> {
  // ... omitted for brevity
}
~~~

The initializer with default's is ____not____ optional, you must provide an object that matches the generic.

This is how you use such a component (part of the render method):

~~~tsx
const someTitle='Demo';
return (<app-btn title={someTitle} />);
~~~

The `@Properties` decorator defines all properties, that are now monitored (observed) and hence the value is evaluated and rendered. If the value changes the component renders itself automatically.

### Accessing Properties

The access with `data` is internally and externally available. That means, you can retrieve a component and set values like this:

~~~tsx
(this.querySelector('[data-demo-button]') as any).data.text = 'Some demo data';
~~~

As like with `setData` internally this will trigger the renderer to re-render the content with the new attribute, but in this case from another component.

### Data Type

Web Components have the restriction that an attribute can transport string values only. This would lead to "[Object object]" for other types.

> @nyaf overcomes this restriction with a smart attribute handling.

That means the object is being recognized and stringified to JSON. Additionally, a custom attribute with the name "\_\_name__" is written. Assume your values is written like shown below:

~~~tsx
<app-comp test={[{"obj": 1}, {"obj": 2}]}></app-comp>
~~~

The rendered component would look like this:

~~~tsx
<app-comp test="[{"obj": 1}, {"obj": 2}]" n-type-test="array"></app-comp>
~~~

Apparently the double double quotes work just fine. However, the content is now a string. If you do operations on this it will not resolve as the array it was before. Here the second attribute will trigger a different behavior. The hook for the data Proxy used internally is now applying a `JSON.parse` and returns the former object. Also, once set again, the incoming value is checked for being an object and stringified, then. The technique currently works for `string` (default Web Component behavior), `number`, `boolean`, `array`, and `object`.

> For extremely huge complex objects this technique might produce a performance penalty due to repeatedly used `JSON.parse`/`JSON.stringify` calls. Be also aware that this cannot work if the object has recursive structures, because the JSON class cannot deal with this. There is no additional error handling to keep the code small, it's just a `try/catch` block that reports the native error.

### Properties and Models

First, have a look on a simple model class:

~~~tsx
export class Model {
  id: number = 0;
  name: string = '';
}

@CustomElement('app-main')
@Properties<{ data: Model }>({ data: new Model() })
export class MainComponent extends BaseComponent<Model> {
  // ... omitted for brevity
}
~~~

Within the component, this is now present. In the above definition `this.data` contains an actual model.

## Services

If you want to access an injectable service, this is the way to do it:

~~~tsx
@CustomElement('app-main')
@InjectService('localNameA', ServiceClass1)
@InjectService('localNameB', ServiceClass2, true)
export class MainComponent extends BaseComponent<{}> {

  // ... omitted for brevity

  async render() {
    let data = await this.services('localNameA').callAnyServiceFunctionHereAsync();
  }

}
~~~

> Async is an option, can by sync, too. However, the render process is always asynchronous internally.

*this.services* is a function, that returns an instance of the service. Services are singleton on the level of the local name. The same name used in different components will return the same instance. Using a different name will create a new instance.

The third option of `@InjectService` allows to define a singleton. Instead of providing a type for the decorator, here you must provide an instance. The same name will be shared across components.

# How to use

This section describes setup and first steps.

## Prepare a project

Install the package:

~~~bash
npm i @nyaf/lib -S
~~~

Create a file `main.ts` in the *src* folder that looks like this:

~~~tsx
import { GlobalProvider } from '@nyaf/lib';

import { MainComponent } from './main.component';

GlobalProvider.bootstrap({
  components: [MainComponent],
});
~~~

Create file *main.component.tsx* in the same folder (It must be _*.tsx_!). Fill this content in:

~~~tsx
import JSX, { BaseComponent, CustomElement } from '@nyaf/lib';

@CustomElement('app-main')
export class MainComponent extends BaseComponent {

	constructor() {
		super();
	}

	async render() {
		return await (
			<section>
        <h2>Demo</h2>
        <p>Hello @nyaf</p>
			</section>
		);
	}

}
~~~

> Watch the default import for *JSX* - this IS required, even if there is no explicit call. The TypeScript transpiler needs this when handling JSX files. It's always `JSX`, even if we use _*.tsx_-files.

Create a file named *index.html* in the very same folder and fill it like this:

~~~tsx
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Hello @nyaf</title>
</head>
<body>
  <h1>Hello @nyaf</h1>
  <app-main></app-main>
</body>
</html>
~~~

Your app starts in line 11.

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

~~~json
build: "webpack",
~~~

## Build

Now, on command line, just type `npm run build`.

To start WebPack's dev server type:

~~~bash
npm start
~~~

And now enjoy writing a component based SPA with only 34 KB of lib code in total.

# Summary

Is it worth coding with @nyaf and vanilla JS/TS? For smaller projects and for apps that must load quickly, yes.

Actual package sizes (0.7.4, published January 2022):

* Lib:    28 KB -->  9 KB zipped (always needed)
* Forms:  28 KB -->  7 KB zipped (Forms binding, validation, decorators)
* Store:  10 KB -->  3 KB zipped (Flux like store for state management)

* Total:  68 KB --> 19 KB zipped all files together for your project

However, compared with React or Angular it's a lot simpler. Compared to Vue, Svelte, or Polymer it's simpler and even smaller, too.

## Tool Support

No special tools needed! It's Web Components - any editor will do. It's JSX/TSX, so any good editor can handle this. And there are TypeScript decorators, even this is well supported. So, you don't need to tweak your editor. It works, no red squiggles, guaranteed.

To simplify your life a simple CLI exists.

## Restrictions

The package runs, if there are no polyfills, only with ES2015. This limits the usage to any modern browser. It's pretty bold in Electron projects.

## Credits

Inspired by:

* Angular (thanks for the idea of using decorators)
* Polymer (especially lit-element, thanks for showing that Web Components are bold)
* React (thanks for JSX)
* Vue (thanks for showing short custom attributes)
* TypeScript (thanks for making JS cool again)

## Further Readings

There is a book in the making covering all aspects of @nyaf: https://leanpub.com/webcomponentsnyaf. Read everything about Web Components, why they are smart and how @nyaf handles them.

Full documentation on [ReadTheDocs](https://nyaf.readthedocs.io/en/latest/) environment.

Homepage with interactive demo is [here](https://nyaf.comzept.de).

## Related Modules

Look out for '@nyaf/forms' (forms validation, data binding, UI control) and '@nyaf/store' (a simple flux store). Simple but powerful!

# Need Help?

Need a Pro? Need help writing a framework? Need one who knows a lot (full stack, front end, backend with NodeJS, ASP.NET / C#, SQL, noSQL, Azure, AWS)? [Hire me!](https://www.joergkrause.de/contact).
