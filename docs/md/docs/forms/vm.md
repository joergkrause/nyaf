## View Models

First, you need view models. Then, you decorate the properties with validation and hint decorators.

### Why Using View Models?

View Models form an abstraction layer between code and pure user interface. They appear in many architectural pattern, such as Model-View-Control (MVC), Movel-View-ViewModel (MVVM), and similar constructs. A component library such as **@nyaf** is a different kind of pattern, but the basic need for a model is still valid.

> The ViewModel is essential when you want a separation of concerns between your DomainModel (DataModel) and the rest of your code.

Decoupling and separation of concerns is one of the most crucial parts of modern software architectures. Models can contain code, have actions, and work as a distinct translator between the domain model and the view. It's not the same as the business logic, it's a layer between such a layer and the user interface (UI). A UI contains logic to control visible elements, such as tooltips, hints, and validation information. All this has no or only a weak relation to an underlying business logic. Mixing the both will create code that is hard to maintain, complex, and difficult to read. In software technology we often talk about so called software entropy. That's the process of code going to change over time into an even harder to manage form, with a lot of hacks, bells, and whistles nobody understands completely and that wil eventually start to fail. Levels of abstraction help to delay this process (it's an illusion that you can avoid it entirely). Viewmodels are hence an essential part of a good architecture.

The flux architecture, delivered by the **@nyaf/store** module, seems to address a similar approach using store models and binding. However, this part is entirely devoted to the business logic. It's exactly that kind of abstraction we need to make great software not only by great design and an amazing stack of features, but by sheer quality, stability, with maintainable code, hard to break, and almost free of nasty bugs.

### Creating a View Model

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

Validation decorators can be used together with the binding. After a binding action took place, usually after a change by the user, the state of the bound model updates and can be retrieved immediately. Elements bound to validation signals can use the state to show/hide elements or control sending data in code. The property names are the same as the respective decorators, just all lower case.

| Decorator | Usage |
|-----------|-------|
|**@MaxLength**| The maximum length of a text input. |
|**@MinLength**| The minimum length of a text input. |
|**@Pattern**| A regular expression that is used to test the text or number input.|
|**@Range**| A range (from-to) for either numerical values or dates. |
|**@Required**| Makes the field mandatory. |
|**@EMail**| Checks input against a (very good) regular expression to test for valid e-mail pattern.|
|**@Compare**| Compares with another field, usually for password comparison.|
|**@Custom**| Provide a static validation function as a callback for any custom validation.|

### UI Decorators (property level)

UI decorators control the appearance of elements. Not all have an immediate effect, but it's very helpful while creating components to have meta data available.

| Decorator | Usage |
|-----------|-------|
|**@Display**| Determine the label's name and an (optional) tooltip. |
|**@DisplayGroup**| Groups components in `<fieldset>` elements. Can be ordered inside the form. |
|**@Hidden**| Makes an hidden field. |
|**@Sortable**| Makes a column sortable in table views. |
|**@Filterable**| Adds a filter in table views. |
|**@Placeholder**| A watermark that appears in empty form fields|
|**@ReadOnly**| Forces a particular render type.|
|**@TemplateHint**| What kind of field (text, number, date, ...) and additional styles or classes. |

The UI decorators do not enforce any specific behavior. In fact, they do almost nothing in an application without explicit support. The decorators create hidden properties you can retrieve when building the UI. That way you can control the behavior of the app by setting the decorators. It's some sort of abstraction between the view model and the UI.

#### Mapping the Properties

The actual properties are of the form *__propName__fieldName*, that means, you have to add the decorated property name at the end to retrieve the property specific value. As an example, the *__displayText__* property, created by the decorator `@Display`, and placed on a property *email*, can be retrieved by this code:

~~~ts
const text = this.model['__displayText__email'];
~~~

However, the internal names may change and to avoid any issues a mapping with external names is available. The following table shows the properties the decorators create.

| Decorator function | Properties |
|-----------|-------|
|**Display**| `text`, `order`, `desc` |
|**DisplayGroup**| `grouped`, `name`, `order`, `desc` |
|**Hidden**| `is`  |
|**Sortable**| `is` |
|**Filterable**| `is` |
|**Placeholder**| `has`, `text` |
|**ReadOnly**| `is` |
|**TemplateHint**| `has`, `params`, `name`  |

####  Special Decorators

There is one more decorator that's not just defining the UI behavior but has some internal behavior.

| Decorator | Usage |
|-----------|-------|
|**@Translate**| For i18n of components |

This decorator can be placed on top of the view model, on class level, or on a specific property.

~~~ts
export class ContactModel {

  constructor(init?: ContactModel) {
    if (init) {
      this.name = init.name;
      this.email = init.email;
    }
  }

  @Translate(json)
  @Display('Contact Name')
  @Required()
  name = '';
}
~~~

The function expects a JSON file with translation instructions. The translation converts the text on the properties to another language:

~~~js
const json = {
  'Contact Name': 'Kontaktname'
};
~~~

This decorator is experimental and will change in the near future to reflect a more powerful approach.

### Providing the ViewModel

To make a ViewModel accessible you use the `@ViewModel(T)` decorator. More about this in the chapter *Data Binding*.
