import { BaseComponent, ComponentData } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';

export class FormModel {
  id = 0;
  userName = '';
  city = '';
}

/**
 * Simple event handling.
 */
@CustomElement('app-form')
export class FormComponent extends BaseComponent<{ model: FormModel}> {
  eventData: any;

  constructor() {
    super();
    const fm = new FormModel();
    fm.id = 1;
    fm.userName = 'Doris Demo';
    fm.city = 'Denver';
    super.data.model = fm;
  }

  save(e) {
    console.log('Button save click ', e);
    // TODO: use service
  }

  render() {
    return (
      <>
        <form n-model={super.data.model}>
          <label n-for='@userName' for='un'/>
          <input n-for={super.data.model} name='@userName' id='un' />
          <br />
          <label n-for='@city' for='city'/>
          <input n-for={super.data.model} name='@city' id ='city' />
          <br />
          <button type='button' n-on-click={e => this.save(e)}>
            Save
          </button>
        </form>
      </>
    );
  }
}
