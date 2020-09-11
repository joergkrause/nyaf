
## Services

Once in a while we need to get access to an injectable service. That's also a task for a decorator to extract that kind of infrastructure code from the component's body.

~~~ts
@CustomElement('app-main')
@InjectService('localNameA', ServiceClass1)
@InjectService('localNameB', ServiceClass2.instance, true)
export class MainComponent extends BaseComponent<{}> {

  // ... omitted for brevity

  async render() {
    let data = await this.services('localNameA').callAnyServiceFunctionHereAsync();
  }

}
~~~

*this.services* is a function, that returns an instance of the service. Services are singleton on the level of the local name. The same name used in different components will return the same instance. Using a different name will create a new instance.

> Async is an option, can by sync, too. However, the render process is always asynchronous internally.

The third option of `@InjectService` allows to define a singleton. Instead of providing a type for the second parameter of the decorator, here you must provide an instance. The same name will be shared across components.



