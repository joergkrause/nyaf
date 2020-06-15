## Template Features

Template Features avoid using creepy JavaScript for loops and branches. You can use:

* `n-repeat`
* `n-if`, `n-else`
* `n-hide`, `n-show`
* `n-on-<event>` (see further down)
* `n-expand`

### n-repeat

Repeats the element. The argument must be an array.

Assume we have this object:

~~~
{ text: string, content: string }
~~~

It's in an array like this:

~~~
[
  {
    text: "hallo",
    content: "Hello NYAF"
  },
  {
    text: "world",
    content: "This is really nice"
  }
]
~~~

Than you show the data on the page like this:

~~~
<app-tab n-repeat={tabs} title="@title" content="@@content"></app-tab>
~~~

Also, text will be parsed as JSON (alternatively):

~~~
<app-tab n-repeat='[{ "id":1 }, { "id":2 }]' title="@@title" content="@@content"></app-tab>
~~~

The array shall contain objects. If one property is needed, it's accessible within any attribute by writing `attribute="@@propName"`. Note the usage of the quotes and the "@@" character sequence.

You can repeat anything, even plain HTML elements such as `<span>` or `<li>`. The behavior is comparable to Angular's `*ngFor` directive.

### n-if, n-else

The value will be evaluated and the element does or does not render, then:

~~~
<div class="main-header"
     n-if={this.props.title !== 't1'}>
  <span>Any content will not render if container doesn't render</span>
</div>
~~~

If there is an else-branch it can direct to a slot template. `<slot>` elements are native web component parts.

~~~
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

~~~
<input type="text" placeholder="Name" role="search" class="materialinput" id="a1 />
~~~

You need this several times, each with different id.

~~~
<input n-expand="search" id="a1" />
<input n-expand="search" id="a2" />
<input n-expand="search" id="a3" />
~~~

To define it, just create a class like this:

~~~
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

~~~
Globalprovider.bootstrap({
  components: [...components], // as usual
  expanders: [SearchExpander]
})
~~~

That's it, a lot less to write without the effort to create components. It's just text-replacement before the render grabs the content, so NO performance impact at runtime.

> :ToCPrevNext

