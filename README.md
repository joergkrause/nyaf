[![Build](https://img.shields.io/travis/joergkrause/nyaf/master.svg?style=flat-square)](https://travis-ci.org/joergkrause/nyaf)
[![Version](https://img.shields.io/npm/v/%40nyaf%2Flib.svg?style=flat-square)](https://npmjs.com/packages/@nyaf/lib)
[![License](https://img.shields.io/npm/l/%40nyaf%2Flib.svg?style=flat-square)](https://npmjs.com/packages/@nyaf/lib)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/joergisageek)

# NYAF is "Not Yet Another Framework" 

And it is, well, just another framework. It's simple, has a flat learning curve, doesn't need any special tools.

> No dependencies! No bullshit! Pure HTML 5 DOM API and ES 2015 Code. Super small, super smart, super powerful. Period!

**Write frontend apps without the hassle of a complex framework, use the full power of HTML 5, keep a component based style.**

## Idea

* I want to use JSX/TSX syntax for quick component dev.
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

Components are the core ingredients. You write components as classes, decorated with the decorator `CustomElement`. This defines a Web Component. The Component must be registered, then. This is done by calling the static method `GlobalProvider.bootstrap`.

### Registration

Web Components must be registered. To support this, I use decorators:

~~~
  import { CustomElement } from '@nyaf/lib;

  @CustomElement('app-main')
  export class MainComponent extends BaseComponent {

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

The name is determined by `@CustomElement('app-main')`. This is mandatory.

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
    components: [ButtonComponent, TabComponent, TabsComponent, MainComponent]
  });
~~~

The main goal is to add template features to the JSX part.

## Template Features

Template Features avoid using creepy JavaScript for loops and branches. You can use:

* `n-repeat`
* `n-if`, `n-else`
* `n-hide`, `n-show`

### n-repeat

Repeats the element. The argument must be an array.

Assume we have this object:

~~~
  { text: string, content: string }
~~~

In an array like this:

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

Than you show the data on screen like this:

~~~
  <app-tab n-repeat={tabs} title="@title" content="@content"></app-tab>
~~~

The array shall contain objects. If the property is needed, it's accessible within any attribute by writing `attribute="@propName"`. Note the usage of the quotes.

You can repeat anything, even plain HTML elements such as `<span>` or `<li>`.

### n-if, n-else

The value will be evaluated and the element does or does not render, then:

~~~
  <div class="main-header" n-if={this.props.title !== 't1'}>
    <span>Any content will not render if container doesn't render
  </div>
~~~

If there is an else-branch it can direct to a slot template. `<slot>` elements are native web component parts.

~~~
  <div class="main-header" n-if={this.props.title !== 't1'} n-else="noShow">
    <span>Any content will not render if container doesn't render
  </div>
  <slot name="noShow">
    This is shown instead.
  </slot>
~~~

### n-hide, n-show

Works same as `n-if`, but just adds an inline style `display: none` or not if `true` (`n-hide`) or `false` (`n-show`).

## Events

Events are defined by a special instruction. The are attached to `document` object, regardless the usage.

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

There is an alternative syntax that takes the method name directly:

~~~
  <button n-on-click='clickMe'>OK</button>
~~~

### Async

You can combine any event with the attribute `n-async` to make the call to the event's handler function async. This attribute does not take any parameters. The handler method must not be decorated with `async`.

~~~
<button n-on-click={(e) => this.clickMe(e)} n-async>OK</button>
~~~

## Router 

Everybody want's a SPA (Single Page App). Hence we need a router. The included router is very simple.

First, define an outlet where the components appear:

~~~
  <div n-router-outlet></div>
~~~

Any kind of parent element will do. The router code sets the property `innerHTML`. Components, that are being used to provide router content need registration too. They  ___must___ have a name, too, because that's the way the router internally activates the component.

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

> Pro Tip! Import the router definition and use additional fields to create a menu directly from router configuration.

If you have some sort of CSS framework running, that provides support for menu navigation by classes, just add the class for the currently active element to the `n-link` attribute like this:

~~~
  <a href="#/" n-link="active">Home</a>
  <a href="#/about" n-link="active">About</a>
  <a href="#/demo" n-link="active">Demo</a>
  <a href="#/contact" n-link="active">Contact</a>
  <div n-router-outlet></div>
~~~

After this, by clicking the hyperlink, the class "active" will be added to the anchor tag. Any click on any `n-link` decorated tag will remove all these classes from all these elements, first. The class' name can differ and you can add multiple classes. It's treated as string internally.

## Shadow DOM

By default the shadow DOM is ____not____ used. If it would, it would mean, that styles are isolated. No global styles are available, then.

One option to activate the Shadow DOM:

~~~
@ShadowDOM()
~~~

* Use Shadow DOM
* all global styles are still working (auto copy)

The property can be set explicitly. The default is `false`, hence if the decorator is being omitted, the component is ____not____ shadowed.

~~~
  @ShadowDOM(true | false)
~~~

Another interesting option controls the style behavior:

~~~
  @UseParentStyles()
~~~

* Use *ShadowDOM* must be set, otherwise the decorator does nothing
* copies all global styles into component so they work as expected even in Shadow DOM

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

> The State generic is optional. If there is no state necessary just skip.

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

### Custom Events

Sometimes the JavaScript events are not flexible enough. So you can define your own ones. That's done by three simple steps:

* Add a decorator `@Events` to declare the events
* Create `CustomEvent` object and dispatch (that's native Web Component behavior)
* use the `n-on-customName` attribute to attach the event.

Imagine a button component like this:

~~~
@CustomElement('app-button')
@Events(['showAlert'])
export class ButtonComponent extends BaseComponent {
  constructor() {
    super();
  }

  clickMe(e) {
    const checkEvent = new CustomEvent('showAlert', {
      bubbles: true,
      cancelable: false,
    });
    super.dispatchEvent(checkEvent);
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

The custom event is called *showAlert*. It's invoked by a click. The element's host component has code like this:

~~~
<app-button n-on-showAlert={(e) => this.someHandler(e)} />
~~~

The argument *e* contains the `CustomEvent` object. It can carry any number of custom data.


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
  @InjectService(ServiceClass1)
  @InjectService(ServiceClass2)
  export class MainComponent extends BaseComponent {
    // ... omitted for brevity


    protected async render() {
      let data = await this.services<ServiceClass1>().callAnyServiceFunctionHereAsync();
    }

  }
~~~

> Async is an option, can by sync, too.

*this.services* is a function, that returns an instance of the service. Services are singleton by default.

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
  import { BaseComponent, ComponentData } from '@nyaf/lib';
  import JSX, { CustomElement } from '@nyaf/lib';

  @CustomElement('app-main')
  export class MainComponent extends BaseComponent {

  	constructor() {
  		super();
  	}

  	protected getData(): ComponentData {
  		return null;
  	}

  	static get observedAttributes() {
  		return [];
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

The *webpack.config.json* looks like this:

The *package.json* gets an entry in `scripts` section:

~~~
build: "webpack",
~~~

## Build

Now, on command line, just type `npm run build`.

To start webpack's dev server type:

~~~
npm start
~~~

An now enjoy writing a component based SPA with only very few KB of lib code.

# Recap

Is it worth coding with NYAF and vanilla JS? For smaller projects and for apps that must load quickly, yes.

The zipped package of the lib is 7 KBytes. Expanded just 20 KBytes. Demo code is 115 KB but already includes a good bunch of Bootstrap's CSS.

However, compared with React or Angular it's a lot simpler. Compared to Vue it's simpler and even smaller, but the delta is not that thrilling.

## Tool Support

What tool support? It's Web Components - any editor will do. It's JSX/TSX, so any good editor can handle this. And there are TypeScript decorators, event this is well supported. So, you don't need to tweak your editor. It works, no red squiggles, guaranteed.

## Restrictions

The package runs, if there are no polyfills, only with ES2015. This limits the usage to any modern browser. It's pretty bold in Electron projects.

## Credits

Inspired by:

* Angular (thanks for the idea of using decorators)
* Polymer (especially lit-element, thanks for showing that Web Components are bold)
* React (thanks for JSX)
* Vue (thanks for showing short custom attributes)
* TypeScript (I love it, period)


## Next

Look out for 'nyaf-forms' (forms validation) and 'nyaf-store' (flux store). Simple but powerful! Available mid of 2019.

