# NYAF is "Not Yet Another Framework" 

And it is, well, just another framework. It's simple, has a flat learning curve, doesn't need any special tools.

## Idea

I want to use JSX/TSX syntax for quick component dev.

I want to use any current HTML 5 API, such as web components, fetch, and all this with ES2015.

I want to have a simple template language, that avoids clunky map, reduce, filter stuff within the HTML.

I want to use TypeScript from the beginning.

I want to have a very small package.

I want to use webpack and other common tools.

I want to use decorators for controlling stuff, not code within  the component.

## Approach

I'm using TSX. I don't use React, though. So it's just a feature of the TypeScript compiler.

Excerpt from `tsconfig.json`:

~~~
"jsx": "react",
"reactNamespace": "JSX",
~~~

A class `JSX` is the core, it handels the element definitions and extract the template extensions.

## Template Features

### n-repeat, n-for

Repeats the element if the argument is an array.

Assume we have this object:

~~~
{ text: string, content: string }
~~~

In an array like this:

~~~
[{ text: "hallo", content: "Hello NYAF" }, { text: "world", content: "This is really nice" }]
~~~

And want to show on screen like this:

~~~
<app-tab n-repeat={tabs} title="@title" content="@tab"></app-tab>
~~~

The array shall contain objects. If the property is needed, it's accessible withing any attribute by writing `@propName`.

> `n-for` is an alias.

### n-if, n-else

The value will be evaluated and the element dows or does not render, then:

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

Events are easy to ad directly using it like `n-on-click`. All JavaScript events are supported. Just replace 'click' in the example with any other JavaScript event.

~~~
<button n-on-click={() => this.clickMe()}>OK</button>
~~~

> There is no `bind` necessary, events are bound to component anyway.

You can get the (original HTML 5 API) event using a parameter, like *e* in the example below:

~~~
<button n-on-click={(e) => this.clickMe(e)}>OK</button>
~~~

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
  components: [ButtonComponent, TabComponent, TabsComponent, MainComponent]
});

~~~

That's it, the component works now.

### Router 

Everybody want's a SPA (Single Page App). Hence we need a router. The included router is very simple.

First, define an outlet where the components appear:

~~~
<div n-router-outlet></div>
~~~

Any kind of parent element will do. The router code sets the property `innerHTML`. Components, that are being used to provide router content doesn't need registration, because they aren't activated through the tag. Only the *render* method is called. Yoo can even omit the `@CustomElement` decorator.

#### Register Routes

The following code shows how to register routes:

~~~
let routes = {
  '/': DemoComponent,
  '/about': AboutComponent,
  '/demo': DemoComponent,
  '/contact': ContactComponent,
};

globalProvider.bootstrap({
  // order matters?
  components: [ButtonComponent, TabComponent, TabsComponent, MainComponent],
  routes: routes
});
~~~

#### Use Routes

To activate a router you need a hyperlink. The router's code looks for a click onto an anchor tag. An appropriate code snippet to use the routes looks like this:

~~~
<a href="#/">Home</a>
<a href="#/about">About</a>
<a href="#/demo">Demo</a>
<a href="#/contact">Contact</a>
<div n-router-outlet></div>
~~~

Please note the hash sign (#). It's required. No code or strategies here, write it by yourself and the enjoy a very small footprint of the supporting code.

### Shadow Dom

By default a shadow dow is used. That means, styles are isolated. No global styles are available.

One option:

~~~
@NoShadowDOM()
~~~

* Suppress Shadow
* all global styles are working

Another option:

~~~
@UseParentStyles()
~~~

* use Shadow
* copy all global styles into component so they work as expected

s> It's a trade-off. Shadow DOM increases performance. Copying many styles decreases performance.

### Properties

To use properties, you can define those.

~~~
@CustomElement('app-main')
@Properties<{ title: string }>('Default')
export class MainComponent extends BaseComponent {
  // ... omitted for brevity
}
~~~

### View Models

For a nice view decorators applied to class properties control the appearance.

~~~
export class Model {
  @Hidden()
  id: number = 0;

  @Required()
  name: string = '';
}


@CustomElement('app-main')
@Properties<{ data: Model }>()
@ViewModel(Model)
export class MainComponent extends BaseComponent {
  // ... omitted for brevity
}
~~~

Within the component, this is now present. 

~~~
this.modelState = {
  isValid: boolean,
  isPresent: boolean,
  errors: { [key: string]: string },
  model: Model
}
~~~

In the above definition `this.props.data` contains an actual model. It's supervised. After render *this.modelState* helds the state of the model.

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

## Recap

Is it worth coding with NYAF and vanilla JS? For smaller projects and for apps that must load quickly, yes.

The zipped package of the demo is 7 KBytes. With complete Bootstrap styles it's 35 KBytes.

However, compared with React or Angular it's a lot simpler. Compared to Vue it's simpler and even smaller, but the delta is not that thrilling.