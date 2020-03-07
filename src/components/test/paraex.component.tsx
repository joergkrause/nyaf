import { BaseComponent, Properties, Extends } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';
import { BasePComponent } from '@nyaf/lib/components/base.p.component';

interface ParaExPropType  {
  text: string;
}

/**
 * Event handling and used in up-level component.
 */
@CustomElement('app-para')
@Properties<ParaExPropType>({ text: '' })
@Extends('p')
export class ParaExComponent extends BasePComponent<ParaExPropType> {
  align: string;

  constructor() {
    super();
  }

  render() {
    return (
      <strong>
        {this.data.text}
      </strong>
    );
  }

}
