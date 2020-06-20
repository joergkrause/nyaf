import { BaseComponent } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';
import { Display, Hidden, to, IModel, ModelBinder } from '@nyaf/forms';

export class FormModel {
  @Hidden()
  id = 0;
  @Display('User Name')
  userName = '';
  @Display('User City')
  city = '';
}

/**
 * Simple event handling.
 */
@CustomElement('app-form')
export class FormComponent<T extends FormModel> extends BaseComponent<{}> implements IModel<T> {

  readonly model: ModelBinder<T>;

  constructor() {
    super();
    const fm = new FormModel();
    fm.id = 1;
    fm.userName = 'Doris Demo';
    fm.city = 'Denver';
    this.model.setScope(fm as T);
  }

  save(e) {
    console.log('Button save click ', e);
    // TODO: use service
  }

  async render() {
    return await (
      <>
        <form>
          <label n-bind={to<T>(e => e.userName, 'innerText')}  for='un'/>
          <input n-bind={to<T, HTMLInputElement>(e => e.userName, 'value')}  id='un' />
          <br />
          <label n-bind={to<T>(e => e.city, 'innerText')}/>
          <input n-bind={to<T, HTMLInputElement>(e => e.city, 'value')} id ='city' />
          <br />
          <button type='button' n-on-click={e => this.save(e)}>
            Save
          </button>
        </form>
      </>
    );
  }
}
