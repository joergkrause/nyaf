import { BaseComponent, ComponentData, CustomElement } from '../base.component';
import JSX from '../jsx';


// Step 1: Create the Components active parts
@CustomElement('app-button')
export class ButtonComponent extends BaseComponent {
  
  protected getData(): ComponentData {
    return null;
  }

  constructor(){
    super();
  }

  protected render(){
    return (<button type="button">OK</button>);
  } 

}