
## Select Elements

Using the HTML 5 API can be boring. Instead of using `querySelector` in the component's code, use an decorator:

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
