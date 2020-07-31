## Validation

### State

The validation state is available through `state`:

~~~ts
this.model.state = {
  isValid: boolean,
  isPresent: boolean,
  errors: { [key: string]: string },
  model: Model
}
~~~

It's supervised. After render *this.model.state* helds the state of the model.

After a binding happens the validators are being executed and the instance values change. You can retrieve the values in a method, or an event handler. To set UI element interactively, immediately, you again use the `n-bind` attribute and the appropriate binding function like `to` and `bind`.

### Bind to Validators

The error message is just regular output (class example from Bootstrap, not needed by **@nyaf** forms):

~~~tsx
<form>
  <label n-bind="innerText: userName" for="un"/>
  <input n-bind="value: userName" id="un">
  <div class="text text-danger"
       n-show={bind<ViewModel>(e => e.userName, Required, 'state')}
       innerHTML={bind<ViewModel>(e => e.userName, Required, 'error'} ></div>
</form>
~~~

Validators can provide the error text, too. This is driven by decorators. The decorators fall back to a simple plain english error message in case you don't provide anything.
You can, however, provide any kind of message in the decorator. In case you need i18n messages, just add the `@Translate` decorator as a parameter decorator to the message parameter.

Distinguish between different validators like this:

~~~tsx
<form>
  <label n-bind="innerText: userName" for="un"/>
  <input n-bind="value: userName" id="un">
  <div class="text text-danger"
       n-show={bind<ViewModel>(e => e.userName, Required, 'state')}
       innerHTML={bind<ViewModel>(e => e.userName, Required, 'error'} ></div>
</form>
~~~

> Using `n-show` is mandatory, it's able to react to state changes. `n-if` is static and will not change visibility after first render process.

Objects are always set (not undefined), so you don't must test first. The property names are same as the decorators, but in lower case:

* `@MaxLength`: `maximum`
* `@MinLength`: `minimum`
* `@Pattern`: `pattern`
* `@Range`: `range`
* `@Required`: `required`
* `@EMail`: `email`
* `@Compare`: `compare`

