
## Custom Binders

Custom Binders help binding to specific properties. They can be used like the embedded binders, that act just as examples and use the same way.

### Implementing a Custom Binder

A custom binder handles the binding procedure when binding a viewmodel property to an element attribute. It consists of three parts:

1. The binding setup (`bind`)
2. The binder into the element (a property change leads to an attribute change)
3. The listener (an attribute change event leads to an updated model property)

Step 2 and 3 are both optional, omitting them is leading to a uni-directional binding in one or another direction.

~~~ts
@BindName('VisibilityBinder')
export class VisibilityBinder<T extends ConfirmSuccessErrorComponent> 
       implements IBindingHandler
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

Note here, that despite the base class the decorator *@BindName* is required. The argument is the name of the class. In the views' code the binder class' name can be used to determine the behavior. But in case the project is packed by an aggressive packer, the names of the classes might be minified. The code compares the names and due to different minification steps it could happen that the comparison fails. The decorator writes the name into an internal property and the compare code can retrieve this properly. If the view code uses strings instead of types, using this decorator is not necessary.

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
export class VisibilityHandler<T extends ConfirmComponent> 
       implements IBindingHandler
~~~

The generic is optional. It allows the definition of the target element. If it's omitted, it falls back to `HTMLElement`. You can use any HTML 5 element type or any custom web component type (as in the example).

The `bind` method is called implicitly by the infrastructure. If it doesn't exist it's being ignored. The only reason to use it is attaching an event listener. You may also consider calling `react` immediately to sync the data, but it depends on the actual behavior of the element and may result in an additional binding process while loading the form.

The method `react` is called from the view model proxy instance each time the value changes. Write code here to assign the data to any property of the target element.

The method `listener` is optional and is called once the target element raises an event. You can access the original event if provided.

### A Simple Binder

How simple a binder can be is shown next with the already embedded uni-directional default binder:

~~~ts
@BindName('DefaultBindingHandler')
export class DefaultBindingHandler implements IBindingHandler {
  react(binding: Binding, property: string): void {
    binding.el[property] = binding.value;
  }
}
~~~

The only difference here is that the `ModelBinder` class intercepts the access and delivers the name of the attribute as a second parameter. This is a special behavior and the default handler can handle this.

> Note that all examples have almost no error and exception handling. Add this if you want a more robust application.
