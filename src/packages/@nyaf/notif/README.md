[![Version](https://img.shields.io/npm/v/%40nyaf%2Fnotif.svg?style=flat-square)](https://npmjs.com/package/@nyaf/notif)
[![License](https://img.shields.io/npm/l/%40nyaf%2Fnotif.svg?style=flat-square)](https://npmjs.com/package/@nyaf/notif)

# nyaf is "Not Yet Another Framework"

And it is, well, just another framework. It's simple, has a flat learning curve, doesn't need any special tools.

## Preface

This is an extension to the famous micro framework **nyaf**. You need to build your project on top of **nyaf**, then *@nyaf/notif* makes your life easier, again.

# nyaf-NOTIF

This is the implementation of a simple yet powerful notification system.

## Extending @nyaf

Notif was made to show how easy and quick one can add an extension to the base project. Such an extension consists of these parts:

* A decorator (or more than one) to activate code at runtime
* A base class (or none or more than one) to have object instances of a certain type
* An interface to extend the `BaseComponent` in a way we can access the decorator's output

## How it works

Notif uses the publish-subscribe pattern based in the `Observer` implementation of the base project *@nyaf/lib*. The goal is to send and receive notification. Whilst it sounds trivial, in reality we often need a more complex approach.

### Features

The notification extension has two function:

1. Send notifications
2. Receive notification

The power lies in the construction of the notifications:

* Notifications have an order
* Notifications have a priority that changes the order
* Notifications have a type the UI can use to show them differently
* Notifications have a lifetime from zero to unlimited
* Notifications can trigger actions

### Decorator

To activate add a decorator:

~~~ts
export class MessageType {
  info: string;
}

@Notification(MessageType)
export class NotifComponent extends BaseComponent {

}
~~~

### Interface

The interface extends the base class so the notification stack is accessible.

~~~ts
export interface INotif<T extends object = any> {
  notifications: Notif<T>;
}
~~~

~~~ts
@Notification(MessageType)
export class NotifComponent
        extends BaseComponent
        implements INotif<MessageType> {

   notifications: Notif<MessageType>;

}
~~~

The class *Notif<T>* is the instance of the notification backend.

## Use the Extension

The core is the class *Notif<T>*. It's described in the definition:

~~~ts
export class Notif<T extends object = any> {

  send: (data: T) => void;
  subscribe: (callback: Function ) => void;
  stack: Set<T>;

}
~~~

To send a notification, we create a notification object like this:

~~~ts
const show = new Notification<MessageType>();
show.priority = 100;   // can be omitted, default: 0
show.lifetime = 10000; // in ms, default: 0 (unlimited)
show.type = 'warning'; // string to control UI, default: undefined
show.correlation = ''; // correlation string to modify existing
show.action = 'none';  // 'remove' | 'duplicate' | 'persist'
show.data: MessageType = {
  info: 'An error occurred'
};

const correlation = this.notification.send(show);
// 2000 ms later in code
show.correlation = correlation;
show.action = 'remove';
~~~

This code sends a notification that shall last 10 seconds. However, 2 seconds later something happens that makes the notification obsolete. Due to the correlation id we can changes the existing notification. The action we chose is 'remove', and the notification disappears.

### UI

There is no UI in this extension. Just add a component that subscribes to the notification store. The event fires for each change and delivers all notifications. The store is not interactive, that means, notifications above their lifetime remain until the a subscriber asks for the current state. Before the subscriber callback gets called the store executes some logic to remove outdated notifications.

~~~ts
this.notification.subscribe(notifStore: Set<Notification<MessageType>> => {
  // do something
});
~~~
