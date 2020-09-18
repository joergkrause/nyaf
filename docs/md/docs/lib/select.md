
## Select Elements

Using the HTML 5 API can result in a lot of API calls. Instead of using `querySelector` in the component's code, use a decorator:

~~~ts
@Select('#queryId') elementName;
~~~

The element is filled with the real object, then. In case you have a selector that returns many elements, the decorator uses `querySelectorAll` internally and returns an object of type `QueryList<T>`. This is an interface and it is defined like this:

~~~ts
interface QueryList<T extends HTMLElement> {
  length: number;
  first: T;
  last: T;
  items: T[];
}
~~~

The decorator logic takes care of the existence of a shadow DOM and acts accordingly.

You can enforce the creation of a list with a second parameter *many*. If set to `true`, the result is always a list with `QueryList`, regardless the number of elements.

~~~ts
@Select('a[href]', true) links;

// later in code
const count = this.links.length;
~~~

### Using Element Types

Use types to access type specific properties:

~~~ts
@Select('#queryId') elementName: HTMLElement;
~~~

~~~ts
@Select('button') buttons: QueryList<HTMLButtonElement>;
~~~

