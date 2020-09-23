
## JSX / TSX

Fundamentally, JSX just provides syntactic sugar for the code line `JSX.createElement(component, props, ...children)` function. The transformation and conversion to JavaScript is made by the TypeScript transpiler. In case you use pure JavaScript, the best tool to compile JSX is Babel.

> Be aware, that while the main framework with native JSX support is React, **@nyaf** has absolutely no relation to React, and the behavior of the code is different.

### Introduction

The next examples assume that some code surrounds the snippets or is just the return value of the *render()* method.

See some TSX code used in a component:

~~~tsx
<my-button color="blue" shadowSize={2}>
  Click Me
</my-button>
~~~

This piece of code compiles into the following function call:

~~~js
JSX.createElement(
  'my-button',
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
~~~

### JSX Scope

Since JSX compiles into calls to `JSX.createElement`, the JSX class must also always be in scope from your TSX code.

For example, both of the imports are necessary in this code, even though React and CustomButton are not directly referenced from JavaScript:

~~~tsx
import JSX from '@nyaf/lib';

// code omitted for brevity

async render() {
  // return JSX.createElement('custom-button', {color: 'red'}, null);
  return await (<custom-button color="red" />);
}
~~~

> Note that this is a default export, so no curly braces here!

If you don’t use a JavaScript bundler and load **@nyaf** from a `<script>` tag, it is already in scope as a global object named `JSX`.

> The elements used in the JSX parts are registered globally and there is no additional import required. That's a fundamentally different behavior in comparison to React. In React the first argument is a type and the elements will render itself based on the given type. In **@nyaf** the first argument is a string, and the constructed element is pushed to the browser as string through `innerHTML`, and the browser renders the content directly using native code.

## Examples

You can also use the self-closing form of the tag if there are no children.

~~~tsx
<div class="sidebar" />
~~~

This piece of code compiles into this JavaScript:

~~~js
JSX.createElement('div', {'class': 'sidebar'})
~~~

If you want to test out how some specific JSX is converted into JavaScript, you can try out the online [Babel compiler](https://babeljs.io/repl). Be aware that in case of any JSX oriented tools not explicitly configured for **@nyaf** may create the code with the namespace `React`. In fact, the online Babel transpiler creates something like this:

~~~js
React.createElement("div", {
  class: "sidebar"
});
~~~

That's pretty much the same, so it will work as learning tool, but keep the changed names in mind.

### Specifying the Element Type

The first part of a TSX tag determines the type of the element. It's the name of a registered Web Component.

### Web Components Must be in Kebab Style

When an element type starts with a lowercase letter, it refers to a built-in component like `<div>` or `<span>` and results in a string 'div' or 'span' passed to `JSX.createElement`. Types that have a dashed name like `<my-foo />` compile to `JSX.createElement('my-foo')` and correspond to a component defined globally through `GlobalProvider`.

We recommend naming components always with kebab style.

### Properties in TSX

There are several different ways to specify properties in TSX.

#### JavaScript Expressions as Properties

You can pass any JavaScript expression as a property, by surrounding it with curly braces (`{}`). For example, see this TSX:

~~~tsx
<my-component foo={1 + 2 + 3 + 4} />
~~~

For 'my-component', the value of *props.foo* will be 10 because the expression 1 + 2 + 3 + 4 gets evaluated.

`if` statements and for loops are not expressions in JavaScript, so they can’t be used in TSX directly. Instead, you can put these in the surrounding code. For example see this snippet from a component class:

~~~ts
NumberDescriber(props): string {
  let description;
  if (props.number % 2 == 0) {
    description = <strong>even</strong>;
  } else {
    description = <i>odd</i>;
  }
  return (<div>{props.number} is an {description} number</div>);
}
~~~

This method uses TSX expressions directly in the code. There is no relation with the *render* method, the expressions can appear everywhere and they will return always `string` value.

You can learn more about conditional rendering and loops in the corresponding sections.

#### String Literals

You can pass a string literal as a property. These two TSX expressions are equivalent:

~~~tsx
<my-component message="hello world" />

<my-component message={'hello world'} />
~~~

When you pass a string literal, its value is HTML-unescaped. So these two TSX expressions are equivalent:

~~~tsx
<my-component message="&lt;3" />

<my-component message={'<3'} />
~~~

This behavior is usually not relevant. It’s only mentioned here for completeness.

#### Properties Default to True

If you pass no value for a property, it defaults to true. These two TSX expressions are equivalent:

~~~html
<my-textbox autocomplete />

<my-textbox autocomplete={true} />
~~~

In general, we don’t recommend not passing a value for a property, because it can be confused with the ES2015 object shorthand `{foo}` which is short for `{foo: foo}` rather than `{foo: true}`. This behavior is just there so that it matches the behavior of HTML.

#### Spread Attributes

If you already have properties as an object, and you want to pass it in JSX, you can use ... as a “spread” operator to pass the whole object. These two methods are equivalent:

~~~tsx
getApp1(): string {
  return <app-greeting firstName="Joerg" lastName="Krause" />;
}

getApp2(): string {
  const props = {firstName: 'Joerg', lastName: 'Krause'};
  return <app-greeting {...props} />;
}
~~~

You can also pick specific properties that your component will consume while passing all other props using the spread operator.

~~~tsx
const Button = props => {
  const { kind, ...other } = props;
  const cls = kind === "primary" ? "PrimaryButton" : "SecondaryButton";
  return <button class={cls} {...other} />;
};

const getApp = () => {
  return (
    <div>
      <Button kind="primary" onClick={() => console.log("clicked!")}>
        Hello World!
      </Button>
    </div>
  );
};
~~~

In the example above, the *kind* property is safely consumed and is not passed on to the `<button>` element in the DOM. All other properties are passed via the `...other` object making this component really flexible. You can see that it passes an *onClick* and *children* properties.

Spread attributes can be useful but they also make it easy to pass unnecessary properties to components that don’t care about them or to pass invalid HTML attributes to the DOM. It's recommended using this syntax sparingly.

### Children in TSX

In TSX expressions that contain both an opening tag and a closing tag, the content between those tags is passed as a special property *this.children*. There are several different ways to pass children.

### String Literals

You can put a string between the opening and closing tags and *this.children* will just be that string. This is useful for many of the built-in HTML elements. For example:

~~~html
<my-component>Hello world!</my-component>
~~~

This is valid TSX, and *this.children* in *MyComponent* will simply be the string "Hello world!". HTML is unescaped, so you can generally write TSX just like you would write HTML in this way:

~~~html
<div>This is valid HTML &amp; TSX at the same time.</div>
~~~

TSX removes whitespace at the beginning and ending of a line. It also removes blank lines. New lines adjacent to tags are removed; new lines that occur in the middle of string literals are condensed into a single space. So these all render to the same thing:

~~~html
<div>Hello World</div>

<div>
  Hello World
</div>

<div>
  Hello
  World
</div>

<div>

  Hello World
</div>
~~~

### TSX Children

You can provide more TSX elements as the children. This is useful for displaying nested components:

~~~html
<my-container>
  <my-first-component />
  <my-second-component />
</my-container>
~~~

You can mix together different types of children, so you can use string literals together with TSX children. This is another way in which TSX is like HTML, so that this is both valid JSX and valid HTML:

~~~html
<div>
  Here is a list:
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</div>
~~~

The render method of an **@nyaf** component can also be async:

~~~tsx
async render() {
  // use further async calls here
  await return <div>Some data</div>;
}
~~~

You can retrieve data asynchronously directly in the render method. I trivial examples this could dramatically simplify the component construction.

#### Expressions as Children

You can pass any JavaScript expression as children, by enclosing it within `{}`. For example, these expressions are equivalent:

~~~tsx
<my-component>foo</my-component>

<my-component>{'foo'}</my-component>
~~~

This is often useful for rendering a list of JSX expressions of arbitrary length. For example, this renders an HTML list:

~~~tsx
Item(data: { message: string }): string {
  return <li>{data.message}</li>;
}

todoList(): string {
  const todos = ['create tests', 'fix bugs', 'attend scrum'];
  return (
    <ul>
      {todos.map((msg) => <my-item message={message} />)}
    </ul>
  );
}
~~~

JavaScript expressions can be mixed with other types of children. This is often useful in lieu of string templates:

~~~tsx
hello(data: { addressee: string }): string {
  return <div>Hello {data.addressee}!</div>;
}
~~~

### Booleans, Null, and Undefined

The values `false`, `null`, `undefined`, and `true` are valid children. They simply don’t render. These TSX expressions will all render to the same thing:

~~~tsx
<div />

<div></div>

<div>{false}</div>

<div>{null}</div>

<div>{undefined}</div>

<div>{true}</div>
~~~

This can be useful to conditionally render elements. This TSX renders the <app-header /> component only if *showHeader* is `true`:

~~~tsx
<div>
  {showHeader && <app-header />}
  <app-content />
</div>
~~~

One caveat is that some “falsy” values, such as the 0 number, are still rendered by React. For example, this code will not behave as you might expect because 0 will be printed when *data.messages* is an empty array:

~~~tsx
<div>
  {this.data.messages.length &&
    <message-list messages={this.data.messages} />
  }
</div>
~~~

To fix this, make sure that the expression before `&&` is always `boolean`:

~~~tsx
<div>
  {this.data.messages.length > 0 &&
    <message-list messages={this.data.messages} />
  }
</div>
~~~

Conversely, if you want a value like `false`, `true`, `null`, or `undefined` to appear in the output, you have to convert it to a string first:

~~~tsx
<div>
  The JavaScript variable is {String(myVariable)}.
</div>
~~~

