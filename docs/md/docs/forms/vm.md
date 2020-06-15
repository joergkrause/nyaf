## View Models

First, you need view models. Then, you decorate the properties with validation and hint decorators.

A view model could look like this:

~~~ts
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

Validation properties can be used together with the binding. After a binding action took place, usually after a change by the user, the state of the bound model updates and can be retrieved immediately. Elements bound to validation signals can use the state to show/hide elements or control sending data in code. The property names are the same as the respective decorators, just all lower case.

| Decorator | Usage |
|-----------|-------|
|**@StringLength**| Set the strings minimum (optional) and maximum length. It's a summary of `@MinLength` and `@MaxLength`. |
|**@MaxLength**| The maximum length of a text input. |
|**@MinLength**| The minimum length of a text input. |
|**@Pattern**| A regular expression that is used to test the text or number input.|
|**@Range**| A range (from-to) for either numerical values or dates. |
|**@Required**| Makes the field mandatory. |
|**@EMail**| Checks input against a (very good) regular expression to test for valid e-mail pattern.|
|**@Compare**| Compares with another field, usually for password comparison.|

### UI Decorators (property level)

UI decorators control the appearance of elements. Not all have an immediate effect, but it's very helpful while creating components to have meta data available.

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

> :ToCPrevNext
