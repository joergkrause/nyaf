import { ViewModel } from '../../viewmodel.decorator';
import { BaseComponent } from '@nyaf/lib';
import { MockModel } from './mock.model';
import { IBindingHandler } from '../../../modelbinder/handlers/ibindinghandler.interface';
import { Binding } from '../../../modelbinder/binding.class';

export class MockBindingHandler implements IBindingHandler{
  bind?(binding: Binding): void {
    // do nothing in mock
  }
  react(binding: Binding, property?: string): void {
    // do nothing in mock
  }
  listener?(binding: Binding, e?: Event): void {
    // do nothing in mock
  }

}

@ViewModel<MockModel>(MockModel, {
  ctor: { name: 'standard name' },
  handler: { 'mock': new MockBindingHandler() }
})
export class MockOptionsCtorComponent extends BaseComponent {
  constructor() {
    super();
  }
  render(): string {
    return '<h1>Test</h1>';
  }
}


@ViewModel<MockModel>(MockModel, {
  factory: (model) => model.name = 'default name',
  handler: { 'mock': new MockBindingHandler() }
})
export class MockOptionsFactoryComponent extends BaseComponent {
  constructor() {
    super();
  }
  render(): string {
    return '<h1>Test</h1>';
  }
}
