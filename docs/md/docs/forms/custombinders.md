## Custom Binders

Custom Binders help binding to specific properties. They can be used like the embedded binders, that acts just as examples and use the same way.

### Implementing a Custom Binder

A custom binder handles the binding procedure when binding a viewmodel property to an element attribute. It consists of three parts:

1. The binding setup (`bind`)
2. The binder into the element (a property change leads to an attribute change)
3. The listener (a attribute change event leads to a updated model property)

Step 2 and 3 are both optional, leading to a uni-directional binding in one or another direction.

~~~ts
export class VisibilityBinder<T extends ConfirmSuccessErrorComponent> implements IBindingHandler
{
  bind(binding: Binding): void {
    (binding.el as T).addEventListener('done', (e) => {
      this.listener(binding, e);
    })
    this.react(binding);
  }
  react(binding: Binding): void {
    (binding.el as T).visibility = !!binding.value;
  }
  listener(binding: Binding): void {
    const value = (binding.el as T).visibility;
    binding.value = value;
  }
}
~~~

#### How it Works

First, you need to implement `IBindingHandler`.

~~~ts
export interface IBindingHandler {
  bind?(binding: Binding | ValidatorBinding): void;
  react(binding: Binding | ValidatorBinding, property?: string): void;
  listener?(binding: Binding | ValidatorBinding, e?: Event): void;
}
~~~

A handler must react to something, but everything else is optional. See this line:

~~~ts
export class VisibilityBinder<T extends ConfirmSuccessErrorComponent> implements IBindingHandler
~~~

The generic is optional. It allows the definition of the target element. If it's omitted, it falls back to `HTMLElement`. Ypu can use any
HTML 5 element type or any custom web component type (as in the example).

The `bind` method is called implicitly by the infrastructure. If doesn't exist it's being ignored. the only reason to use it is attaching an event listener. You may also consider calling `react` immediately to sync the data, but it depends on the actual behavior of the element any may result in an additional binding process while loading the form.

The method `react` is called from the view model proxy instance each time the value changes. Write code here to assign the data to any property of the target element.

The method `listener` is optional and is called once the target element raises an event. You can access the original event if provided.

### A Simple Binder

How simple a binder can be is shown next with the already embedded uni-directional default binder:

~~~ts
export class DefaultBindingHandler implements IBindingHandler {
  react(binding: Binding, property: string): void {
    binding.el[property] = binding.value;
  }
}
~~~

The only difference here is that the `ModelBinder` class intercepts the access and delivers the name of the attribute as a second parameter. This is a special behavior and the default handler can handle this.

> Note that all examples have almost no error and exception handling. Add this if you want a more robust application.
