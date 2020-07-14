## Template Features

Template Features avoid using creepy JavaScript for interactions and branches. You can use:

* `n-if`, `n-else`
* `n-hide`, `n-show`
* `n-on-<event>` (see further down)
* `n-expand`

### n-if, n-else

The value will be evaluated and the element does or does not render, then:

~~~tsx
<div class="main-header"
     n-if={this.props.title !== 't1'}>
  <span>Any content will not render if container doesn't render</span>
</div>
~~~

If there is an else-branch it can direct to a slot template. `<slot>` elements are native web component parts.

~~~tsx
<div class="main-header"
     n-if={this.props.title !== 't1'}
     n-else="noShow">
  <span>Any content will not render if container doesn't render</span>
</div>
<slot name="noShow">
  This is shown instead.
</slot>
~~~

### n-hide, n-show

Works same as `n-if`, but just adds an inline style `display: none` (or remove one) if `true` (`n-hide`) or `false` (`n-show`).

### n-expand

Expand a group of attributes. Imagine this:

~~~html
<input type="text" placeholder="Name" role="search" class="materialinput" id="a1 />
~~~

You need this several times, each with different id.

~~~html
<input n-expand="search" id="a1" />
<input n-expand="search" id="a2" />
<input n-expand="search" id="a3" />
~~~

To define it, just create a class like this:

~~~ts
@Expand("search")
export class SearchExpander extends Expander {
  constructor(){
    super();
  }
  'type'="text";
  'placeholder'="Name";
  'role'="search";
  'class'="materialinput";
}
~~~

Any yes, these are equal signs in the class. The named 'xxx' names are only required if the attribute name contains dashes. Finally, add the definition to the global provider:

~~~ts
Globalprovider.bootstrap({
  components: [...components], // as usual
  expanders: [SearchExpander]
})
~~~

That's it, a lot less to write without the effort to create components. It's just text-replacement before the render grabs the content, so NO performance impact at runtime.

#### Quick Expanders

This is even easier, but more for local expanding:

~~~tsx
const d = {
  'type': "text";
  'placeholder': "Name";
  'role': "search";
  'class': "materialinput";
}
<app-button  {...d} />
~~~

It's just pure ECMAScript magic, no code from **@nyaf** required.

## n-repeat

The basic idea of TSX is to write traditional code using `map` or `forEach` on array to create loops. In most cases this is the best solution. It provides editor support and you can add the full range of JavaScript API features to adjust the result. But sometimes a simple loop is required and the creation of a complete expression creates a lot boilerplate code. In that case two variations of loops are provided, both with full editor support, too.

### Syntax I - n-repeat component

This is a smart component that acts as a helper for common tasks. It's supported by one functions for binding:

* `of`: Creates an expression to select a property from a model. The only reason is to have editor support (IntelliSense) without additional tools.

~~~tsx
<ul>
  <n-repeat source={this.eventData}>
    <li data={of<TBind>(p => p.id)}>{of<TBind>(p => p.name)}</li>
  </n-repeat>
</ul>
~~~

Also, a **@nyaf** template function with the same name exists. This is supported by two other function for same reason:

* `from`: Define a data source for repeating; must be an array of objects.
* `select`: Select a property from the object type the array consists of.

~~~tsx
<ul>
  <li n-repeat={from<TBind>(this.eventData)}
      data={select<TBind>(p => p.id)} >
      The name is: {select<TBind>(p => p.name)}
  </li>
</ul>
~~~

Both examples would work with a type definition like this:

~~~ts
interface TBind {
  id: number;
  name: string;
}
~~~

In the component the data assignment looks like this:

~~~ts
// excerpt from a component
  private eventData: Array<TBind>;

  constructor() {
    super();
    this.eventData = [{ id: 1, name: 'One' }, { id: 2, name: 'Two' }, { id: 3, name: 'Three' }];
  }
~~~


> :ToCPrevNext

