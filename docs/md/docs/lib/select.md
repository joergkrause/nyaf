
## Select Elements

Using the HTML 5 API can be boring. Instead of using `querySelector` in the component's code, use an decorator:

~~~ts
@Select('#queryId') elementName;
~~~

The element is filled with the real object, then.