
## Router

Usually we create SPAs (Single Page Apps). Hence we need a router. The included router is very simple.

First, define an outlet where the components appear:

~~~html
<div n-router-outlet></div>
~~~

Any kind of parent element will do. The router code sets the property `innerHTML`. Components, that are being used to provide router content need registration too. They ___must___ have a name, too, because that's the way the router internally activates the component.

> There is just one default outlet. See further below for using named outlets.

![](/assets/routerparts.png)

### Register Routes

The following code shows how to register routes:

~~~ts
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

You can shorten the property here, too:

~~~ts
const components = [DemoComponent, AboutComponent, ContactComponent, MainComponent];

GlobalProvider.bootstrap({
  components,
  routes
});
~~~

### Use Routes

To activate a router you need a hyperlink. The router's code looks for a click onto an anchor tag. An appropriate code snippet to use the routes looks like this:

~~~html
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

~~~html
<a href="#/" n-link="active">Home</a>
<a href="#/about" n-link="active">About</a>
<a href="#/demo" n-link="active">Demo</a>
<a href="#/contact" n-link="active">Contact</a>
<div n-router-outlet></div>
~~~

After this, by clicking the hyperlink, the class "active" will be added to the anchor tag. Any click on any `n-link` decorated tag will remove all these classes from all these elements, first. The class' name can differ and you can add multiple classes. It's treated as string internally.

### Named Routes

The underlying Route definition, the type `Routes`, allows two additional fields (`outlet` and `data`):

~~~ts
const routes: Routes = {
  '/': { component: HomeComponent, outlet: 'main' },
  '/docu': { component: DocuComponent, outlet: 'main', data: { notlocal: true} },
  '/about': { component: AboutComponent, outlet: 'main' },
  '/demo': { component: DemoComponent, outlet: 'main',
  '/router': { component: RouterComponent, outlet: 'main' },
  '/router/page1': { component: Page1Component, outlet: 'router' },
  '/router/page2': { component: Page2Component, outlet: 'router' },
  '/router/page2/other': { component: Page2Component, outlet: 'other' },
  '/router/page3/other': { component: Page3Component, outlet: 'other' },
  '/contact': { component: ContactComponent }
};
~~~

With `outlet` one can define a named outlet. If you use this, you must name all routes as there is no fallback currently. The route outlet might reside everywhere. It may look like this:

~~~html
<div n-router-outlet="other"></div>
~~~

If the route's components deliver `<li>` elements, you can also use something like this to build well formatted HTML:

~~~html
<ul n-router-outlet="other"></div>
~~~


There is no difference on the link side, the decision to address another outlet is made in the configuration only. If the outlet doesn't exists nothing happens and a warning appears on the console (in DEBUG mode).

> In the example I use routes that look like child routes. That's a hint for the intended behavior, but it's technically not necessary doing so. The resolver is very simple and doesn't care about routes, it's just matching the string and seeking the outlet.

### Additional Data

The last example showed another field `data`. This is a dictionary with arbitrary data just stored here. If you setup a navigation dynamically based on the configuration data you can control the behavior in a well defined way. However, There is no code intercepting these data, it's task of the implementer to do something useful here.

If you use `data: { title: 'Some Title' } ` the value in the field *title* is being copied to the websites `title` field. That way it appears on the tab (or header bar in Electron). If it's omitted, it's not being set at all.

### Navigate to Route

You can navigate by code:

~~~ts
GlobalProvider.navigateRoute('/my-route');
~~~

The outlet is pulled from configuration, but if provided as second parameter it can be overwritten.

> **Hint:** In the link elements you use the '#' prefix. In the `navigateRoute` method this is not necessary and hence not allowed.

### Route Events

The router fires two events, available through the static `GlobalProvider` class like this:

~~~js
GlobalProvider.routerAction.addEventListener('navigate', (evt) => {
  const route = evt.detail;
  evt.cancel = true;   // optionally cancel before execution
}
~~~

~~~js
GlobalProvider.routerAction.addEventListener('navigated', (evt) => {
  const route = evt.detail;
  // this event can't be cancelled
}
~~~

If you have a dynamic component and you set the event handler, don't forget to remove the event handler in the dispose callback.

