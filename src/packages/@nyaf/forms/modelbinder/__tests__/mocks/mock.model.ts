import { Required } from "../../../decorators/forms/val-required.decorator";
import { Range } from "../../../decorators/forms/val-range.decorator";

export class MockModel {
  @Required()
  name: string = '';

  @Range(1, 10)
  num: number = 0;
}

