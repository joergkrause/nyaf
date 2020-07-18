import JSX, { BaseComponent, CustomElement } from '@nyaf/lib';


@CustomElement('app-design')
export class DesignDemoComponent extends BaseComponent {
  constructor() {
    super();
  }

  clickBtn(e: CustomEvent) {
    alert('Button clicked ' + e.detail.customData);
  }

  render() {
    return (
      <>
        <p class='display3'>
          Design Demo
        </p>
        <hr />
        <div class='row'>
          <app-slot-tabs>
            <app-slot-tab title='Slot Tab 1'>
              Content 1
          </app-slot-tab>
            <app-slot-tab title='Slot Tab 2'>
              Content 2
          </app-slot-tab>
          </app-slot-tabs>
        </div>
        <hr />
      </>
    );
  }

}
