
## Template Language Enhancements

**@nyaf** has a simple template language. For forms it's just one more command for any input element, `n-bind`:

~~~tsx
model: ModelBinder<UserViewModel>; // instance created by decorator

async render() {
  const model: UserViewModel = new UserViewModel(); // or where ever the model comes from
  return await (
    <>
      <form>
/*!*/        <input n-bind="value: Name" />
      </form>
    </>);
}
~~~

Now the field knows everything about how to render and how to validate. The first item ("value")  is the HTML element's property you bind to. The second is the model's property name ("Name").

Once you retrieve the DOM object, you get access to validation:

~~~ts
const username = this.querySelector('[name="userName"]');
if (username.valid){
  // call server
}
if (username.touched){
  // show help
}
~~~

For a good UI you need a label usually:

~~~html
<label n-bind="innerText: userName" />
~~~

### Forms

The model is provided by a decorator

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

Forms bind data. It's bi-directional or uni-directional depending on the chosen handler.

### Validation

The error message is just regular output (class example from Bootstrap, not needed by **@nyaf** forms):

~~~tsx
<form>
  <label n-bind="innerText: userName" for="un"/>
  <input n-bind="value: userName" id="un">
  <div class="text text-danger"
       n-show={this.model.state.userName.valid && this.model.state.userName.touched}
       innerHTML={this.model.state.userName.errors} ></div>
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
       n-show={this.model.state.userName.valid && this.model.state.userName.touched}
       innerHTML={this.model.state.userName.errors.required.error} ></div>
</form>
~~~

> Using `n-show` is mandatory, it's able to react to state changes. `n-if` is static and will not change visibility after first render process.

Objects are always set (not undefined), so you don't must test first. The property names are same as the decorators, but in lower case:

* `@StringLength`: `stringlength`
* `@MaxLength`: `maximum`
* `@MinLength`: `minimum`
* `@Pattern`: `pattern`
* `@Range`: `range`
* `@Required`: `required`
* `@EMail`: `email`
* `@Compare`: `compare`

## Smart Binders

There is an alternative syntax that provides full type support:

~~~tsx
<label n-bind={to<ContactModel>(c => c.email, 'innerText', Display)}></label>
~~~

Use the function `to<Type>` from *@nyaf/forms*. The parameters are as follows:

1. An expression to select a property type safe
2. The property of the element. Any property available in `HTMLElement` is allowed (and it's restricted to these).
3. The (optional) type of decorator that's used to pull data from. If it's omitted, the actual data appear.

Obviously you could think about writing this:

~~~tsx
<input n-bind={to<ContactModel>(c => c.email, 'value')} />
~~~

This is rejected by the compiler, because the property *value* doesn't exists in `HTMLElement`. To provide another type, just use a second generic type parameter:

~~~tsx
<input n-bind={to<ContactModel, HTMLInputElement>(c => c.email, 'value')} />
~~~

Here you tell the compiler, that it's safe to use `HTMLInputElement` and so the editor allows *value* as the second parameter. An even smarter way is to use the lambda here, too:

~~~tsx
<input n-bind={to<ContactModel, HTMLInputElement>(c => c.email, c => c.value)} />
~~~

But, both ways are type safe, even the string is following a constrain. The string is usually shorter, the lambda might use an earlier suggestion from Intellisense.

### Multi Attribute Binding

the `n-bind` attribute is exclusive, so you can bind only one attribute. That's fine for most cases, but sometimes you'll need multiple bindings. In Angular
this is easy through the binding syntax around any element (`<input [type]="source" [value]="model">`). However, this would require a template compiler and
additional editor support. To overcome a limitation here, a `bind` function available:

In this example to properties are bound:

~~~tsx
<input value={bind<T>(c => c.email)} type={bind<T>(c => c.toggleType)} n-bind />
~~~

The binding handler is not provided, so it falls back to a `DefaultBindingHandler`, that binds uni-directional to the assigned attribute. That has two
limitations. First, it's always uni-directional. Second, it can bind only to attributes of `HTMLElement`. Object properties, such as `textContent`or `innerText`
cannot be reached that way. That's indeed the same with Angular, where you need to encapsulate elements in custom components to reach hidden properties,
but in **@nyaf** there is a much smarter way.

Imagine you'll bind to whatever, just assign another binding handler.

~~~tsx
<input value={bind<T>(c => c.email, ValueBindingHandler)} n-bind />
~~~

The binding handler may write into whatever property you like, even those not available as attributes. See (Custom Binders)[custombinders.md] for more details.

### Even More Smartness

You may also define your component as a generic:

~~~ts
// ContactModel defined elsewhere
export class ContactComponent<T extends ContactModel> extends BaseComponent implements IModel<ContactModel> {
~~~

And in that case use a shorter from to express the binding:

~~~tsx
<label n-bind={to<T>(c => c.email, c => c.innerText)} />
~~~

That's cool, isn't it? Now we have a fully type save binding definition in the middle of the TSX part without any additions to regular HTML.

> :ToCPrevNext

