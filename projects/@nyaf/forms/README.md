# NYAF is "Not Yet Another Framework" 

And it is, well, just another framework. It's simple, has a flat learning curve, doesn't need any special tools.

## Preface

This is an extension to the famous micro framework NYAF. You need to build your project on top of NYAF, then *@nyaf/forms* makes your life easier, again.

# NYAF-FORMS

Form validation is a key part of any project. Have a simple to use, HTML 5 based validation without the burden of a huge framework is the key purpose.

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
|**@StringLength**| Set the strings minimum (optional) and maximum length. It's a summary of `@MinLength` and `@MaxLength`. |
|**@MaxLength**| The maximum length of a text input. |
|**@MinLength**| The minimum length of a text input. |
|**@Pattern**| A regular expression that is used to test the text or number input.|
|**@Range**| A range (from-to) for either numerical values or dates. |
|**@Required**| Makes the field mandatory. |
|**@EMail**| Checks input against a (very good) regular expression to test for valid e-mail pattern.|
|**@Compare**| Compares with another field, usually for password comparision.|

### UI Decorators (property level)

| Decorator | Usage |
|-----------|-------|
|**@Display**| Determine the label's name and a tooltip ( optionally). |
|**@DisplayGroup**| Groups components in `<fieldset>` elements. Can be ordered inside the form. |
|**@Hidden**| Makes an hidden field. |
|**@Placeholder**| A watermark that appears in empty form fields|
|**@ReadOnly**| Forces a particular render type. Usually you get fields a shown in the table below. With a hint you can force other types.|
|**@TemplateHint**| What kind of field (text, number, date, ...) and additional styles or classes. |

## Template language

NYAF has a simple template language. For forms it's just one for any input element:

~~~
render() {
  const model: UserViewModel = new UserViewModel(); // or where ever the model comes from
  return (<input n-for={model} name="@userName">);
}
~~~

Now the field knows everything about how to render and how to validate. The *@* sign signales that it's bound to a model's property. Note, that you don't need to write the `type` property, it's being added using the decorators and TypeScript types.

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
<label n-model="UserViewModel" name="@userName" />
~~~

### Forms

Writing `n-model` again and again is boring. Use the `form` tag better (creation of model omitted for brevity):

~~~
<form n-model={model}>
  <label n-for="@userName" for="un"/>
  <input n-for="@userName" id="un">
</form>
~~~

Forms bind data. It's always bi-directional.

### Validation

The error message is just regular output (class example from Bootstrap,not needed by NYAF forms):

~~~
<form n-model={model}>
  <label n-for="@userName" for="un"/>
  <input n-for="@userName" id="un">
  <div class="text text-danger" n-if="!@userName.valid && @userName.touched">Oops, something got wrong</div>
</form>
~~~

Again, note the *@* signs preceding the property names. 

Validators can provide the error text, too:

~~~
<form n-model={model}>
  <label n-for="@userName" for="un"/>
  <input n-for="@userName" id="un">
  <div class="text text-danger" n-if="!@userName.valid && @userName.touched" innerHTML="@userName.errors" ></div>
</form>
~~~

Distinguish between different validators like this:

~~~
<form n-model={model}>
  <label n-for="@userName" for="un"/>
  <input n-for="@userName" id="un">
  <div class="text text-danger" n-if="!@userName.required.valid && @userName.touched" innerHTML="@userName.required.message" ></div>
</form>
~~~

Objects are always set (not undefined), so you don't must test first. The property names are same as the decorators, but in lower case:

* `@StringLength`: `stringlength`
* `@MaxLength`: `maximum`
* `@MinLength`: `minimum`
* `@Pattern`: `pattern`
* `@Range`: `range`
* `@Required`: `required`
* `@EMail`: `email`
* `@Compare`: `compare`

### View Models in Components

For a nice view decorators applied to class properties control the appearance.

~~~
export class Model {
  @Hidden()
  id: number = 0;

  @Required()
  name: string = '';
}


@CustomElement('app-main')
@Properties<{ data: Model }>()
@ViewModel(Model)
export class MainComponent extends BaseComponent {
  // ... omitted for brevity
}
~~~

Within the component, this is now present. 

~~~
this.modelState = {
  isValid: boolean,
  isPresent: boolean,
  errors: { [key: string]: string },
  model: Model
}
~~~

It's supervised. After render *this.modelState* helds the state of the model.

# Recap

Is it worth coding with NYAF forms and vanilla JS? For smaller projects and for apps that must load quickly, yes.

The zipped package of the lib is 2 KBytes. Expanded just 8 KBytes. NYAF itself is required (adding 23 KBytes, 7 KBytes zipped).

However, compared with React or Angular it's a lot simpler. Compared to Vue it's simpler and even smaller, but the delta is not that thrilling.

## Restrictions

The package runs, if there are no polyfills, only with ES2015. This limits the usage to any modern browser. It's pretty bold in Electron projects.

# Installation

Install the package:

~~~
npm i @nyaf/forms -S
~~~