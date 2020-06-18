# Smart Components

Some features do not require additional code, they just need a clever usage of the power of TypeScript and Web Components. To simplify your life, a few of these are predefined as integrated components - the Smart Components.

## Repeater - n-repeat

The repeater component creates a loop. In the following example and interface defines a single item. An array with items of this type is provided.

~~~jsx
import JSX, { CustomElement, BaseComponent, of } from '@nyaf/lib';

interface T {
  id: number;
  name: string;
}

@CustomElement('app-repeater-test')
export class RepeaterTestComponent extends BaseComponent<{}> {
  eventData: any;

  constructor() {
    super();
  }

  clickMe(e) {
    console.log('Button Element Click ', e);
    this.eventData = e;
    super.setup();
  }

  async render() {
    const data: Array<T> = [{ id: 1, name: 'One' }, { id: 2, name: 'Two' }, { id: 3, name: 'Three' }]
    return await (
      <>
        <div>
          <ul>
            <n-repeat source={data}>
              <li data={of<T>(p => p.id)}>{of<T>(p => p.name)}</li>
            </n-repeat>
          </ul>
        </div>
      </>
    );
  }
}
~~~

The repeater repeats the array's elements. Each element provides properties you can place anywhere in the body using the `of<Type>` operator. It's type safe, the editor will help you selecting the right properties from the given type.

## Transparent Outlet n-outlet

This is another outlet that renders into nothing. Normally you would do this:

~~~html
<div n-router-outlet></div>
~~~

But that would place your component in a DIV element. If this is disturbing, just use this:

~~~html
<n-outlet></n-outlet>
~~~

Also, a named variety is available:

~~~html
<n-outlet name="main"></n-outlet>
~~~



> :ToCPrevNext

