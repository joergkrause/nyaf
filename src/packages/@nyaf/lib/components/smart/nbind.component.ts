import { CustomElement } from "../../decorators/customelement.decorator";
import { Properties } from "../../decorators/properties.decorator";
import { BaseComponent } from "../base.component";

@CustomElement('n-bind')
@Properties({ data: null })
export class NBindComponent extends BaseComponent<{ data: any }> {
  render() {
    return this.data.data;
  }
}

