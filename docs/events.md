# Shadow DOM and events

The idea behind shadow tree is to encapsulate internal implementation details of a component.

Let’s say, a click event happens inside a shadow DOM of `<user-card>` component. But scripts in the main document have no idea about the shadow DOM internals.

So, to keep the details encapsulated, the browser re-targets the event. Events that happen in shadow DOM have the host element as the target, when caught outside of the component.

## Introduction

Here’s a simple example:

~~~
<user-card></user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<p>
      <button>Click me</button>
    </p>`;
    this.shadowRoot.firstElementChild.onclick =
      e => alert("Inner target: " + e.target.tagName);
  }
});

document.onclick =
  e => alert("Outer target: " + e.target.tagName);
</script>
~~~

If you click on the button, the messages are:

* Inner target: BUTTON – internal event handler gets the correct target, the element inside shadow DOM.
* Outer target: USER-CARD – document event handler gets shadow host as the target.

Event re-targeting is a great thing to have, because the outer document doesn’t have to know about component internals. From its point of view, the event happened on `<user-card>`.

Re-targeting does not occur if the event occurs on a slotted element, that physically lives in the light DOM. In the chapter about slots you can find more details regarding slot behavior.

For example, if a user clicks on <span slot="username"> in the example below, the event target is exactly this span element, for both shadow and light handlers:

~~~
<user-card id="userCard">
  <span slot="username">John Smith</span>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<div>
      <b>Name:</b> <slot name="username"></slot>
    </div>`;

    this.shadowRoot.firstElementChild.onclick =
      e => alert("Inner target: " + e.target.tagName);
  }
});

userCard.onclick = e => alert(`Outer target: ${e.target.tagName}`);
</script>
~~~

If a click happens on "John Smith", for both inner and outer handlers the target is `<span slot="username">`. That’s an element from the light DOM, so no re-targeting.

On the other hand, if the click occurs on an element originating from shadow DOM, e.g. on `<b>Name</b>`, then, as it bubbles out of the shadow DOM, its event.target is reset to `<user-card>`.

### Bubbling

For purposes of event bubbling, flattened DOM is used. So, if we have a slotted element, and an event occurs somewhere inside it, then it bubbles up to the `<slot>` and upwards.

The full path to the original event target, with all the shadow elements, can be obtained using event.composedPath(). As we can see from the name of the method, that path is taken after the composition.

In the example above, the flattened DOM is:

~~~
<user-card id="userCard">
  #shadow-root
    <div>
      <b>Name:</b>
      <slot name="username">
        <span slot="username">John Smith</span>
      </slot>
    </div>
</user-card>
~~~

So, for a click on `<span slot="username">`, a call to `event.composedPath()` returns an array:

~~~
[ span, slot, div, shadow-root, user-card, body, html, document, window]
~~~

That’s exactly the parent chain from the target element in the flattened DOM, after the composition.

> Shadow tree details are only provided for `{mode:'open'}` trees. In NYAF, this requires using the `@ShadowDOM` decorator.

If the shadow tree was created with {mode: 'closed'}, then the composed path starts from the host: user-card and upwards.

That’s the similar principle as for other methods that work with shadow DOM. Internals of closed trees are completely hidden.

#### Composed Events

Most events successfully bubble through a shadow DOM boundary. There are few events that do not.

This is governed by the composed event object property. If it’s true, then the event does cross the boundary. Otherwise, it only can be caught from inside the shadow DOM.

If you take a look at UI Events specification, most events have *composed: true*:

* blur, focus, focusin, focusout
* click, dblclick
* mousedown, mouseup mousemove, mouseout, mouseover
* wheel
* beforeinput, input, keydown, keyup

All touch events and pointer events also have *composed: true*.

There are some events that have *composed: false* though:

* mouseenter, mouseleave (they do not bubble at all)
* load, unload, abort, error
* select
* slotchange

These events can be caught only on elements within the same DOM, where the event target resides.

## Custom events

When we dispatch custom events, we need to set both bubbles and composed properties to true for it to bubble up and out of the component.

For example, here we create div#inner in the shadow DOM of div#outer and trigger two events on it. Only the one with composed: true makes it outside to the document:

~~~
<div id="outer"></div>

<script>
outer.attachShadow({mode: 'open'});

let inner = document.createElement('div');
outer.shadowRoot.append(inner);

/*
div(id=outer)
  #shadow-dom
    div(id=inner)
*/

document.addEventListener('test', event => alert(event.detail));

inner.dispatchEvent(new CustomEvent('test', {
  bubbles: true,
  composed: true,
  detail: "composed"
}));

inner.dispatchEvent(new CustomEvent('test', {
  bubbles: true,
  composed: false,
  detail: "not composed"
}));
</script>
~~~

## Adoption in NYAF

Adding events requires script work. In NYAF we have a simplified approch to make it easier to use. However, this doesn't change the basic behavior and flow as described before.

Events are defined by a special instruction. They are attached to `document` object, regardless the usage.

### The Attribute n-on-[event]

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

* Add a decorator `@Events` to declare the events (it's an array to declare multiple in one step). Mandatory.
* Create `CustomEventInit` object and dispatch it (that's [native Web Component behavior](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent))
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

The argument *e* contains an `CustomEvent` object. It can carry any number of custom data. The `click`-invoker is just an example, any action can call a custom event, even a web socket callback, a timer, or an HTTP request result. Both `CustomEvent` and `CustomEventInit` have a field `detail` that can carry any object or scalar and is the proposed way to transport custom data with the event. The event handler could look like this:

~~~
private showAlert(e: CustomEvent) {
  const data = e.detail;
  // Your code that handles the event
}
~~~

> Custom events can be async, too. Just add `n-async` to the element that fires the event and add the `async` modifier to the handler.

## Summary

Events only cross shadow DOM boundaries if their composed flag is set to true.

Built-in events mostly have composed: true, as described in the relevant specifications:

UI Events https://www.w3.org/TR/uievents.
Touch Events https://w3c.github.io/touch-events.
Pointer Events https://www.w3.org/TR/pointerevents.
…And so on.

These events can be caught only on elements within the same DOM.

If we dispatch a CustomEvent, then we should explicitly set composed: true.

Please note that in case of nested components, one shadow DOM may be nested into another. In that case composed events bubble through all shadow DOM boundaries. So, if an event is intended only for the immediate enclosing component, we can also dispatch it on the shadow host and set composed: false. Then it’s out of the component shadow DOM, but won’t bubble up to higher-level DOM.