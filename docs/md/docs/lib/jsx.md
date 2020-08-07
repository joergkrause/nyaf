## JSX / TSX

Fundamentally, JSX just provides syntactic sugar for the `JSX.createElement(component, props, ...children)` function. In **@nyaf** we use only
the TSX variant. That means, the transformation and conversion to JavaScript is made by the TypeScript transpiler.

> Be aware, that while the main framework with JSX built-in is React, **@nyaf** has absolutely no relation to React, and the behavior of the code is different.

### Introduction

The example assume that some code surrounds the snippets or is just the return value of the *render()* method.

The TSX code:

~~~tsx
<my-button color="blue" shadowSize={2}>
  Click Me
</my-button>
~~~

compiles into:

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

> It's a default export, so no curly braces here!

If you don’t use a JavaScript bundler and loaded **@nyaf** from a `<script>` tag, it is already in scope as the JSX global.

> The elements used in the TSX parts are registered globally and there is no additional import required. That's a fundamentally different behavior in comparison to React. In React the first argument is a type and the elements will render itself based on the given type. In **@nyaf** the first argument is a string, and the constructed element is pushed to the browser as string through `innerHTML`, and the browser renders the content directly using native code.

## Examples

You can also use the self-closing form of the tag if there are no children. So:

~~~tsx
<div className="sidebar" />
~~~

compiles into:

~~~js
JSX.createElement(
  'div',
  {className: 'sidebar'}
)
~~~

If you want to test out how some specific JSX is converted into JavaScript, you can try out the online Babel compiler.

### Specifying The Element Type

The first part of a TSX tag determines the type of the element. It's the name of a registered Web Component.

### User-Defined Components Must Be in Kebap Style

When an element type starts with a lowercase letter, it refers to a built-in component like `<div>` or `<span>` and results in a string 'div' or 'span' passed to JSX.createElement. Types that have a dashed name like <my-foo /> compile to JSX.createElement('my-foo') and correspond to a component defined globally through `GlobalProvider`.

We recommend naming components always with kebap style.

### Props in TSX

There are several different ways to specify props in TSX.

#### JavaScript Expressions as Props

You can pass any JavaScript expression as a prop, by surrounding it with `{}`. For example, in this TSX:

~~~tsx
<my-component foo={1 + 2 + 3 + 4} />
~~~

For 'my-component', the value of *props.foo* will be 10 because the expression 1 + 2 + 3 + 4 gets evaluated.

`if` statements and for loops are not expressions in JavaScript, so they can’t be used in TSX directly. Instead, you can put these in the surrounding code. For example:

~~~ts
function NumberDescriber(props) {
  let description;
  if (props.number % 2 == 0) {
    description = <strong>even</strong>;
  } else {
    description = <i>odd</i>;
  }
  return (<div>{props.number} is an {description} number</div>);
}
~~~

You can learn more about conditional rendering and loops in the corresponding sections.

#### String Literals

You can pass a string literal as a prop. These two JSX expressions are equivalent:

~~~tsx
<my-component message="hello world" />

<my-component message={'hello world'} />
~~~

When you pass a string literal, its value is HTML-unescaped. So these two JSX expressions are equivalent:

~~~tsx
<my-component message="&lt;3" />

<my-component message={'<3'} />
~~~

This behavior is usually not relevant. It’s only mentioned here for completeness.

#### Props Default to “True”

If you pass no value for a prop, it defaults to true. These two JSX expressions are equivalent:

~~~tsx
<my-textbox autocomplete />

<my-textbox autocomplete={true} />
~~~

In general, we don’t recommend not passing a value for a prop, because it can be confused with the ES6 object shorthand {foo} which is short for {foo: foo} rather than {foo: true}. This behavior is just there so that it matches the behavior of HTML.

#### Spread Attributes

If you already have props as an object, and you want to pass it in JSX, you can use ... as a “spread” operator to pass the whole props object. These two components are equivalent:

~~~tsx
function App1() {
  return <app-greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <app-greeting {...props} />;
}
~~~

You can also pick specific props that your component will consume while passing all other props using the spread operator.

~~~tsx
const Button = props => {
  const { kind, ...other } = props;
  const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton";
  return <button className={className} {...other} />;
};

const App = () => {
  return (
    <div>
      <Button kind="primary" onClick={() => console.log("clicked!")}>
        Hello World!
      </Button>
    </div>
  );
};
~~~

In the example above, the kind prop is safely consumed and is not passed on to the `<button>` element in the DOM. All other props are passed via the ...other object making this component really flexible. You can see that it passes an onClick and children props.

Spread attributes can be useful but they also make it easy to pass unnecessary props to components that don’t care about them or to pass invalid HTML attributes to the DOM. We recommend using this syntax sparingly.

### Children in TSX

In JSX expressions that contain both an opening tag and a closing tag, the content between those tags is passed as a special prop: props.children. There are several different ways to pass children:

### String Literals

You can put a string between the opening and closing tags and props.children will just be that string. This is useful for many of the built-in HTML elements. For example:

~~~tsx
<my-component>Hello world!</MyComponent>
~~~

This is valid JSX, and props.children in MyComponent will simply be the string "Hello world!". HTML is unescaped, so you can generally write JSX just like you would write HTML in this way:

~~~tsx
<div>This is valid HTML &amp; JSX at the same time.</div>
~~~

JSX removes whitespace at the beginning and ending of a line. It also removes blank lines. New lines adjacent to tags are removed; new lines that occur in the middle of string literals are condensed into a single space. So these all render to the same thing:

~~~tsx
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

### JSX Children

You can provide more JSX elements as the children. This is useful for displaying nested components:

~~~tsx
<MyContainer>
  <MyFirstComponent />
  <MySecondComponent />
</MyContainer>
~~~

You can mix together different types of children, so you can use string literals together with JSX children. This is another way in which JSX is like HTML, so that this is both valid JSX and valid HTML:

~~~tsx
<div>
  Here is a list:
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</div>
~~~

A React component can also return an array of elements:

~~~tsx
render() {
  // No need to wrap list items in an extra element!
  return [
    // Don't forget the keys :)
    <li key="A">First item</li>,
    <li key="B">Second item</li>,
    <li key="C">Third item</li>,
  ];
}
~~~

#### JavaScript Expressions as Children

You can pass any JavaScript expression as children, by enclosing it within {}. For example, these expressions are equivalent:

~~~tsx
<my-component>foo</MyComponent>

<my-component>{'foo'}</MyComponent>
~~~

This is often useful for rendering a list of JSX expressions of arbitrary length. For example, this renders an HTML list:

~~~tsx
function Item(props) {
  return <li>{props.message}</li>;
}

function TodoList() {
  const todos = ['finish doc', 'submit pr', 'nag dan to review'];
  return (
    <ul>
      {todos.map((message) => <Item key={message} message={message} />)}
    </ul>
  );
}
~~~

JavaScript expressions can be mixed with other types of children. This is often useful in lieu of string templates:

~~~tsx
function Hello(props) {
  return <div>Hello {props.addressee}!</div>;
}
~~~

#### Functions as Children

Normally, JavaScript expressions inserted in JSX will evaluate to a string, a React element, or a list of those things. However, props.children works just like any other prop in that it can pass any sort of data, not just the sorts that React knows how to render. For example, if you have a custom component, you could have it take a callback as props.children:

~~~tsx
// Calls the children callback numTimes to produce a repeated component
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
~~~
Children passed to a custom component can be anything, as long as that component transforms them into something React can understand before rendering. This usage is not common, but it works if you want to stretch what JSX is capable of.

Booleans, Null, and Undefined Are Ignored
false, null, undefined, and true are valid children. They simply don’t render. These JSX expressions will all render to the same thing:

~~~tsx
<div />

<div></div>

<div>{false}</div>

<div>{null}</div>

<div>{undefined}</div>

<div>{true}</div>
~~~

This can be useful to conditionally render React elements. This JSX renders the <Header /> component only if showHeader is true:

~~~tsx
<div>
  {showHeader && <Header />}
  <Content />
</div>
~~~
One caveat is that some “falsy” values, such as the 0 number, are still rendered by React. For example, this code will not behave as you might expect because 0 will be printed when props.messages is an empty array:

~~~tsx
<div>
  {props.messages.length &&
    <MessageList messages={props.messages} />
  }
</div>
~~~

To fix this, make sure that the expression before && is always boolean:

~~~tsx
<div>
  {props.messages.length > 0 &&
    <MessageList messages={props.messages} />
  }
</div>
~~~
Conversely, if you want a value like false, true, null, or undefined to appear in the output, you have to convert it to a string first:

~~~tsx
<div>
  My JavaScript variable is {String(myVariable)}.
</div>
~~~
