### Life Cycle

Components have a life cycle. Instead of several events, there is just one method you must override (or ignore if not needed):

~~~
lifeCycle(cycle: LifeCycle){
  if (cycle === LifeCycle.Load){
    // it's ready to go
  }
}
~~~

Note, that the method has lower case "l". The `LifeCycle`-enum (upper case "L") has these fields:

* `Init`: Start, ctor is being called.
* `Connect`: Component connects to backend
* `SetData`: A change in the data object occurred.
* `Load`: The render process is done and the component has been loaded
* `PreRender`: The render method has been called and content is written to `innerHTML`.
* `Disconnect`: Component is going to be unloaded.
* `Disposed`: After calling the `dispose` method.

The life cycle is available through an event `lifecycle`. It's exposed via a property called `onlifecycle` on the element level, too. The events are fired after the internal hook has been called.

> :ToCPrevNext