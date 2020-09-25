
## Smart Components

Some features do not require additional code, they just need a clever usage of the power of TypeScript and Web Components. To simplify your life, a few of these are predefined as integrated components - the Smart Components.

### Transparent Outlet n-outlet

This is another outlet that renders into nothing. Normally you would do this:

~~~html
<div n-router-outlet></div>
~~~

But that would place your component in a DIV element. If this is disturbing, just use this:

~~~html
<n-outlet></n-outlet>
~~~

Also, a named variety is available:

~~~html
<n-outlet name="main"></n-outlet>
~~~

### Render Finisher n-finish

Web Components render according their lifecycle. However, if you have a mix of components and regular HTML elements, the behavior can be weird, because the regular elements doesn't have a lifetime. The best solution is to have a pure tree of web components. But if that is not possible and a predictable execution path is necessary, you need to tell the render engine when it's really safe to render the parent element. To do so, add the element `<n-finish />` like this:

~~~ts
render() {
  return (
    <ul>
      <some-component></some-component>
      <li></li>
      <li></li>
      <li></li>
      <n-finish />
    </ul>
  )
}
~~~

In that example the component waits for the lifecycle events of *some-component* but will render everything else immediately. If *some-component* exposes `<li>` tags too, they could appear after the static ones. If the order matters, the `<n-finish>` element helps enforcing the execution order.

