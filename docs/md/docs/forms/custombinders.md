## Custom Binders

A custom binder handles the binding procedure when binding a viewmodel property to an element attribute. It consists of three parts:

1. The binding setup (`bind`)
2. The binder into the element (a property change leads to an attribute change)
3. The listener (a attribute change event leads to a updated model property)

Step 2 and 3 are both optional, leading to a uni-directional binding in one or another direction.

~~~ts
export class VisibilityBinder<T extends ConfirmSuccessErrorComponent> implements IBindingHandler
{
  bind(binding: Binding): void {
    (binding.el as T).addEventListener('done', () => {
      this.listener(binding);
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

How simple a binder can be is shown next with the already embedded uni-directional default binder:

~~~ts
export class DefaultBindingHandler implements IBindingHandler {
  bind(binding: Binding): void {
  }
  react(binding: Binding, property: string): void {
    binding.el[property] = binding.value;
  }
}
~~~

The only difference here is that the `ModelBinder` class intercepts the access and delivers the name of the attribute as a second parameter. This is
a special behavior and the default handler can handle this.


