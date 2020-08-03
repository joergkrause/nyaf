import JSX, { BaseComponent, CustomElement, LifeCycle, Select, InjectService } from '@nyaf/lib';
import hljs from 'highlight.js';
import { HighlightService } from '../../../services/highlight.service';

@CustomElement('app-forms-demo')
@InjectService('highlight', HighlightService)
export class FormsDemoComponent extends BaseComponent {
  constructor() {
    super();
  }

  clickBtn(e: CustomEvent) {
    alert('Button clicked ' + e.detail.customData);
  }

  escape(code: string) {
    const htmlEncode = (c) => c.replace(/[\u00A0-\u9999<>\&]/gim, (i) => {
      return '&#' + i.charCodeAt(0) + ';';
    });
    return htmlEncode(code).replace(/&#60;/g, '<').replace(/&#62;/g, '>');
  }

  render() {
    return (
      <div class='container main-adjust'>
        <app-page-intro header='Forms Library Demo' small='Binding and Validation'></app-page-intro>
        <div class='row' style='position: relative; margin-top: 50px; top:125px'>
          <div class='col-10' data-spy='scroll' data-target='#demonav' data-offset='100'>
            <h3 class='display-4' id='form' source='form'>Simple Form Component</h3>
            <app-slot-tabs>
              <app-slot-tab title='Explanation' >
                <div class='alert alert-info  mb-5'>Simple bi-directional binding.</div>
              </app-slot-tab>
              <app-slot-tab title='Playground'>
                <app-form></app-form>
              </app-slot-tab>
              <app-slot-tab title='Demo Markup'>
              </app-slot-tab>
              <app-slot-tab title='Source Code'>
              </app-slot-tab>
            </app-slot-tabs>
            <hr />
            <h3 class='display-4' id='validation' source='validation'>Validation I</h3>
            <app-slot-tabs>
              <app-slot-tab title='Explanation'>
                <div class='alert alert-info mb-5'>Use validation decorators and bind validation to element's visibility.</div>
              </app-slot-tab>
              <app-slot-tab title='Playground'>
                <app-validation></app-validation>
              </app-slot-tab>
              <app-slot-tab title='Demo Markup'>
              </app-slot-tab>
              <app-slot-tab title='Source Code'>
              </app-slot-tab>
            </app-slot-tabs>
            <hr />
            <h3 class='display-4' id='validation-display' source='validation-display'>Validation II</h3>
            <app-slot-tabs>
              <app-slot-tab title='Explanation'>
                <div class='alert alert-info mb-5'>Use validation decorators and bind validation to element's display style.</div>
              </app-slot-tab>
              <app-slot-tab title='Playground'>
                <app-validation-display></app-validation-display>
              </app-slot-tab>
              <app-slot-tab title='Demo Markup'>
              </app-slot-tab>
              <app-slot-tab title='Source Code'>
              </app-slot-tab>
            </app-slot-tabs>
          </div>
          <div class='col-2' style='position: fixed; right: 15px;'>
            <nav id='demonav'>
              <ul class='nav nav-pills nav-stacked'>
                <li class='nav-item'>
                  <a class='nav-link' href='#form'>Binding</a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#validation'>Validation</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div >
    );
  }

  lifeCycle(lc: LifeCycle) {
    if (lc === LifeCycle.Load) {
      this.services<HighlightService>('highlight').setup(this);
    }
  }

}

