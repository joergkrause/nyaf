## Directives

Directives are extensions to host components that are bound to attributes. Think of it like smart handling for data, events, or actions.

### Make a Directive

To make a directive you use the `@Directive` decorator and the base class `BaseDirective`. The directive helps registering the class. The base class supports the editor and type safety.

A simple example shows how to make any element draggeable.

~~~ts
@Directive('[directive="drag"]')
export class DragDirective extends BaseDirective {

  constructor(public host: HTMLElement) {
    super(host);
    this.host.draggable = true;
  }

  setup() {
    this.host.addEventListener('dragstart', (e: DragEvent) => {
      e.dataTransfer.setData('text', 'from button');
    });
    this.host.addEventListener('dragover', (e: DragEvent) => {
      e.preventDefault();
    });
  }

}
~~~

Directives are activated by any kind of selector `querySelectorAll`can process. In the example we use the *[directive="drag"]* selector, which is an attribute with a value. To apply this directive, two steps are required.

1. As always, you must register your directive first
2. You apply the selector to any element (standard HTML, Web Components, or own stuff - it works everywhere)

#### Registration

The registration is part of the `GlobalProvider`'s bootstrap process:

~~~ts
// example import
import { DropTargetDirective, DragDirective } from './directives/index';

GlobalProvider.bootstrap({
  // other parts omitted for brevity
  directives: [DropTargetDirective, DragDirective],
  // other parts omitted for brevity
});
~~~


#### Activation

The directive applies ones a component renders. That means, the directive must be part of a **@nyaf** component. But the actual assignment can be placed on any HTML element. If you have just one global component and pure HTML in it, then the directive will still work.

To activate the directive just add the selector to an element:

~~~html
<button type='button' directive='drag'>
Drag me around
</button>
~~~

The element becomes now a host element for the directive. One directive can be applied to many elements. The are isolated instances. For each occurrence of the selector a new instance of the directive class is created.

### Working with Host Elements

To get access to the host the directive shall modify a property *host* is provided by the base class. It's available immediately after the `super` call of the constructor and injected as a constructor parameter. That's mandatory.

~~~ts
constructor(public host: HTMLElement) {
  super(host);
  // here you can safely access the host element
}
~~~

After the constructor call the infrastructure calls a method *setup*. It has no parameters and is not awaitable. It's a good point to add event listeners or add further modifications to the element as shown in the example above.

The host element is aware of a shadow DOM, so it might be the host's element object or a shadowed element. This depends on the usage of the `@ShadowDOM` directive. There is nothing special here, you can use it directly. The type cast is `HTMLElement`. That means in TypeScript the properties specific to shadow DOM are not available in the API. In JavaScript they are still present, though, that means you could enforce a cast like `this.host as unknown as ShadowRoot`. Usually, that's a very rare situation anyway. The idea behind this behavior is that we want to make the shadow DOM as transparent as possible, without forcing the developer to think about it.

