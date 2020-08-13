## Validation

Form validation is painful to programm from scratch. @nyaf provides a n integrated but flexible validation system.

### ViewModel Decorators

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

It's supervised. After render _this.model.state_ helds the state of the model.

After a binding happens the validators are being executed and the instance values change. You can retrieve the values in a method, or an event handler. To set UI element interactively, immediately, you again use the `n-bind` attribute and the appropriate binding function like `to` and `bind`.

### Bind to Validators

The error message is just regular output (class example from Bootstrap, not needed by **@nyaf** forms):

```tsx
<form>
  <label n-bind="innerText: userName" for="un"/>
  <input n-bind="value: userName" id="un">
  <div class="text text-danger"
       n-bind={val<ViewModel>(e => e.userName, Required, DisplayBindingHandler)}>
  </div>
</form>
```

Validators can provide the error text, too. This is driven by decorators. The decorators fall back to a simple plain english error message in case you don't provide anything.
You can, however, provide any kind of message in the decorator. In case you need i18n messages, just add the `@Translate` decorator as a parameter decorator to the message parameter.

Distinguish between different validators like this:

```tsx
<form>
  <label n-bind="innerText: userName" for="un"/>
  <input n-bind="value: userName" id="un">
  <span class="text text-danger"
       n-bind={val<ViewModel>(e => e.userName, MaxLength, DisplayBindingHandler)}>
  </span>
</form>
```

The smart binder `val` is the key ingredient here. It takes three parameters:

1. Expression to access the models actual value
2. Validator for which the binding is responsible (must also be aon the view models property)
3. Display handler, that pulls the values and assigns it to the right property

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

The `DisplayBindingHandler` is smart enough to know that it's bound to an error message. It know reads the second parameter that is `Required`. It binds now to parts.
First, it binds the error message to `textContent`. That's a static assignment. Second, it binds the `display` style to the `isValid` method of the view model. This
method is set through the `Required` decorator and knows how to determine the state 'required'. The property is bound through the scope's Proxy dynamically and once
the values changes, irrespectively the source of the change, it fires an event and the model binder holds a subscriber for this. Here, the value is taken and handed over to the `isValid` method.
This method is bound to the handler, that sets the style accordingly. That setting is reversed, means that the value `true` makes the message invisible, while the value
`false` makes the message visible (isValid ==== false tells us an error occurred).

> If you use the `DisplayBindingHandler` or `VisibilityBindingHandler` directly, without validation but in conjunction with binding operations, than they will work straight, true makes an element visible, and false invisible.

### Handler Behavior

The `DisplayBindingHandler` sets `display: none` or `display: block`.

The `VisibilityBindingHandler` sets `visibility: hidden` or `visibility: visible`.

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

The `Binding` instance, provided internally, delivers a boolean value. The element _el_ is the element that has the `n-bind={val<T>()}` instruction. _T_ is the model
that drives the content using decorators.

## Additional Information

Objects are always set (not undefined), so you don't must test first. The property names are same as the decorators, but in lower case:

- `@MaxLength`: `maxlength`
- `@MinLength`: `minlength`
- `@Pattern`: `pattern`
- `@Range`: `range`
- `@Required`: `required`
- `@EMail`: `email`
- `@Compare`: `compare`
