## Disposing

Some event handlers and especially the store environment need a proper removing of handlers. This happens in the `dispose` method you can
override in the component.

### Example

This is how it looks like:

~~~ts
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
~~~

Even easier is usage of the `Dispose` decorator like this:

~~~ts
@Dispose(s => s.remove()) private readonly tabSubscriber;
@Dispose(s => s.remove()) private readonly tabSubscriberCheckRemoving;
~~~

You can now remove the `dispose` method entirely.

### General Usage

The `@Dispose` decorator is defined in the base library and not limited to store actions.
