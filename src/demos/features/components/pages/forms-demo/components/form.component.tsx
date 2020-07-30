import JSX, { BaseComponent, LifeCycle, CustomElement } from '@nyaf/lib';
import { Display, Hidden, to, IModel, ModelBinder, ViewModel } from '@nyaf/forms';

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
@ViewModel(FormModel)
export class FormComponent<T extends FormModel> extends BaseComponent<{}> implements IModel<T> {

  readonly model: ModelBinder<T>;

  constructor() {
    super();
  }

  save(e) {
    this.querySelector<SubFormComponent>('#subForm').subValue = 'Button click in sub form';
  }

  lifeCycle(state: LifeCycle) {
    if (state === LifeCycle.Load) {
      console.log('Form  Load');
      // presets
      this.model.scope.id = 1;
      this.model.scope.userName = 'Doris Demo';
      this.model.scope.city = 'Denver';
      this.querySelector<SubFormComponent>('#subForm').subValue = 'Sub form loaded';
    }
  }

  async render() {
    return await (
      <>
        <form>
          <label n-bind={to<T>(e => e.userName, 'innerText')} for='un' />
          <input n-bind={to<T, HTMLInputElement>(e => e.userName, 'value')} id='un' />
          <br />
          <label n-bind={to<T>(e => e.city, 'innerText')} />
          <input n-bind={to<T, HTMLInputElement>(e => e.city, 'value')} id='city' />
          <br />
          <button type='button' n-on-click={e => this.save(e)}>
            Save
          </button>
          <h5>Sub Form Binding</h5>
          <app-sub-form id='subForm'>Not yet loaded...</app-sub-form>
          <hr />
        </form>
      </>
    );
  }
}

export class SubFormModel {
  value = '';
}

@CustomElement('app-sub-form')
@ViewModel(SubFormModel)
export class SubFormComponent<T extends SubFormModel = SubFormModel> extends BaseComponent<T> implements IModel<T> {

  readonly model: ModelBinder<T>;

  constructor() {
    super();
  }

  async render() {
    return await (
      <div>
        <span n-bind={to<T>(e => e.value, 'innerText')} ></span>
      </div>
    );
  }

  public set subValue(value: string) {
    this.model.scope.value = value;
  }

  public get subValue(): string {
    return this.model.scope.value;
  }

  lifeCycle(state: LifeCycle) {
    if (state === LifeCycle.Load) {
      console.log('Sub Form  Load');
    }
  }

}
