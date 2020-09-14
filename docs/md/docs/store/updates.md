## Automatic Updates

The `@Updates` decorator complements the `@Effects` decorator. The schema is similar. However, both decorators work independently of each other and you can use any or both.

### The Updates Decorator

The decorator exists once on a component. The API looks like this:

~~~ts
@Updates(Update[])
~~~

It makes only sense in conjunction with the store itself (a missing store will throw an exception). This is how it goes with a real component:

~~~ts
@CustomElement('app-store-effects')
@ProvideStore<allStoreTypes>(store)
@Updates<allStoreTypes>([
  {
    store: 'counter',
    selector: '[data-store-counter]',
    target: 'textContent'
  }
])
export class StoreUpdateComponent extends BaseComponent<{ cnt: number }> implements IStore<allStoreTypes> {
}
~~~

The piece of HTML that this `@Update` decorator setting addresses is shown below:

~~~tsx
<div class='badge badge-info' data-store-counter>n/a</div>
~~~

There is no additional code required to update the HTML. Once a change in the store ocurred the value is pulled from the store and written into the selected property. In the example the store's value 'counter' is monitored by a subscription. The elements are being selected once in the lifecycle state `Load`. Further changes of the component's DOM are not being processed. The access works with or without shadow DOM. The element's selector in the example is '[data-store-counter]'. You can use any selector `querySelectorAll` would accept. If there are multiple elements indeed, the assignment will happen multiple times. The target property is 'textContent'. You can use any property that the selected element or component supports. Be aware that the access is property access on code level. That means, a virtual attribute of a component will not work, because it's not change in markup. If you have a component as the target, and wish to write a value to an observed attribute, you must introduce getter and setter methods to support the `@Update` decorator.

In the example the store definition (using `@ProvideStore`) and the update configuration (using `@Updates`) use the very same store type. That's not necessary. If the store type is a combined type (as in the example code you can find on Github), consider using one of its partial types for the update to shrink the selection to the part you really need. This avoids errors and improves the readability of your code.

### Using the Updates Decorator

The following code shows the typical store subscription, usually assigned in the constructor:

~~~ts
this.sub = this.store.subscribe('counter', str => {
  this.querySelector('[data-store-counter]').textContent = str.counter;
});
~~~

The value is written in a freshly selected element. The very same result can be achieved with the following code:

~~~ts
@Updates<allStoreTypes>([ {
    store: 'counter',
    selector: '[data-store-counter]',
    target: 'textContent'
}])
~~~

While this not seem to be a big advantage (in fact, 2 lines more), the real reason is to avoid **any** code in the component directly, making it pure view. On the long term this creates clean code and helps to make a  ore systematic structure.

The decorator accepts an array of objects of type `Update`. This type is an interface that has the following API:

* `selector`: A string that can be handled by `querySelectorAll`.
* `store`: A string that is one of the properties of the store type. This is managed by the generic.
* `target`: A string that's the name of a property the selected element or component supports. This is not being checked by TypeScript.

#### The Selector

The selector is a string that can be handled by `querySelectorAll`. This is mandatory and the selector must return at least one element. The selector is executed after the life cycle event state `Load`. That means, that the `render` function is executed. The selector will not get any elements you add later dynamically.

To avoid any conflicts it's strongly recommended to use *data-* attributes and avoid any CSS stuff to select elements, especially not the `class` attribute.

#### The Store

The store has usually a type definition to define the fundamental structure. Usually it's just an interface. The generic provides this type definition and you can choose any of these properties. Internally it's a `keyof T` definition.

#### The Target

Because you can't write a value straight into an element or into a component you must define a specific property. The type is either any of the properties supported by `HTMLElement`or just a string. This is weak from standpoint of Intellisense (in fact, there is actually no check at all), but flexible enough to support all common scenarios.

It's a trade-off between convenience and security. A more rigid approach would require a generic on the level of the `Update` interface. But with an anonymous type definition you can't provide a generic. That means you need to add an additional type information. In the end it's a lot more boilerplate code for a little safety. That's the reason while the definition can be made so simple.

