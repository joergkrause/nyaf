[![Version](https://img.shields.io/npm/v/%40nyaf%2Fforms.svg?style=flat-square)](https://npmjs.com/package/@nyaf/forms)
[![License](https://img.shields.io/npm/l/%40nyaf%2Fforms.svg?style=flat-square)](https://npmjs.com/package/@nyaf/forms)

# Introducing @nyaf

The name @nyaf is an acronym for "Not Yet Another Framework". It is, in fact, an entirely new concept of Web development support libraries, a so called "thin library".

It's simple, has a flat learning curve, doesn't need any special tools. Keep your tool chain, get the power. It can replace all the complex stuff such as React or Angular entirely, indeed.

## Preface

This is an extension to the famous micro framework **@nyaf**. You need to build your project on top of **@nyaf**, then *@nyaf/forms* makes your life easier, again.

# @nyaf Forms Module

Forms provides these basic features:

* UI control decorators (example: `@Hidden()` to suppress a property in a dynamic table).
* Validation decorators (example: `@MaxLength(50)` or `@Required()` to manage form validation).
* Data Binding using a model declaration decorator called `@ViewModel` and a bind property named `n-bind`.

Form validation is a key part of any project. However, CSS frameworks require different strategies to handle errors and so on. Hence, the @nyaf/forms library provides a simple way (just like a skeleton) to give you the direction, but the actual validation implementation logic is up to you to build.

Same for the UI decorators. It's a convenient way to add hidden properties to viewmodels. There is no logic to read these values, this is up to you to implement this. However, the decorators makes your life a lot easier.

The binding logic is almost complete and once you have a decorated model it's syncing the UI automagically.

## How it works

First, you need view models. Then, you decorate the properties with validation and hint decorators.

A view model could look like this:

~~~
export class UserViewModel {

  @Hidden()
  id: Number = 0;

  @Display('E-Mail', 'E-Mail address')
  @Required()
  @MaxLength(100)
  @Email()
  email: string = '';

  @Display('Phone Number', 'The user\'s phone')
  @Required('Please, the phone number is required')
  @MaxLength(20)
  phoneNumber: string = '';

  @Display('User Name', 'The full name')
  @Required()
  @MaxLength(100)
  userName: string = '';

}
~~~

The last (optional) parameter of the validation decorators is a custom error message.

### Validation Decorators

| Decorator | Usage |
|-----------|-------|
|**@MaxLength**| The maximum length of a text input. |
|**@MinLength**| The minimum length of a text input. |
|**@Pattern**| A regular expression that is used to test the text or number input.|
|**@Range**| A range (from-to) for either numerical values or dates. |
|**@Required**| Makes the field mandatory. |
|**@EMail**| Checks input against a (very good) regular expression to test for valid e-mail pattern.|
|**@Compare**| Compares with another field, usually for password comparison.|

### UI Decorators (property level)

| Decorator | Usage |
|-----------|-------|
|**@Display**| Determine the label's name and a tooltip ( optionally). |
|**@DisplayGroup**| Groups components in `<fieldset>` elements. Can be ordered inside the form. |
|**@Hidden**| Makes an hidden field. |
|**@Sortable**| Makes a column sortable in table views. |
|**@Filterable**| Adds a filter in table views. |
|**@Placeholder**| A watermark that appears in empty form fields|
|**@ReadOnly**| Forces a particular render type. Usually you get fields a shown in the table below. With a hint you can force other types.|
|**@TemplateHint**| What kind of field (text, number, date, ...) and additional styles or classes. |
|**@Translate**| For i18n of components |

## Template language

**@nyaf** has a simple template language. For forms it's just one for any input element:

~~~
model: ModelBinder<UserViewModel>; // instance created by decorator

async render() {
  return await (
    <>
      <form>
        <input n-bind="value: Name" />
      </form>
    </>);
}
~~~

Now the field knows everything about how to render and how to validate. The first item ("value")  is the HTML element's property you bind to. The second is the model's property name ("Name").

Once you retrieve the DOM object, you get access to validation:

~~~
const username = this.querySelector('[name="userName"]');
if (username.valid){
  // call server
}
if (username.touched){
  // show help
}
~~~

For a good UI you need a label usually:

~~~
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

#### Access the data

From code it's also possible:

~~~ts
const value = this.model.scope.property;
this.model.scope.property = 'another value';
~~~

The proxy object is available through *scope*. Binding is dependent on binding handler (bi- or uni-directional).

### Validation

The error message is just regular output (class example from Bootstrap,not needed by **nyaf** forms):

~~~html
<form>
  <label n-bind="innerText: userName" for="un"/>
  <input n-bind="value: userName" id="un">
  <div class="text text-danger" n-if={!@userName.valid && @userName.touched}>Oops, something got wrong</div>
</form>
~~~

Again, note the *@* signs preceding the property names.

Validators can provide the error text, too:

~~~tsx
<form>
  <label n-bind="innerText: userName" for="un"/>
  <input n-bind="value: userName" id="un">
  <div class="text text-danger"
       n-if={this.model.getScope().userName.valid && this.model.getScope().userName.touched"
       innerHTML={this.model.getScope().userName.errors} ></div>s
</form>
~~~

Distinguish between different validators like this:

~~~tsx
<form>
  <label n-bind="innerText: userName" for="un"/>
  <input n-bind="value: userName" id="un">
  <div class="text text-danger"
       n-if={this.model.getScope().userName.valid && this.model.getScope().userName.touched"
       innerHTML={this.model.getScope().userName.errors.required.error} ></div>s
</form>
~~~

Objects are always set (not undefined), so you don't must test first. The property names are same as the decorators, but in lower case:

* `@MaxLength`: `maximum`
* `@MinLength`: `minimum`
* `@Pattern`: `pattern`
* `@Range`: `range`
* `@Required`: `required`
* `@EMail`: `email`
* `@Compare`: `compare`

### View Models in Components

For a nice view decorators applied to class properties control the appearance. Use `FormsComponent` as new base class (instead of `BaseComponent`). Use the decorator `@ViewModel<T>(T)` to define the model. The generic is the type, the constructor parameter defines the default values (it's **mandatory**).

~~~ts
export class Model {
  @Hidden()
  id: number = 0;

  @Required()
  name: string = '';
}

@CustomElement('app-main')
@Properties<{ data: Model }>()
@ViewModel<Model>(Model)
export class MainComponent extends FormsComponent {
  // ... omitted for brevity
}
~~~

Within the component, this is now present.

~~~ts
this.modelState = {
  isValid: boolean,
  isPresent: boolean,
  errors: { [key: string]: string },
  model: Model
}
~~~

It's supervised. After render *this.modelState* helds the state of the model.


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

# Recap

Is it worth coding with **nyaf** forms and vanilla JS? For smaller projects and for apps that must load quickly, yes.

The zipped package of the lib is 2 KBytes. Expanded just 8 KBytes. **nyaf** itself is required (adding 23 KBytes, 7 KBytes zipped).

However, compared with React or Angular it's a lot simpler. Compared to Vue it's simpler and even smaller, but the delta is not that thrilling.

## Restrictions

The package runs, if there are no polyfills, only with ES2015. This limits the usage to any modern browser. It's pretty bold in Electron projects.

# Installation

Install the package:

~~~
npm i @nyaf/forms -S
~~~

## Dependencies

Depends on *@nyaf/lib*.
