## Services

Want to access an injectable service?

~~~
@CustomElement('app-main')
@InjectService('localNameA', ServiceClass1)
@InjectService('localNameB', ServiceClass2, true)
export class MainComponent extends BaseComponent<{}> {

  // ... omitted for brevity

  async render() {
    let data = await this.services('localNameA').callAnyServiceFunctionHereAsync();
  }

}
~~~

> Async is an option, can by sync, too. However, the render process is always asynchronous internally.

*this.services* is a function, that returns an instance of the service. Services are singleton on the level of the local name. The same name used in different components will return the same instance. Using a different name will create a new instance.

The third option of `@InjectService` allows to define a singleton. Instead of providing a type for the decorator, here you must provide an instance. The same name will be shared across components.

> :ToCPrevNext

