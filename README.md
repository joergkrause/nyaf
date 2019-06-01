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

A class `JSX` is the core, it handels the element definitions and extract the template extensions.

## Template Features

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

### n-on-[event]

Events are easy to add directly using it like `n-on-click`. All JavaScript events are supported. Just replace 'click' in the example with any other JavaScript event.

~~~
<button n-on-click={() => this.clickMe()}>OK</button>
~~~

> There is no `bind` necessary, events are bound to component anyway.

You can get the (original HTML 5 API) event using a parameter, like *e* in the example below:

~~~
<button n-on-click={(e) => this.clickMe(e)}>OK</button>
~~~

There is an alternative syntax that takes the method name directly:

<button n-on-click='clickMe'>OK</button>

#### Async

You can combine any event with the attribute `n-async` to make the call to the event's handler function async. This attribute does not take any parameters. The handler method must not be decorated with `async`.

<button n-on-click={(e) => this.clickMe(e)} n-async>OK</button>

## Components

### Registration

Web Components must be registered. To support this, I use decorators:

~~~
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

The name is determined by `@CustomElement('app-main')`.

In *main.ts* call this:

~~~
globalProvider.bootstrap({
  components: [MainComponent]
});

~~~

That's it, the component works now.

Once you have more components, it may look like this:

~~~
globalProvider.bootstrap({
  components: [ButtonComponent, TabComponent, TabsComponent, MainComponent]
});

~~~

### Router 

Everybody want's a SPA (Single Page App). Hence we need a router. The included router is very simple.

First, define an outlet where the components appear:

~~~
<div n-router-outlet></div>
~~~

Any kind of parent element will do. The router code sets the property `innerHTML`. Components, that are being used to provide router content need registration too. They  ___must___ have a name, too, because that's the way the router internally activates the component.

#### Register Routes

The following code shows how to register routes:

~~~
let routes = {
  '/': { component: DemoComponent },
  '/about': { component: AboutComponent },
  '/demo': { component: DemoComponent },
  '/contact': { component: ContactComponent },
  '**': { component: DemoComponent }
};

globalProvider.bootstrap({
  components: [DemoComponent, AboutComponent, ContactComponent, MainComponent],
  routes: routes
});
~~~

The first entry `'/': { component: DemoComponent },` shall always exist, it's the default route loaded on start. It's being recognized by the `'/'` key (the position in the array doesn't matter).
The entry `'**': { component: DemoComponent }` is optional and defines a fallback in case an invalid path is being used.

#### Use Routes

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

### Shadow DOM

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

### Properties

To use properties, you can define those.

~~~
@CustomElement('app-main')
@Properties<{ title: string }>({ title: 'Default' })
export class MainComponent extends BaseComponent {
  // ... omitted for brevity
}
~~~

The initializer with default's is ____not____ optional, you must provide an object that matches the generic.

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

Within the component, this is now present. In the above definition `this.props.data` contains an actual model. 

### Services

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

## Prepare a project

Install the package:

~~~
npm i @nyaf/lib -S
~~~

Create a file `main.ts` in the *src* folder that looks like this:

~~~
import { globalProvider } from 'nyaf';

import { MainComponent } from './main.component';

globalProvider.bootstrap({
  components: [MainComponent],
});
~~~

Create file *main.component.ts* in the same folder. Fill this content in:

~~~
import { BaseComponent, ComponentData } from 'nyaf';
import JSX, { CustomElement } from 'nyaf';

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

~~~
~~~

The *webpack.config.json* looks like this:

~~~
~~~

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

The zipped package of the lib is 7 KBytes. Expanded just 23 KBytes.

However, compared with React or Angular it's a lot simpler. Compared to Vue it's simpler and even smaller, but the delta is not that thrilling.

## Restrictions

The package runs, if there are no polyfills, only with ES2015. This limits the usage to any modern browser. It's pretty bold in Electron projects.

# Next

Look out for 'nyaf-forms' (forms validation) and 'nyaf-store' (flux store). Simple but powerful!

