import JSX from '@nyaf/lib';

import { CustomElement, BaseComponent } from "@nyaf/lib";
import { ViewModel, IModel, ModelBinder } from "../../..";
import { to } from "../../../smart/to.function";
import { bind } from "../../../smart/bind.function";
import { MockModel } from './mock.model';

@CustomElement('test-binder')
@ViewModel(MockModel)
export class TestComponent extends BaseComponent implements IModel<MockModel> {
  model: ModelBinder<MockModel>;

  render() {
    return (
      <>
        <form>
          <label
            n-bind={to<MockModel, HTMLLabelElement>(m => m.name, e => e.innerText)}>
          </label>
          <input
            type='text'
            n-bind={to<MockModel, HTMLInputElement>(m => m.name, e => e.value)}>
          </input>
        </form>
      </>
    );
  }
}
