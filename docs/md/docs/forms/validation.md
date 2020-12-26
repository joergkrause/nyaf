
## Validation

Form validation is painful to programm from scratch. **@nyaf/forms** provides a n integrated but flexible validation system.

### View Model Decorators

First, you need a viewmodel that has validation decorators. It's the same kind of model used for regular binding. Again, here is an example:

```ts
export class UserViewModel {
  @Hidden()
  id: Number = 0;

  @Display('E-Mail', 'E-Mail address')
  @Required()
  @MaxLength(100)
  @Email()
  email: string = '';

  @Display('Phone Number', "The user's phone")
  @Required('Please, the phone number is required')
  @MaxLength(20)
  phoneNumber: string = '';

  @Display('User Name', 'The full name')
  @Required()
  @MaxLength(100)
  userName: string = '';
}
```

Especially the validation decorators are in control of the validation (`Required`, `MaxLength`, and so on). In binding instruction you tell the environment with what decorator a property has to be connected.

### State

The validation state is available through `state`:

```ts
this.model.state = {
  isValid: boolean,
  isPresent: boolean,
  errors: { [key: string]: string },
  model: Model
}
```

It's supervised. After the component is rendered the property _this.model.state_ helds the state of the model.

After a binding happens the validators are being executed and the instance values change. You can retrieve the values in a method, or an event handler. To set UI elements interactively, immediately, you again use the `n-bind` attribute and the appropriate binding function like `to` and `bind`.

### Bind to Validators

An error message is just regular output (the class values are taken from Bootstrap and they're not needed by the **@nyaf/forms** module):

```tsx
<form>
  <label n-bind="innerText: userName" for="un"/>
  <input n-bind="value: userName" id="un">
  <div class="text text-danger"
       n-bind={val<ViewModel>(e => e.userName,
                                   Required,
                                   DisplayBindingHandler)}>
  </div>
</form>
```

Validators can provide the error text, too. This is driven by decorators. The decorators fall back to a simple plain english error message in case you don't provide anything. You can, however, provide any kind of message in the decorator. In case you need i18n messages, just add the `@Translate` decorator as a parameter decorator to the message parameter.

Distinguish between different validators like this:

```tsx
<form>
  <label n-bind="innerText: userName" for="un"/>
  <input n-bind="value: userName" id="un">
  <span class="text text-danger"
       n-bind={val<ViewModel>(e => e.userName,
                                   MaxLength,
                                   DisplayBindingHandler)}>
  </span>
</form>
```

The smart binder `val` is the key ingredient here. It takes three parameters:

1. An expression to access the models actual value.
2. A validator for which the binding is responsible (must also be aon the view models property).
3. A display handler, that pulls the values and assigns it to the right property.

In the above example the view model has this property:

```ts
@Required()
@MaxLength(100)
userName: string = '';
```

Now, the binding instruction looks like this:

```ts
val<ViewModel>(e => e.userName, MaxLength, DisplayBindingHandler)
```

The `DisplayBindingHandler` is smart enough to know that it's bound to an error message. It now reads the second parameter that is `MaxLength`. It binds now these two parts.

First, it binds the error message to `textContent`. That's a static assignment. Second, it binds the `display` style to the `isValid` method of the view model. This method is set through the `MaxLength` decorator and knows how to determine the state 'maxlength'. The property is bound through the scope's Proxy dynamically and once the values changes, irrespectively the source of the change, it fires an event and the model binder holds a subscriber for this. Here, the value is taken and handed over to the `isValid` method. This method is bound to the handler, that sets the style accordingly. That setting is reversed, means that the value `true` makes the message invisible, while the value `false` makes the message visible (`isValid === false` tells you an error occurred).

> If you use the `DisplayBindingHandler` or `VisibilityBindingHandler` directly, without validation but in conjunction with binding operations, than they will work straight, true makes an element visible, and false invisible.

### Handler Behavior

The `DisplayBindingHandler` sets `display: none` or `display: block`. The `VisibilityBindingHandler` sets `visibility: hidden` or `visibility: visible`. These are the most basic handlers and available out-of-the-box.

If you need other values you must write a new handler with the desired behavior. This is, fortunately, extremely simple. Here is the source code for the handlers:

```ts
export class DisplayBindingHandler implements IBindingHandler {
  react(binding: Binding): void {
    binding.el.style.display = binding.value ? 'block' : 'none';
  }
}

export class VisibilityBindingHandler implements IBindingHandler {
  react(binding: Binding): void {
    binding.el.style.visibility = binding.value ? 'visible' : 'hidden';
  }
}
```

The `Binding` instance, provided internally, delivers a boolean value. The element _el_ is the element that has the `n-bind={val<T>()}` instruction. _T_ is the model that drives the content using decorators.

## Additional Information

To handle dynamic error messages, especially those provided by decorators, you can use the binding with `to` against the decorator information. The following code shows the way to retrieve the values:

```html
<span class='text text-danger'
      n-bind={val<ContactModel>((c: ContactModel) => c.email, Required, DisplayBindingHandler)} >
   <span n-bind={to<T>((c: ContactModel) => c.email, TextBindingHandler, Required.err )}></span>
</span>
```

The first `span` with `n-bind` attribute is the regular validation. It retrieves the `Required` decorator and creates a binding to the `DisplayBindingHandler`. The handler makes the element visible or invisible. The inner `span` has another binding using the regular `to` smart binder. Here the decorator key is the crucial part. It goes to `Required.err` that is the error message in the view model's definition. The property points to the *email* field to get the proper relation.

Sometimes it's necessary to have no element but just text binding. This is not possible as **ny@f** has a simple string parser to handle JSX. The value would evaluated at setup time, once the component is created, and remains as a static fragment. That means that any further changes in validation are not reflected to the UI. The binders use two strategies: input events to get changes and attribute access to write changes. Hence, an element is required. To make the element's tree independent from HTML a special component `n-bind` is used.

```html
<span class='text text-danger'
      n-bind={val<ContactModel>((c: ContactModel) => c.email, Required, DisplayBindingHandler)} >
   <n-bind data={to<T>((c: ContactModel) => c.email, TextBindingHandler, Required.err )}></n-bind>
</span>
```

This is a pseudo-component, it's neither registered nor active. It's just a static container the JSX parser can recognize and now has a place to put the binding instruction in. The model binder logic can see this binding liek any other and adds the interactive binding routines.

Internally it's a comment node, and the binder adds a text node before the comment. So it has no influence to CSS, as expected.

68