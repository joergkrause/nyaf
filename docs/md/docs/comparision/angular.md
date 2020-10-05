# ny@f and Angular

Angular is a full-fledged framework that has an answer for everything. It comes with huge amount of code.
The main reason to use Angular is to have a very powerful template language. It gives developers the feel they must not learn HTML 5 APIs and can still
do anything by just learning Angular. That's true, but what the guys at Google not say is that the learning curve is extremely steep and it's a long
way until you master Angular. Would you learn HTML 5 instead... but that's to easy, isn't it?

## Taking the Best

Angular comes with full support of TypeScript (actually, it's written in TypeScript) and all the new handy features, such as Decorators.

That's the same as in ny@f. Let's compare it a bit here.

### Components

A component in Angular is decorated with `@Component({})`. It needs several settings, though.

A component in ny@f is quite the same, using `@CustomElement('name')`. Despite the name no additional settings required.

Angular comes with a template language you have to learn.

~~~html
<ul>
  <li *ngFor="let item of items" >{{ item.text }}</li>
</ul>
~~~

The part to learn is the very proprietary **ngFor* instruction. Some JavaScript is possible here, but very restrictive.

ny@f comes with TSX, which is TypeScript with embedded HTML elements. Not so much to learn here.

~~~tsx
const lis = this.items.map(item => <li>{ item.text })</li>);
<ul>
  { lis }
</ul>
~~~

There is nothing special, it's an array with a `map` function call. HTML remains "as is". You could even make it short like this:

~~~tsx
<ul>
  { this.items.map(item => <li>{ item.text })</li>) }
</ul>
~~~

However, in bigger components this could reduce the readability. But anyway, three lines of code against three lines of code.

Any sort of JavaScript is allowed in here, as long as it fits into a function call.

### Binding

Angular has great data binding. **ny@f** has this, too, but on request. Let's return to the last example. In Angular the list items will re-render if the
collection *items* changes. That's smart and easy to use. It comes with a big penalty: Huge template compiler that inserts a lot boilerplate code for you.

~~~html
<div class="alert alert-danger">
  {{ message }}
</div>
~~~

Supporting steps required (component and binding property):

~~~ts
@Component({
  selector: 'app-demo',
  templateUrl: 'code-from-last-example.html'
}) {
  public message: string;
}
~~~

That's smart, because it's easy to use.

In **ny@f** you load the module **@nyaf/forms** and use explicit binding:

~~~tsx
<div class="alert alert-danger" n-bind={to<Messages>(m => m.message), 'innerText'}>
</div>
~~~

Supporting steps required (component and viewmodel):

~~~ts
// create a viewmodel
export class Messages {
  message: string;
}

@ViewModel<Messages>(Messages)
@CustomElement('app-demo')
export class AppDemoComponent {
  // component goes here
}
~~~

That's great because it has several advantages:

* Binding only if required
* The viewmodel approach is a better way to implement a "separation of concerns" pattern
* Full editor / IntelliSense support due to using TypeScript in the TSX syntax ({} braces) - without additional tooling or plug-ins
* Customizable binders to exactly what you need
* No memory footprint, there is no boilerplate code or generated stuff (it's a JavaScript native Proxy behind the scene)

