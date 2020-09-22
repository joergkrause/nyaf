
## Services

Services can be injected by two decorators, one on class level and one on property level. The motivation behind services is a technique called *Dependency Injection*. It's a key ingredient to create testable components.

### Dependency Injection

When developing Web Components you will ask yourself at some point, where to actually get the data and configuration from. If you are used to frameworks like Angular, you know that you can inject services and configurations. Web Components rely on HTML attributes, JavaScript properties and `CustomEvent` for input/outputs. But, what if we use that, to build our own dependency injection to share along with services and configuration? In this deep dive, we are going to experiment and not only see if it is possible but also if it makes sense.

In the blog series about Web Components, we talked a lot about the perks and flaws of Web Components (or: the current state of Web Components) and how their integrability in modern SPA frameworks looks like. But we only took a short look at Web Components being integrated as a single stand-alone component into other environments.

Even with all the flaws, Web Components provide a good-enough foundation to write full applications. For example, our colleague Christian Liebel implemented a web version of Microsoft Paint with Web Components and the help of LitElement.

Especially in the last part of the above-mentioned blog series, we addressed sharing data and common services. If you have a good sense of software architecture, your first thought might be that you can solve sharing data and services via the dependency injection (DI) approach. That is why we want to explore the idea of DI and Web Components in this blog post.

#### The Idea Behind Dependency Injection

If you are familiar with DI, you can skip this section.

As a little reminder, let's talk about dependency injection in general, without going too deep into this (because many great blog posts out there are describing DI). See the following, non-DI approach:

```ts
export class WordDocument extends BaseComponent {
  constructor() {
    this.spellChecker = new GermanSpellChecker();
  }

  spellCheck() {
    this.spellChecker.perform();
  }
}
```

In this example, we have a class WordDocument that itself creates a GermanSpellChecker. By that, they are strongly tied together. If you create an instance of WordDocument, you will always have a GermanSpellChecker. As you can guess, that's not what you want to have all the time.

To change that, we have to invert the control, like this:

```js
export class WordDocument extends BaseComponent{
  constructor(spellChecker: SpellChecker) {
    this.spellChecker = spellChecker;
  }

  // ...
}

// Example
const germanDocument = new WordDocument(new GermanSpellChecker());
const englishDocument = new WordDocument(new EnglishSpellChecker());
const frenchDocument = new WordDocument(new FrenchSpellChecker());
```


If someone wants to create an instance of WordDocument, they also have to provide a spell checker. The big difference is that the caller now can decide which kind of spell checker they want to have, thus we are inverting the control here. That makes our class much more flexible, and you can implement any language for spell checking.

The more dependencies the WordDocument has, the more cumbersome it gets to create each of the dependencies (which also could have dependencies on their own). At this point, you normally introduce a dependency injection container, that, as a straightforward explanation, has a list of classes and automatically creates the instances for you:

```js
container.register(WordDocument);
container.register(GermanSpellChecker);
// ...

const document = container.resolve(WordDocument);
```

The container takes care of how to create an instance of WordDocument with all its dependencies. Since we are using the constructor to inject the dependency, it is also called constructor injection.

Web Components & Dependency Injection
In general, all components share the concept of having inputs and outputs. According to Web Components, we can use HTML attributes and JavaScript properties as inputs and dispatch custom events as outputs. If you want to stay 100 % compatible with the Web Components specification, there is no other possibility to communicate with the Web Component's surroundings. If you plan to embed your Web Components on any page, you should also follow the specification.

But if you plan to build a whole application with Web Components, you can think of other possibilities to communicate and develop your Web Components. Creating an entire application means that you have everything under control. You know your components, your data, your services, and your use cases. And you can create all your classes in a way that they fit together perfectly. Under such circumstances, it is possible to create a dependency injection system that works kind of well with Web Components. And it can even be a hierarchical DI system, that allows a child component to override a parent component's container registry.


### Using @InjectService

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

To get help with types, you can use a generic on the *services* function:

~~~ts
this.services<ServiceClass1>('localNameA');
~~~

### Using @Inject

If you provide this decorator directly on a property, the service is available through this property. The name is no longer needed.

```ts
@CustomElement('app-main')
export class MainComponent extends BaseComponent<{}> {

  @Inject<ServiceClass1>(ServiceClass1) serviceField;

  someActionMethod(): void {
    this.serviceField.actionOnService();
  }
}
```

### Usage Scenarios

Injectable services can be any of these, just to give a few ideas:

* Translation Service
* Logger Service
* HTTP Service

As a definition, it's often something that is not clearly bound to a specific component. If it's a global piece of business logic, it would better fit into a global store as a set of reducers. That's what the *@nyaf/store* module is for. But id it's a technical service, a common function, of just infrastructure, a service is a much better way to implement.
