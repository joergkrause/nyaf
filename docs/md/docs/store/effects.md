## Effects Mapping

A component is basically just an user interface (UI), that is defined by HTML. This UI can be dynamic in both directions, receiving user actions and react to changes in an underlying data model. In business components this leads to a significant amount of code, that is primarily just a reference to the coding environment. For user actions it's a number of event hooks leading to handlers. For data changes it's the binding to a model and code to monitor changes.

The Flux store reduces the amount of code by moving the actual business logic to the reducer functions. That a big progress compared to traditional programming styles, but the remaining definitions are now only skeletons to function calls. It would be great to have these function calls reduced to the bare minimum of code and, in the same step, collected in one single definition just like the reducers. This features exists in **ny@f** and it's called *Effects*.

### The Effects Decorator

The decorator exists once on a component. The API looks like this:

~~~ts
@Effects(Effect[])
~~~

It makes only sense in conjunction with the store itself. This is how it goes with a real component:

~~~ts
@CustomElement('app-store-effects')
@ProvideStore<allStoreTypes>(store)
@Effects([
  {
    selector: 'button[data-action="ADD"]',
    trigger: 'click',
    parameter: (e) => (e.target as HTMLElement).dataset.payload || 1,
    action: INC
  }
])
export class StoreEffectsComponent extends BaseComponent<{ cnt: number }> implements IStore<allStoreTypes> {
}
~~~

Imagine this code in a component without effects:

~~~tsx
<button class='btn btn-md btn-success' type='button' n-on-click={e => this.clickMeAdd(e)}>
  Add 1
</button>

clickMeAdd(e) {
  this.store.dispatch(INC, 1);
}
~~~

The whole purpose of the code is to add a click event and trigger the dispatcher. Effects move both parts outside of the component and you can remove the code entirely. The view becomes simpler and the component is smaller and less error-prone.

### Using the Effects Decorator

To keep the handler stuff outside the component and still connected to one we use a decorator. The following example gives you an impression how this could look like:

~~~ts
@Effects([
{
  selector: '[data-action="ADD"]',
  trigger: 'click',
  parameter: (e) => (e.target as HTMLElement).dataset.payload || 1,
  action: INC
},
{
  selector: '[data-action="SUB"]',
  trigger: 'click',
  parameter: (e) => (e.target as HTMLElement).dataset.payload || 1,
  action: DEC
},
{
  selector: '[data-action="SET"]',
  trigger: 'click',
  parameter: (e) => +(e.target as HTMLElement).dataset.payload,
  action: SET
}
])
~~~

The decorator accepts an array of objects of type `Effect`. This type is an interface that has the following API:

* `selector`: A string that can be handled by `querySelectorAll`.
* `trigger`: A string that is one of the common ECMAScript events an element can fire or any custom event name.
* `action`: A string constant that the store's reducer accept in a dispatch call.
* `parameter`: An (optional) function that retrieves a value from the event handler parameter.

#### The Selector

The selector is a string that can be handled by `querySelectorAll`. This is mandatory and the selector must return at least one element. The selector is executed after the life cycle event state `Load`. That means, that the `render` function is executed. The selector will not get any elements you add later dynamically.

To avoid any conflicts it's strongly recommended to use *data-* attributes and avoid any CSS stuff to select elements, especially not the `class` attribute.

#### The Trigger

The trigger is a string that is one of the common ECMAScript events an element can fire or any custom event name. To support IntelliSense a number of common events is part of the definition, but technically it's allowed to use any string here. Internally the event is attached to the outcome of the selector by using `addEventHandler(trigger)`.

#### The Action Definition

The action is a string constant that the store's reducer accept in a dispatch call. It's recommended to use the action constants and not provide any string values here directly. The binder class that handles this internally will throw an exception in case the action is not known by the store.

#### The Parameter

The Parameter is a function that retrieves a value from the event handler parameter. This is the only optional value. You can omit it in case the dispatched action does not need a payload. For all other reducer calls this function returns a value that's being used as the payload.

The returned type is always `any` without further restrictions.

The input parameter is the event's parameter object. In most cases it's of type `Event`, or `KeyEvent`, or `MouseEvent`. In case of a custom component it could be `CustomEvent`. To retrieve values the best way is to access the source element by using this code snippet:

~~~ts
const element = (e.target as HTMLElement);
~~~

To provide dynamic values the *data-* attributes are a robust way doing so. To access the values directly use the `dataset` property. In case your attribute is further divided in sections using the kebab-style (such as in *data-action-value*) the `dataset` property converts this into camel case (*action-value* transforms into *actionValue*). But, you can use any other property of the event source to set values. You can also simply use static values, too. However, even if technically possible, it's not recommended to add any business logic or validation code in this functions. Move such code consequently to the reducer. Otherwise you logic code will be split-up and becomes very hard to maintain. The reason the `@Effects` decorator exists is just to get a more rigid structure in your app.




