import JSX from '../../components/jsx';
import { BaseComponent } from '../../components/base.component';
import { Properties } from '../../decorators/properties.decorator';
import { Events } from '../../decorators/events.decorator';
import { CustomElement } from '../../decorators/customelement.decorator';

interface MockPropType {
  text: string;
}

/**
 * Event handling and used in up-level component.
 */
@CustomElement('mock-component')
@Properties<MockPropType>({ text: '' })
@Events(['showAlert'])
export class MockComponent extends BaseComponent<MockPropType>  {

  async render() {
    return await (
      <div>TEST</div>
    );
  }

}
