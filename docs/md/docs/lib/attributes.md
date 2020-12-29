
## State and Properties

There is no explicit difference between State and Property. Compared with React it's much more simpler. A state still exists and it supports smart rendering.

![Figure A-3: Smart Properties](assets/smartprops.png)

### State

To declare a state object use a generic like this:

~~~ts
export class MainComponent extends BaseComponent<{ cnt: number}> {
  // ... omitted for brevity
}
~~~

> The State generic is optional. If there is no state necessary just use `any` or an empty object such  as `{}`.

Now a property and a function are available:

* `data` (property): Returns the instance of the data object and contains all properties defined in the generic.
* `setData(prop: string, val: any)` (function): Sets a value and if the value differs re-renders the component.

A simple counter shows how to use:

~~~ts
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
        <pre style='border: 1px solid gray;'>{ this.data.cnt }</pre>
      </>
    );
  }
}
~~~

However, changing *this.data* directly would be sufficient, too. The underlying object is a `Proxy` and can handle value changes automatically. The explicit function call is available to have a more dynamic approach through the property parameter.

### Properties

Property names in JavaScript are in camel case while HTML attribute names are in kebab case (dash-separated) to match HTML standards. For example, a JavaScript property named *itemName* maps to an HTML attribute named *item-name*.

Don’t start a property name with these characters:

* `on` (for example, *onClick*)
* `aria` (for example, *ariaDescribedby*)
* `data` (for example, *dataProperty*)

Don’t use these reserved words for property names.

* `slot`
* `part`
* `is`

To use properties, you must define those. Each property is automatically part of the state and once it changes, the component re-renders.

~~~ts
@CustomElement('app-btn')
@Properties<{ title: string }>({ title: 'Default' })
export class ButtonComponent extends BaseComponent<{ title: string, cnt: number }> {
  // ... omitted for brevity
}
~~~

![Figure A-4: Smart Property Declaration](assets/smartprops2.png)

The initializer with default's is __not__ optional, you must provide an object that matches the generic.

This is how you use such a component (part of the render method):

~~~tsx
const someTitle='Demo';
return (<app-btn title={someTitle} />);
~~~

The `@Properties` decorator defines all properties, that are now monitored (observed) and hence the value is evaluated and rendered. If the value changes the component renders itself automatically.

### Accessing Properties

The access using the property with `data` is internally and externally available. That means, you can retrieve a component and set values like this:

~~~ts
(this.querySelector('[data-demo-button]') as any)
    .data
    .text = 'Some demo data';
~~~

As with `setData` internally this will trigger the renderer to re-render the content with the new values, but in this case the trigger is outside the component.

### Properties and Models

For a nice looking view some decorators applied to class properties control the appearance.

~~~ts
export class Model {
  id: number = 0;
  name: string = '';
}

@CustomElement('app-main')
@Properties<Model>({ id: 0, name: '' })
export class MainComponent extends BaseComponent<Model> {
  // ... omitted for brevity
}
~~~

Within the component, this model now present. In the above definition `this.data` contains an actual model. The forms module contains a more sophisticated way to handle a view model with bi-directional data binding. the properties discussed here are for access from a parent component, while the form's module view models handle this internal binding.

The settings of the decorator `@Properties` are the defaults, if no attributes are set. However, even if the existence of a default is not necessary, you must provide values here. This is due to the runtime behavior, where JavaScript requires a real type to create the instance properly. The generic in both places, the decorator and the base class, helps TypeScript to understand the model type and is mainly to support an excellent editor experience.
