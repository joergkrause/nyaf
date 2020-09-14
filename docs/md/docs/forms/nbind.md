
## Data Binding

Data Binding is one of the most important features in component development. It brings an immediate effect in simplifying the data presentation layer. Instead of the chain "select" --> "set" --> "listen" --> "change" you simply bind an object's properties to an element's attributes. That could go in both directions.

### Template Language Enhancements

**@nyaf** has a simple template language extension for binding. For forms it's just one more command for any input element, `n-bind`. See the following excerpt from a component.

~~~tsx
model: ModelBinder<UserViewModel>; // instance created by decorator

async render() {
  const model: UserViewModel = new UserViewModel(); // or where ever the model comes from
  return await (
    <>
      <form>
        <input n-bind="value: Name" />
      </form>
    </>);
}
~~~

Now the field knows everything about how to render and how to validate. The first item ("value")  is the HTML element's property you bind to. The second is the model's property name ("Name").

For a good UI you need a label usually:

~~~html
<label n-bind="innerText: userName" />
~~~

### Terms and Parts

To understand the binding you must know what a view model is and what role the model plays inside the form.

#### View Model

The actual definition of the model that is bindable is provided through the decorator `@ViewModel(T)`. *T* is a type (class) that has properties decorated with validation and UI decorators. More about this can be found in chapter *View Models*.

#### IModel<T> interface

The `@ViewModel` decorator creates an instance of the model class. The interface enforces the visibility of the model in the component. The definition is quite easy:

~~~ts
export interface IModel<VM extends object> {
    model: ModelBinder<VM>;
}
~~~

The instance of the modelbinder gives access to all binding features.

#### Binding Handlers

Binding Handlers are small function calls that handle the data flow between viewmodel property and element attribute. There a few default binding handlers available.

#### Smart Binders

Instead of using the string form you can use the TSX syntax and binding functions:

* `to`: Generic function to bind a property to the default attribute using a custom binder optionally.
* `bind`: Generic function to bind a property to any attribute.
* `val`: Bind validation decorators to an attribute. See [validation](validation.md).

See in Section *Smart Binders* for details.

## Creating Forms

The model is provided by the `@ViewModel` decorator and the `IModel<T>` interface like this:

~~~tsx
@ViewModel(ModelType)
export class component extends BaseComponent<any> implements IModel<ModelType> {

  async render() {
    return await (
      <form>
        <label n-bind="innerText: userName" for="un"/>
        <input n-bind="value: userName" id="un" />
        <br />
        <label n-bind="innerText: city" for="city"/>
        <input n-bind="value: city" id ="city" />
     </form>
    )
  }

}
~~~

The form now binds the data. It's bi-directional or uni-directional depending on the chosen binding handler.

### Standard Binding Handlers

The forms module comes with a couple of pre-defined binding handlers:

| Name | Key | Direction | Applies to | Base Element |
|-----------------------|-----------|-----|-----------|------------|
| Default... | 'default' | uni | attribute | `HTMLElement` |
| Checked... | 'checked' | bi | attribute `checked` | `HTMLInputElement` |
| Text... | 'innerText' | uni | property `textContent` | `HTMLElement` |
| Value... | 'value' | bi | attribute `value` | `HTMLInputElement` |
| Visibility... | 'visibility' | uni | style `visibility` | `HTMLElement` |
| Display... | 'display' | uni | style `display` | `HTMLElement` |

The actual handler names are *XXXBindingHandler* (*Default...* is actually *DefaultBindingHandler*). If in the binding attribute the text form is being used ('innerText: userName'), the *key* value determines the used handler.
The handler provides the active code that handles the change call and applies the changed value to the right target property. That can be any property the element type supports, directly or indirectly anywhere in the object structure. Such a deeper call happens in the style handlers, especially `VisibilityBindingHandler` and `DisplayBindingHandler`.

## Smart Binders

There is an alternative syntax that provides full type support:

~~~tsx
<label
  n-bind={to<ContactModel>(c => c.email, 'innerText', Display)}>
</label>
~~~

The function `to<Type>` from **@nyaf/forms** module has these syntax variations:

~~~ts
to<ViewModel>(propertyExpression, handlerKey)
to<ViewModel>(propertyExpression, BindingHandlerType)
to<ViewModel, ElementType>(propertyExpression, handlerKey)
to<ViewModel, ElementType>(propertyExpression, BindingHandlerType)
to<ViewModel>(propertyExpression, handlerKey, UIDecoratorType)
to<ViewModel>(propertyExpression, BindingHandlerType, UIDecoratorType)
to<ViewModel, ElementType>(propertyExpression, handlerKey, UIDecoratorType)
to<ViewModel, ElementType>(propertyExpression, BindingHandlerType, UIDecoratorType)
~~~

The generic parameters are as follows:

1. The view model type.  This is mandatory.
2. The element type. This is optional, if omitted it falls back to `HTMLElement`.

The parameters are as follows:

1. A lambda expression to select a property type safe (`c => c.name`). This is mandatory.
2. The key of a binding handler. Any property available in `HTMLElement` is allowed (and it's restricted to these).
3. The (optional) type of decorator that's used to pull data from. If it's omitted, the actual data appear.

Obviously you could think about writing this:

~~~tsx
<input
  n-bind={to<ContactModel>(c => c.email, 'value')} />
~~~

This is rejected by the compiler, because the property *value* doesn't exists in `HTMLElement`. To provide another type, just use a second generic type parameter:

~~~tsx
<input
  n-bind={to<ContactModel, HTMLInputElement>(c => c.email, 'value')} />
~~~

Here you tell the compiler, that it's safe to use `HTMLInputElement` and so the editor allows *value* as the second parameter. An even smarter way is to use the lambda here, too:

~~~tsx
<input
  n-bind={to<ContactModel, HTMLInputElement>(c => c.email, c => c.value)} />
~~~

But, both ways are type safe, even the string is following a constrain. The string is usually shorter, the lambda might use an earlier suggestion from Intellisense.

> The binding behavior is tricky but powerful. The intention is to provide rock solid type safety. You must provide an element attribute that really exists to make a successful binding. Everything else wouldn't make any sense. But to actually bind properly, you must provide a Binding Handler that can handle this particular binding.

### Multi Attribute Binding

The `n-bind` attribute is exclusive, so you can bind only one attribute. That's fine for most cases, but sometimes you'll need multiple bindings. In Angular this is easy through the binding syntax around any element (`<input [type]="source" [value]="model">`). However, this would require a template compiler and additional editor support. To overcome the limitations here, the `bind` function is available.

In the next example two properties are bound:

~~~tsx
<input
  value={bind<T>(c => c.email)}
  type={bind<T>(c => c.toggleType)}
  n-bind />
~~~

> The `n-bind` is still required to efficiently trigger the binder logic. It's now empty, though (default value is `true` internally). Please note that you cannot bind to deeper structures in the current version (e.g. `style.border={bind<T>()}` is not possible.) That's typically a way to bind styles in Angular, but this would violate the rule that standard **@nyaf** templates shall be standard TSX files that any editor can handle without additional tool support. To support a scenario with style binding, refer to section *Custom Binders*.

If the binding handler is not provided, it falls back to a `DefaultBindingHandler`, that binds uni-directional to the assigned attribute. That has two limitations. First, it's always uni-directional. Second, it can bind only to attributes of `HTMLElement`. Object properties, such as `textContent`or `innerText` cannot be reached that way. That's indeed the same with Angular, where you need to encapsulate elements in custom components to reach hidden properties, but in **@nyaf** there is a much smarter way.

Imagine you'll bind to whatever, just assign another binding handler.

~~~tsx
<input value={bind<T>(c => c.email, ValueBindingHandler)} n-bind />
~~~

The binding handler may write into whatever property you like, even those not available as attributes. See section *Custom Binders* for more details.

### Even More Smartness

You may also define your component as a generic. That avoids repeating the model name over and over again. Imagine this:

~~~ts
// ContactModel defined elsewhere
export class ContactComponent<T extends ContactModel>
       extends BaseComponent<any>
       implements IModel<ContactModel> {
~~~

And in that case use a shorter form to express the binding:

~~~tsx
<label n-bind={to<T>(c => c.email, c => c.innerText)} />
~~~

> *T* is a placeholder here. Use any name you like to define a "type".

That's cool, isn't it? Now we have a fully type safe binding definition in the middle of the TSX part without any additions to regular HTML.

And in case you have special properties beyond `HTMLElement`, than just provide the proper type like you did before:

~~~tsx
<input n-bind={to<T, HTMLInputElement>(c => c.email, c => c.value)} />
~~~

This gives full type support in any editor for all types, even custom Web Components will work here.

> This technique avoids parsing the template, and the missing parser makes the package so small. The function simply returns a magic string that the model binder class recognizes at runtime. The function call with a generic helps the editor to understand the types and avoids mistakes.
