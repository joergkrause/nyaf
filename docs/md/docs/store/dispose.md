## Disposing

Some event handlers and especially the store environment need a proper removing of handlers. This happens in the `dispose` method you can override in the component. The `@Dispose` decorator is provided by the base library in **@nyaf/lib**. It will be triggered by the lifecycle event and is independent of the store infrastructure.

### Using Dispose with Store

This is how it looks like:

```ts
constructor() {
  super();
  this.tabSubscriber = this.store.subscribe('tab', (data: globalStoreType) => {
    document.querySelector<SlotTabsComponent>('#demoTabs')?.setTab(data.tab);
  });
  this.tabSubscriberCheckRemoving = this.store.subscribe('tab', (data: globalStoreType) => {
    console.log('Tab Subscriber received change from store');
  });
}

store: Store<globalStoreType>;

dispose() {
  if (this.tabSubscriber) {
    this.tabSubscriber.remove();
  }
  if (this.tabSubscriberCheckRemoving) {
    this.tabSubscriberCheckRemoving.remove();
  }
}
```

Even easier is the usage of the `Dispose` decorator like this:

```ts
@Dispose(s => s.remove()) private readonly tabSubscriber;
@Dispose(s => s.remove()) private readonly tabSubscriberCheckRemoving;
```

You can now remove the `dispose` method entirely. The variable *s* in the example code is the current property the decorator is placed on (*tabSubscriber* or *tabSubscriberCheckRemoving*). The call convention depends on the object the property returns. There is no error handling internally, the code is executed "as is".

### General Usage

The `@Dispose` decorator is defined in the base library and not limited to store actions. The callback function has access to the current property and can execute anything on behalf of it.
