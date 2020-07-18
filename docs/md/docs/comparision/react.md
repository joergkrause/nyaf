# nyaf and React

Due to the nature of using TSX/JSX for templates it seems that React is quite close. But that's not entirely true. @nyaf has a lot to offer.

## Components

React is based on JavaScript and not native in TypeScript. That seems just a small issue, as TypeScript compiles down to JavaScript anyway, but
in reality it's a big deal. Because of the non-native development style the TypeScript form is not very elegant. And the real advantage of TypeScript, such as advanced types like decorators and interfaces, are not or rarely used. Let's compare it.

### React

This is a simple component in React. The name always follows the class name, *Welcome* in this example.

~~~jsx
class Welcome extends BaseComponent<{}> {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
~~~

### @nyaf

This is a simple component on @nyaf. The name is defined separately, and so is the property definition. Apart from this, it's the same.

~~~tsx
@CustomElement('app-welcome')
@Properties({ name: '' })
class WelcomeComponent extends BaseComponent<{ name: string }> {
  async render() {
    return await <h1>Hello, {this.data.name}</h1>;
  }
}
~~~

The element style is more natural, because the browser engine processes the Web Components, not custom code.

Because of the generic the editor will recognize and resolve the `this.data` property, too. Also, the render code allows async calls to pull data
from a data source or do other non-blocking stuff.

## State

React documentation says:

> Never mutate `this.state` directly, as calling `setState()` afterwards may replace the mutation you made. Treat this.state as if it were immutable.

In @nyaf it's a similar mechanism, but simpler. There is no distinguish between props and state, you define properties and held the state in it. There
is no need to use the properties, then. That's why it's called `data` and purposefully `setData()`. However, you can set the state directly on the
object and don't need to follow restrictions. It's a Proxy under the hat that handles the changes. If something isn't allows the property would be
readonly and the editor shows this, no need to read documentation and remember it all the time.

## Events

In React a so-called synthetic event looks like this:

~~~jsx
<button onClick={activateLasers}>
  Activate Lasers
</button>
~~~

In @nyaf it's not that different:

~~~tsx
<button n-on-click={this.activateLasers}>
  Activate Lasers
</button>
~~~

The `this` quantifier is necessary. The main reason is that the code transforms directly into JavaScript and there is nothing "synthetic" here, the
template engine connects the method as a dynamic handler directly to the event.

However, you can use custom events that transport additional data. But still, it's the browsers event engine that handles these event natively.

## Conditions

See this example from the React documentation:

~~~js
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}
~~~

In @nyaf this would look a bit different.

~~~tsx
@CustomElement('user-greeting')
export class UserGreeting extends BaseComponent<void> {
  constructor() { super(); }
  async render() {
    return await <h1>Welcome back!</h1>;
  }
}

@CustomElement('guest-greeting')
export class GuestGreeting() extends BaseComponent<void> {
  constructor() { super(); }
  async render() {
    return await <h1>Please sign up.</h1>;
  }
}

@CustomElement('app-greeting')
export class Greeting() extends BaseComponent<{ isLoggedIn: boolean}> {
  constructor() { super(); }

  async render() {
    const isLoggedIn = this.data.isLoggedIn;
    return await (
      <user-greeting n-if={isLoggedIn} />
      <guest-greeting n-if={!isLoggedIn} />
    );
  }
~~~

It's a little more verbose, but it's easier to read due to additional template functions, here `n-if`.

## Lists

As far as it's just JSX the handling is the same in React and @nyaf.

The *key* feature for rendering of list items according to element changes does not exist in @nyaf. The render engine will always render the whole
list, if something changes. That's not that smart, but it reduces the template code drastically.


