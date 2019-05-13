import { BaseComponent, ComponentData } from '../../../projects/nyaf/src/components/base.component';
import JSX from '../../../projects/nyaf/src/components/jsx';
import { CustomElement } from 'decorators';


// Step 1: Create the Components active parts
@CustomElement('app-button')
export class ButtonComponent extends BaseComponent {
  
  protected getData(): ComponentData {
    return null;
  }

  constructor(){
    super();
  }

  clickMe(e){
    console.log('Button Element Click ', e);
  }

  render(){
    return (<button type="button" n-on-click={(e) => this.clickMe(e)}>OK</button>);
  } 

}