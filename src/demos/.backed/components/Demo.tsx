import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';
import '@fortawesome/fontawesome-free/css/all.css';

import '../css/demo.css';
import { IModel, ModelBinder } from '@nyaf/forms';
import { Color } from '@nyaf/ui';

const autocompleteList = ['Ukraine', 'USA', 'Canada', 'Marokko', 'Singapur'];

const customButtons = [
  {
    title: '',
    icon: 'apple',
    image: '',
    cls: 'info',
    onClick: () => { alert('info!'); }
  },
  {
    title: '',
    icon: 'rocket',
    iconPrefix: 'fa fa-',
    image: '',
    cls: 'alert',
    onClick: () => { alert('halo!'); }
  }
];

const dialogButtons = [
  {
    title: 'Ok',
    cls: 'info',
    onClick: () => { console.log('Dialog Ok!'); }
  },
  {
    title: 'Cancel',
    onClick: () => { console.log('Dialog Cancel!'); }
  }
];

const textAreaValue = `
111
222
333
444
`;

class DemoModel {
  dialogOpen = false;
  activityOpen = false;
  modalOpen = false;
  collapsibleOpen = false;
}

@CustomElement('demo-demo')
export class Demo extends BaseComponent<{}> implements IModel<DemoModel> {

  constructor() {
    super();

    this.model.scope.dialogOpen = false;
    this.model.scope.activityOpen = false;
    this.model.scope.modalOpen = false;
    this.model.scope.collapsibleOpen = false;

  }

  model: ModelBinder<DemoModel>;

  paginatinOnClick(val) {
    alert(val);
  }

  toggleDialog() {
    this.model.scope.dialogOpen = !this.model.scope.dialogOpen;
  }

  toggleActivity() {
    this.model.scope.activityOpen = !this.model.scope.activityOpen;
  }

  closeDialog() {
    this.model.scope.dialogOpen = false;
  }

  closeActivity() {
    this.model.scope.activityOpen = false;
  }

  closeModal() {
    this.model.scope.modalOpen = false;
  }

  openModal() {
    this.model.scope.modalOpen = true;
  }

  toggleCollapsible() {
    this.model.scope.collapsibleOpen = !this.model.scope.collapsibleOpen;
  }

  async render() {
    return await (
      <ui-container>
        <ui-mainmenu />

        <ui-grid>
          <h2 className='text-light'>&lt;Hint/&gt;</h2>
          <div>
            Pumpkin seeds combines greatly with crusted <ui-hint text='This is a hint for inline text'>blueberries</ui-hint>.

            <br />
            <br />

            <ui-hint text='This is a button'>
              <ui-button>Button</ui-button>
            </ui-hint>
          </div>
          <h4>Hint position</h4>
          <ui-row>
            <ui-cell cls='cell-md-3'>
              <ui-hint text='This is a button' position='right'>
                <ui-button>Hint right</ui-button>
              </ui-hint>
            </ui-cell>
            <ui-cell cls='cell-md-3 text-center'>
              <ui-hint text='This is a button' position='top'>
                <ui-button>Hit top</ui-button>
              </ui-hint>
            </ui-cell>
            <ui-cell cls='cell-md-3 text-center'>
              <ui-hint text='This is a button' position='bottom'>
                <ui-button>Hit bottom</ui-button>
              </ui-hint>
            </ui-cell>
            <ui-cell cls='cell-md-3 text-right'>
              <ui-hint text='This is a button' position='left'>
                <ui-button>Hit left</ui-button>
              </ui-hint>
            </ui-cell>
          </ui-row>


          <h2 className='text-light'>&lt;TagInput/&gt;</h2>
          <div>
            <h5>Default editable</h5>
            <ui-taginput tags={['css', 'javascript', 'html']} />

            <h5>Static mode</h5>
            <ui-taginput tags={['css', 'javascript', 'html']} staticMode={true} />
          </div>


          <h2 className='text-light'>&lt;ui-select-icon/&gt;</h2>
          <ui-row>
            <ui-cell cls='cell-sm-5'>
              <h5>Metro icon font</h5>
              <ui-select-icon source='/data/metro.svg' />
            </ui-cell>
            <ui-cell cls='cell-sm-5'>
              <h5>Font Awesome</h5>
              <ui-select-icon source='/data/fa.svg' viewBoxWidth={512} viewBoxHeight={448} valueAsPath={true} />
            </ui-cell>
            <ui-cell cls='cell-sm-2'>
              <h5>No titles</h5>
              <ui-select-icon source='/data/fa.svg' viewBoxWidth={512} viewBoxHeight={448} nameInCaption={false} nameInItem={false} />
            </ui-cell>
          </ui-row>

          <h2 className='text-light'>&lt;ui-selectcolor/&gt;</h2>
          <ui-row>
            <ui-cell cls='cell-sm-5'>
              <ui-selectcolor source={Color.colorListMetro} prepend='Color: ' />
            </ui-cell>
            <ui-cell cls='cell-sm-5'>
              <ui-selectcolor source={Color.colorListStandard} append='your color' />
            </ui-cell>
            <ui-cell cls='cell-sm-2'>
              <ui-selectcolor filter={false} value='#008000' nameInCaption={false} nameInItem={false}>
                <option value='#ff0000'>red</option>
                <option value='#008000'>green</option>
                <option value='#0000ff'>blue</option>
              </ui-selectcolor>
            </ui-cell>
          </ui-row>


          <h2 className='text-light'>&lt;HtmlContainer/&gt;</h2>
          <ui-row>
            <ui-cell cls={'cell-md-6'}>
              <h5>as text</h5>
              <ui-htmlcontainer source={'data/append.html'} insertAs={'text'} />
            </ui-cell>
            <ui-cell cls={'cell-md-6'}>
              <h5>as html</h5>
              <ui-htmlcontainer source={'data/append.html'} insertAs={'html'} />
            </ui-cell>
          </ui-row>

          <h2 className='text-light'>&lt;Textarea/&gt;</h2>
          <ui-row>
            <ui-cell cls='cell-md-4'>
              <ui-textarea value={textAreaValue.trim()} />
            </ui-cell>
          </ui-row>

          <h2 className='text-light'>&lt;Rating/&gt;</h2>
          <ui-row>
            <ui-cell cls={'cell-md-3'}>
              <ui-rating />
            </ui-cell>
            <ui-cell cls={'cell-md-3'}>
              <ui-rating value={3} />
            </ui-cell>
            <ui-cell cls={'cell-md-3'}>
              <ui-rating value={2.5} isStatic={true} />
            </ui-cell>
            <ui-cell cls={'cell-md-3'}>
              <ui-rating value={3.5} caption={'(723 votes)'} values={['a', 'b', 'c', 'd', 'e']} onChange={(e) => { console.log(e.target); }} />
            </ui-cell>
          </ui-row>
          <ui-row>
            <ui-cell cls={'cell-md-3'}>
              <ui-rating starColor={Color.colorListMetro.cyan} staredColor={Color.colorListMetro.orange} value={3} />
            </ui-cell>
            <ui-cell cls={'cell-md-3'}>
              <ui-rating starColor={Color.colorListMetro.orange} staredColor={Color.colorListMetro.cyan} value={3} />
            </ui-cell>
            <ui-cell cls={'cell-md-3'}>
              <ui-rating starColor={Color.colorListMetro.pink} staredColor={Color.colorListMetro.red} value={2.5} isStatic={true} />
            </ui-cell>
            <ui-cell cls={'cell-md-3'}>
              <ui-rating starColor={Color.colorListMetro.blue} staredColor={Color.colorListMetro.green} value={3} caption={'(123 votes)'} clsCaption={'fg-green text-bold'} />
            </ui-cell>
          </ui-row>

          <h2 className='text-light'>&lt;Panel/&gt;</h2>
          <ui-row>
            <ui-cell cls={'cell-md-4'}>
              <ui-panel caption={'Panel'} clsContent={'p-4'} collapsible={false}>
                Huge, post-apocalyptic teleporters rudely transfer a carnivorous, ship-wide tribble.
                Our ultimate milk for resurrection is to know others extraordinarilly.
                            </ui-panel>
            </ui-cell>
            <ui-cell cls={'cell-md-4'}>
              <ui-panel caption={'Panel'} clsContent={'p-4'} image={'images/setup.png'} collapsible={false}>
                Huge, post-apocalyptic teleporters rudely transfer a carnivorous, ship-wide tribble.
                Our ultimate milk for resurrection is to know others extraordinarilly.
                            </ui-panel>
            </ui-cell>
            <ui-cell cls={'cell-md-4'}>
              <ui-panel caption={'Panel'} clsContent={'bg-light p-4'} icon={'rocket'} iconPrefix={'fa fa-'} clsIcon={'fg-yellow no-border'} clsDropdownToggle={'no-border marker-light'} clsCaption={'text-bold'} clsTitle={'bg-cyan fg-white'}>
                Huge, post-apocalyptic teleporters rudely transfer a carnivorous, ship-wide tribble.
                Our ultimate milk for resurrection is to know others extraordinarilly.
                            </ui-panel>
            </ui-cell>
          </ui-row>


          <h2 className='text-light'>&lt;Progress/&gt;</h2>
          <ui-row>
            <ui-cell cls={'cell-md-4'}>
              <ui-progress value={35} />
            </ui-cell>
            <ui-cell cls={'cell-md-4'}>
              <ui-progress value={35} buffer={75} />
            </ui-cell>
            <ui-cell cls={'cell-md-4'}>
              <ui-progress value={50} buffer={75} showValue={true} />
            </ui-cell>
          </ui-row>
          <br />
          <ui-row>
            <ui-cell cls={'cell-md-4'}>
              <ui-progress variant={'line'} />
            </ui-cell>
            <ui-cell cls={'cell-md-4'}>
              <ui-progress variant={'load'} value={35} buffer={75} />
            </ui-cell>
            <ui-cell cls={'cell-md-4'}>
              <ui-progress value={35} buffer={75} clsBar={'bg-orange'} clsBuffer={'bg-cyan'} clsBack={'bg-darkSteel'} />
            </ui-cell>
          </ui-row>


          <br />
          <h2 className='text-light'>&lt;SplitButton/&gt;</h2>
          <ui-row>
            <ui-cell cls={'cell-md-3'}>
              <ui-splitbutton>
                <ui-button>Reply</ui-button>
                <ui-button />
                <ul className={'d-menu'}>
                  <li><a href={'#'}>Item 1</a></li>
                  <li><a href={'#'}>Item 2</a></li>
                  <li><a href={'#'}>Item 3</a></li>
                </ul>
              </ui-splitbutton>
            </ui-cell>
            <ui-cell cls={'cell-md-3'}>
              <ui-splitbutton>
                <ui-button cls={'primary'}>Reply</ui-button>
                <ui-button cls={'alert'} />
                <ul className={'d-menu'}>
                  <li><a href={'#'}>Item 1</a></li>
                  <li><a href={'#'}>Item 2</a></li>
                  <li><a href={'#'}>Item 3</a></li>
                </ul>
              </ui-splitbutton>
            </ui-cell>
            <ui-cell cls={'cell-md-3'}>
              <ui-splitbutton clsMainButton={'warning rounded'} clsSplitButton={'info rounded'}>
                <ui-button>Reply</ui-button>
                <ui-button />
                <ul className={'d-menu'}>
                  <li><a href={'#'}>Item 1</a></li>
                  <li><a href={'#'}>Item 2</a></li>
                  <li><a href={'#'}>Item 3</a></li>
                </ul>
              </ui-splitbutton>
            </ui-cell>
            <ui-cell cls={'cell-md-3'}>
              <ui-splitbutton clsMainButton={'success outline'} clsSplitButton={'info rounded'}>
                <ui-button>Reply</ui-button>
                <ui-button>...</ui-button>
              </ui-splitbutton>
            </ui-cell>
          </ui-row>

          <br />
          <h2 className='text-light'>&lt;Select/&gt;</h2>
          <ui-row>
            <ui-cell cls='cell-md-4'>
              <ui-select>
                <optgroup label='Physical servers'>
                  <option value='dedicated_corei3_hp'>Core i3 (hp)</option>
                  <option value='dedicated_pentium_hp'>Pentium (hp)</option>
                  <option value='dedicated_smart_corei3_hp'>Smart Core i3 (hp)</option>
                </optgroup>
                <optgroup label='Virtual hosting'>
                  <option value='mini'>Mini</option>
                  <option value='site'>Site</option>
                  <option value='portal'>Portal</option>
                </optgroup>
                <optgroup label='Virtual servers'>
                  <option value='evps0'>eVPS-TEST (30 дней)</option>
                  <option value='evps1'>eVPS-1</option>
                  <option value='evps2'>eVPS-2</option>
                </optgroup>
              </ui-select>
            </ui-cell>
            <ui-cell cls='cell-md-4'>
              <ui-select value={'mini'} multiple={false}>
                <optgroup label='Physical servers'>
                  <option value='dedicated_corei3_hp'>Core i3 (hp)</option>
                  <option value='dedicated_pentium_hp'>Pentium (hp)</option>
                  <option value='dedicated_smart_corei3_hp'>Smart Core i3 (hp)</option>
                </optgroup>
                <optgroup label='Virtual hosting'>
                  <option value='mini'>Mini</option>
                  <option value='site'>Site</option>
                  <option value='portal'>Portal</option>
                </optgroup>
                <optgroup label='Virtual servers'>
                  <option value='evps0'>eVPS-TEST (30 дней)</option>
                  <option value='evps1'>eVPS-1</option>
                  <option value='evps2'>eVPS-2</option>
                </optgroup>
              </ui-select>
            </ui-cell>
            <ui-cell cls='cell-md-4'>
              <ui-select value={['mini', 'dedicated_corei3_hp']} multiple={true}>
                <optgroup label='Physical servers'>
                  <option value='dedicated_corei3_hp'>Core i3 (hp)</option>
                  <option value='dedicated_pentium_hp'>Pentium (hp)</option>
                  <option value='dedicated_smart_corei3_hp'>Smart Core i3 (hp)</option>
                </optgroup>
                <optgroup label='Virtual hosting'>
                  <option value='mini'>Mini</option>
                  <option value='site'>Site</option>
                  <option value='portal'>Portal</option>
                </optgroup>
                <optgroup label='Virtual servers'>
                  <option value='evps0'>eVPS-TEST (30 дней)</option>
                  <option value='evps1'>eVPS-1</option>
                  <option value='evps2'>eVPS-2</option>
                </optgroup>
              </ui-select>
            </ui-cell>
          </ui-row>
          <br />
          <br />
          <ui-row>
            <ui-cell cls='cell-md-4'>
              <ui-select fieldState={'success'}>
                <optgroup label='Physical servers'>
                  <option value='dedicated_corei3_hp'>Core i3 (hp)</option>
                  <option value='dedicated_pentium_hp'>Pentium (hp)</option>
                  <option value='dedicated_smart_corei3_hp'>Smart Core i3 (hp)</option>
                </optgroup>
                <optgroup label='Virtual hosting'>
                  <option value='mini'>Mini</option>
                  <option value='site'>Site</option>
                  <option value='portal'>Portal</option>
                </optgroup>
                <optgroup label='Virtual servers'>
                  <option value='evps0'>eVPS-TEST (30 дней)</option>
                  <option value='evps1'>eVPS-1</option>
                  <option value='evps2'>eVPS-2</option>
                </optgroup>
              </ui-select>
            </ui-cell>
            <ui-cell cls='cell-md-4'>
              <ui-select value={'mini'} fieldState={'error'} errorMessage={'Select valid value'} clsSelected={'fg-cyan text-bold'}>
                <optgroup label='Physical servers'>
                  <option value='dedicated_corei3_hp'>Core i3 (hp)</option>
                  <option value='dedicated_pentium_hp'>Pentium (hp)</option>
                  <option value='dedicated_smart_corei3_hp'>Smart Core i3 (hp)</option>
                </optgroup>
                <optgroup label='Virtual hosting'>
                  <option value='mini'>Mini</option>
                  <option value='site'>Site</option>
                  <option value='portal'>Portal</option>
                </optgroup>
                <optgroup label='Virtual servers'>
                  <option value='evps0'>eVPS-TEST (30 дней)</option>
                  <option value='evps1'>eVPS-1</option>
                  <option value='evps2'>eVPS-2</option>
                </optgroup>
              </ui-select>
            </ui-cell>
            <ui-cell cls='cell-md-4'>
              <ui-select cls={'required'} value={['mini', 'dedicated_corei3_hp']} multiple={true} clsTag={'info'}>
                <optgroup label='Physical servers'>
                  <option value='dedicated_corei3_hp'>Core i3 (hp)</option>
                  <option value='dedicated_pentium_hp'>Pentium (hp)</option>
                  <option value='dedicated_smart_corei3_hp'>Smart Core i3 (hp)</option>
                </optgroup>
                <optgroup label='Virtual hosting'>
                  <option value='mini'>Mini</option>
                  <option value='site'>Site</option>
                  <option value='portal'>Portal</option>
                </optgroup>
                <optgroup label='Virtual servers'>
                  <option value='evps0'>eVPS-TEST (30 дней)</option>
                  <option value='evps1'>eVPS-1</option>
                  <option value='evps2'>eVPS-2</option>
                </optgroup>
              </ui-select>
            </ui-cell>
          </ui-row>

          <h2 className={'text-light'}>&lt;Input/&gt;</h2>
          <ui-row>
            <ui-cell cls='cell-md-4'>
              <h6>default</h6>
              <ui-input placeholder='Input value' value={123} />
            </ui-cell>
            <ui-cell cls='cell-md-4'>
              <h6>password</h6>
              <ui-input placeholder='Enter a password' type='password' />
            </ui-cell>
            <ui-cell cls='cell-md-4'>
              <h6>search</h6>
              <ui-input placeholder='Search...' search={true} onSearch={val => console.log(val)} />
            </ui-cell>
          </ui-row>

          <ui-row>
            <ui-cell cls='cell-md-4'>
              <h6>history</h6>
              <ui-input history={true} />
            </ui-cell>
            <ui-cell cls='cell-md-4'>
              <h6>autocomplete</h6>
              <ui-input autocomplete={autocompleteList} />
            </ui-cell>
            <ui-cell cls='cell-md-4'>
              <h5>custom buttons</h5>
              <ui-input customButtons={customButtons} />
            </ui-cell>
          </ui-row>

          <ui-row>
            <ui-cell cls='cell-md-4'>
              <h6>state required</h6>
              <ui-input cls={'required'} />
            </ui-cell>
            <ui-cell cls='cell-md-4'>
              <h6>state error</h6>
              <ui-input fieldState={'error'} errorMessage={'Enter a valid value'} />
            </ui-cell>
            <ui-cell cls='cell-md-4'>
              <h6>state success</h6>
              <ui-input fieldState={'success'} />
            </ui-cell>
          </ui-row>

          <ui-row>
            <ui-cell cls='cell-md-3'>
              <h6>prepend</h6>
              <ui-input value='Input value' prepend='Prepend:' />
            </ui-cell>
            <ui-cell cls='cell-md-3'>
              <h6>prepend icon</h6>
              <ui-input value='Input value' prepend={<ui-icon name='rocket' />} />
            </ui-cell>
            <ui-cell cls='cell-md-3'>
              <h6>append</h6>
              <ui-input value='Input value' append='%' />
            </ui-cell>
            <ui-cell cls='cell-md-3'>
              <h6>append icon</h6>
              <ui-input value='Input value' append={<ui-icon name='rocket' />} />
            </ui-cell>
          </ui-row>

          <br />
          <h2 className='text-light'>&lt;Checkbox/&gt;, &lt;Radio/&gt;, &lt;Switch/&gt;</h2>
          <ui-row>
            <ui-cell cls='cell-md-4'>
              <div>
                <ui-checkbox name='check1' />
                <ui-checkbox name='check2' checked />
                <ui-checkbox name='check3' disabled />
                <ui-checkbox name='check4' checked disabled />
                <ui-checkbox name='check5' caption='my checkbox' />
              </div>
              <div>
                <ui-checkbox name='check1' variant={2} />
                <ui-checkbox name='check2' checked variant={2} />
                <ui-checkbox name='check3' disabled variant={2} />
                <ui-checkbox name='check4' checked disabled variant={2} />
                <ui-checkbox name='check5' caption='my checkbox' variant={2} />
              </div>
            </ui-cell>
            <ui-cell cls='cell-md-4'>
              <div>
                <ui-radio name='radio1_1' value={1} />
                <ui-radio name='radio1_1' value={2} checked />
                <ui-radio name='radio1_2' disabled />
                <ui-radio name='radio1_3' checked disabled />
                <ui-radio name='radio1_4' caption='my radio' />
              </div>
              <div>
                <ui-radio name='radio2_1' checked variant={2} />
                <ui-radio name='radio2_1' variant={2} />
                <ui-radio name='radio2_2' disabled variant={2} />
                <ui-radio name='radio2_3' checked disabled variant={2} />
                <ui-radio name='radio2_4' caption='my radio' variant={2} />
              </div>
            </ui-cell>
            <ui-cell cls='cell-md-4'>
              <div>
                <ui-switch name='switch1' />
                <ui-switch name='switch2' checked />
                <ui-switch name='switch3' disabled />
                <ui-switch name='switch4' checked disabled />
              </div>
              <div>
                <ui-switch name='switch1' variant={2} />
                <ui-switch name='switch2' checked variant={2} />
                <ui-switch name='switch3' disabled variant={2} />
                <ui-switch name='switch4' checked disabled variant={2} />
              </div>
            </ui-cell>
          </ui-row>

          <br />
          <h2 className='text-light'>&lt;Tabs/&gt;</h2>
          <ui-row>
            <ui-cell cls={'cell-md-4'}>
              <ui-tabs cls={'tabs-expand'}>
                <ui-tab>Home</ui-tab>
                <ui-tab>Profile</ui-tab>
                <ui-tab>Links</ui-tab>
              </ui-tabs>
            </ui-cell>
            <ui-cell cls={'cell-md-4'}>
              <ui-tabs cls={'tabs-expand'} position={'bottom'}>
                <ui-tab>Home</ui-tab>
                <ui-tab>Profile</ui-tab>
                <ui-tab>Links</ui-tab>
              </ui-tabs>
            </ui-cell>
            <ui-cell cls={'cell-md-2'}>
              <ui-tabs cls={'tabs-expand'} position={'left'}>
                <ui-tab>Home</ui-tab>
                <ui-tab>Profile</ui-tab>
                <ui-tab>Links</ui-tab>
              </ui-tabs>
            </ui-cell>
            <ui-cell cls={'cell-md-2'}>
              <ui-tabs cls={'tabs-expand'} position={'right'}>
                <ui-tab>Home</ui-tab>
                <ui-tab>Profile</ui-tab>
                <ui-tab>Links</ui-tab>
              </ui-tabs>
            </ui-cell>
          </ui-row>
          <br />
          <ui-row>
            <ui-cell cls={'cell-md-4'}>
              <ui-tabs cls={'tabs-expand'} variant={'text'}>
                <ui-tab>Home</ui-tab>
                <ui-tab>Profile</ui-tab>
                <ui-tab>Links</ui-tab>
              </ui-tabs>
            </ui-cell>
            <ui-cell cls={'cell-md-4 d-flex flex-align-end'}>
              <ui-tabs cls={'tabs-expand'} variant={'group'}>
                <ui-tab>Home</ui-tab>
                <ui-tab>Profile</ui-tab>
                <ui-tab>Links</ui-tab>
              </ui-tabs>
            </ui-cell>
            <ui-cell cls={'cell-md-4 d-flex flex-align-end'}>
              <ui-tabs cls={'tabs-expand'} variant={'pills'}>
                <ui-tab>Home</ui-tab>
                <ui-tab>Profile</ui-tab>
                <ui-tab>Links</ui-tab>
              </ui-tabs>
            </ui-cell>
          </ui-row>


          <h2 className='text-light'>&lt;ButtonGroup/&gt;</h2>
          <ui-row>
            <ui-cell cls={'cell-md-4'}>
              <ui-buttongroup active={2}>
                <ui-button>1</ui-button>
                <ui-button>2</ui-button>
                <ui-button>3</ui-button>
              </ui-buttongroup>
            </ui-cell>
            <ui-cell cls={'cell-md-4'}>
              <ui-buttongroup radio={true}>
                <ui-button><ui-icon name={'paragraph-left'} /></ui-button>
                <ui-button><ui-icon name={'paragraph-center'} /></ui-button>
                <ui-button><ui-icon name={'paragraph-right'} /></ui-button>
                <ui-button><ui-icon name={'paragraph-justify'} /></ui-button>
              </ui-buttongroup>
            </ui-cell>
            <ui-cell cls={'cell-md-4'}>
              <ui-buttongroup active={[1, 2]} cls={'border bd-cyan p-2 text-center'} clsActive={'alert'} clsButton={'m-1'}>
                <ui-button>1</ui-button>
                <ui-button>2</ui-button>
                <ui-button>3</ui-button>
              </ui-buttongroup>
            </ui-cell>
          </ui-row>


          <h2 className='text-light'>&lt;Collapsible/&gt;</h2>
          <ui-row>
            <ui-cell>
              <div>
                <ui-button n-on-click={this.toggleCollapsible}>Toggle collapsible</ui-button>
              </div>
              <ui-collapse isOpen={this.model.scope.collapsibleOpen}>
                <div className={'border bd-default p-10'}>
                  All those paralysis will be lost in nuclear fluxs like minerals in collision courses.
                  All those paralysis will be lost in nuclear fluxs like minerals in collision courses.
                  All those paralysis will be lost in nuclear fluxs like minerals in collision courses.
                                </div>
              </ui-collapse>
            </ui-cell>
          </ui-row>


          <h2 className='text-light'>&lt;AppBar/&gt;</h2>
          <ui-row>
            <ui-cell cls={'cell-md-12'}>
              <ui-appbar cls={'pos-relative z-dropdown'} hamburgerColor={'dark'}>
                <ui-appbar-item isBrand={true} name={'Metro 4 for React'} />
                <ui-appbar-menu cls={'ml-auto'} >
                  <li><a href={'#'}>Home</a></li>
                  <li><a href={'#'}>Documentation</a></li>
                  <ui-dropdown as={'li'}>
                    <a href={'#'} className={'dropdown-toggle'}>Community</a>
                    <ul className={'d-menu bg-light'}>
                      <li><a href={'#'}>Forum</a></li>
                      <li><a href={'#'}>Slack</a></li>
                      <li><a href={'#'}>Viber</a></li>
                      <ui-dropdown as={'li'} position={'relative'}>
                        <a href={'#'} className={'dropdown-toggle'}>Social</a>
                        <ul className={'d-menu bg-light'}>
                          <li><a href={'#'}>Facebook</a></li>
                          <li><a href={'#'}>Twitter</a></li>
                        </ul>
                      </ui-dropdown>
                    </ul>
                  </ui-dropdown>
                  <li><a href={'#'}>GitHub</a></li>
                </ui-appbar-menu>
              </ui-appbar>
            </ui-cell>
          </ui-row>

          <h2 className='text-light'>&lt;Modal/&gt;</h2>
          <ui-row>
            <ui-cell>
              <div>
                <ui-button n-on-click={this.openModal}>Open modal</ui-button>
              </div>
              <ui-modal cls={'flex-center'} open={this.model.scope.modalOpen} n-on-click={this.closeModal} overlayAlpha={.5}>
                <ui-activity variant={'color'} />
              </ui-modal>
            </ui-cell>
          </ui-row>

          <h2 className='text-light'>&lt;Dropdown/&gt;</h2>
          <ui-row>
            <ui-cell cls={'cell-md-4'}>
              <ui-dropdown>
                <a href={'#'} className={'dropdown-toggle'}>Dropdown</a>
                <ul className={'d-menu'}>
                  <li><a href={'#'}>Item 1</a></li>
                  <li><a href={'#'}>Item 2</a></li>
                  <li><a href={'#'}>Item 3</a></li>
                  <ui-dropdown as={'li'}>
                    <a href={'#'} className={'dropdown-toggle'}>Dropdown</a>
                    <ul className={'d-menu'}>
                      <li><a href={'#'}>Item 1</a></li>
                      <li><a href={'#'}>Item 2</a></li>
                      <li><a href={'#'}>Item 3</a></li>
                      <ui-dropdown as={'li'}>
                        <a href={'#'} className={'dropdown-toggle'}>Dropdown</a>
                        <ul className={'d-menu'}>
                          <li><a href={'#'}>Item 1</a></li>
                          <li><a href={'#'}>Item 2</a></li>
                          <li><a href={'#'}>Item 3</a></li>
                        </ul>
                      </ui-dropdown>
                    </ul>
                  </ui-dropdown>
                </ul>
              </ui-dropdown>
            </ui-cell>
            <ui-cell cls={'cell-md-2'}>
              <ui-dropdown>
                <button className={'button dropdown-toggle'}>Dropdown</button>
                <ul className={'d-menu'}>
                  <li><a href={'#'}>Item 1</a></li>
                  <li><a href={'#'}>Item 2</a></li>
                  <li><a href={'#'}>Item 3</a></li>
                </ul>
              </ui-dropdown>
            </ui-cell>
            <ui-cell cls={'cell-md-2'}>
              <ui-dropdown clsDropdown={'shadow-1'}>
                <ui-button cls={'dropdown-toggle alert'}>
                  <ui-icon name={'rocket'} />
                </ui-button>
                <ul className={'d-menu'}>
                  <li><a href={'#'}>Item 1</a></li>
                  <li><a href={'#'}>Item 2</a></li>
                  <li><a href={'#'}>Item 3</a></li>
                </ul>
              </ui-dropdown>
            </ui-cell>
            <ui-cell cls={'cell-md-4'}>
              <ui-dropdown cls={'place-right'} clsDropdown={'place-right'}>
                <button className={'button dropdown-toggle'}>Dropdown</button>
                <ul className={'d-menu'}>
                  <li><a href={'#'}>Item 1</a></li>
                  <li><a href={'#'}>Item 2</a></li>
                  <li><a href={'#'}>Item 3</a></li>
                </ul>
              </ui-dropdown>
            </ui-cell>
          </ui-row>

          <h2 className='text-light'>&lt;Input file/&gt;</h2>
          <ui-row>
            <ui-cell cls={'cell-md-4'}>
              <ui-inputfile />
            </ui-cell>

            <ui-cell cls={'cell-md-4'}>
              <ui-inputfile buttonIcon={'folder'} buttonTitle={''} />
            </ui-cell>

            <ui-cell cls={'cell-md-4'}>
              <ui-inputfile buttonIcon={'folder'} buttonTitle={''} customButtons={customButtons} multiple={true} />
            </ui-cell>
          </ui-row>
          <br />
          <ui-row>
            <ui-cell cls={'cell-md-12'}>
              <ui-inputfile mode={'drop'} multiple={true} />
            </ui-cell>
          </ui-row>

          <h2 className='text-light'>&lt;Textarea/&gt;</h2>
          <ui-row>
            <ui-cell cls={'cell-md-4'}>
              <ui-textarea />
            </ui-cell>
          </ui-row>


          <h2 className='text-light'>&lt;Pagination/&gt;</h2>
          <ui-row>
            <ui-cell>
              <ui-pagination total={100} itemsPerPage={5} current={7} n-on-click={this.paginatinOnClick} />
            </ui-cell>
          </ui-row>


          <h2 className='text-light'>&lt;Modal ui-activity/&gt;</h2>
          <ui-row>
            <ui-cell>
              <div>
                <ui-button n-on-click={this.toggleActivity}>Open activity</ui-button>
              </div>
              <ui-activityModal open={this.model.scope.activityOpen} variant={'color'} n-on-close={this.closeActivity} />
            </ui-cell>
          </ui-row>

          <h2 className='text-light'>&lt;Dialog/&gt;</h2>
          <ui-row>
            <ui-cell>
              <div>
                <ui-button n-on-click={this.toggleDialog}>Open dialog</ui-button>
              </div>
              <ui-dialog open={this.model.scope.dialogOpen}
                title={'This is a Metro 4 for React Dialog'}
                actions={dialogButtons}
                n-on-close={this.closeDialog}
                modal={true}
                overlayColor={'#000'}
                overlayAlpha={.5}
                cls={'shadow-1'}
              >
                <div>
                  Bassus abactors ducunt ad triticum. A fraternal form of manifestation is the bliss.
                </div>
              </ui-dialog>
            </ui-cell>
          </ui-row>

          <h2 className='text-light'>&lt;ui-gravatar/&gt;</h2>
          <ui-row>
            <ui-cell>
              <ui-gravatar email={'sergey@pimenov.com.ua'} size={40} />
              <ui-gravatar email={'sergey@pimenov.com.ua'} />
              <ui-gravatar email={'sergey@pimenov.com.ua'} size={120} />
              <ui-gravatar email={'sergey@pimenov.com.ua'} size={160} />
              <ui-gravatar email={'sergey@pimenov.com.ua'} size={200} />
            </ui-cell>
          </ui-row>
          <br />
          <ui-row>
            <ui-cell>
              <ui-gravatar email={'non'} defaultImage={'mp'} />
              <ui-gravatar email={'non'} defaultImage={'identicon'} />
              <ui-gravatar email={'non'} defaultImage={'monsterid'} />
              <ui-gravatar email={'non'} defaultImage={'wavatar'} />
              <ui-gravatar email={'non'} defaultImage={'retro'} />
              <ui-gravatar email={'non'} defaultImage={'robohash'} />
              <ui-gravatar email={'non'} defaultImage={'blank'} />
            </ui-cell>
          </ui-row>

          <h2 className='text-light'>&lt;Toolbar/&gt;</h2>
          <ui-row>
            <ui-cell>
              <ui-toolbar>
                <ui-toolbutton><ui-icon name={'rocket'} /></ui-toolbutton>
                <ui-toolbutton cls={'text-button'}>Open</ui-toolbutton>
                <ui-toolbutton as={'a'} href={'#'}><ui-icon name={'printer'} /></ui-toolbutton>
              </ui-toolbar>
              <ui-toolbar>
                <ui-toolbutton cls={'primary'}><ui-icon name={'rocket'} /></ui-toolbutton>
                <ui-toolbutton cls={'info text-button'}>Open</ui-toolbutton>
                <ui-toolbutton cls={'alert'} as={'a'} href={'#'}><ui-icon name={'printer'} /></ui-toolbutton>
              </ui-toolbar>
              <ui-toolbar>
                <ui-toolbutton cls={'primary outline'}><ui-icon name={'rocket'} /></ui-toolbutton>
                <ui-toolbutton cls={'info text-button outline'}>Open</ui-toolbutton>
                <ui-toolbutton cls={'alert outline'} as={'a'} href={'#'}><ui-icon name={'printer'} /></ui-toolbutton>
              </ui-toolbar>
              <ui-toolbar>
                <ui-toolbutton cls={'primary rounded'}><ui-icon name={'rocket'} /></ui-toolbutton>
                <ui-toolbutton cls={'info text-button rounded'}>Open</ui-toolbutton>
                <ui-toolbutton cls={'alert rounded'} as={'a'} href={'#'}><ui-icon name={'printer'} /></ui-toolbutton>
              </ui-toolbar>
            </ui-cell>
          </ui-row>

          <h2 className='text-light'>&lt;Tag /&gt;</h2>
          <ui-row>
            <ui-cell>
              <ui-tag>metro4</ui-tag>
              <ui-tag>react</ui-tag>
              <ui-tag>css</ui-tag>
              <ui-tag>javascript</ui-tag>
            </ui-cell>
          </ui-row>

          <h2 className='text-light'>&lt;Icon /&gt;</h2>
          <ui-row>
            <ui-cell cls='cell-md-6'>
              <h5>Use Metro Icons Font</h5>
              <ui-icon name='rocket' />
              <ui-icon name='rocket' cls='fg-red' size='2x' />
              <ui-icon name='rocket' cls='fg-green' size='3x' />
              <ui-icon name='rocket' cls='fg-blue' size='4x' />
              <ui-icon name='rocket' cls='fg-orange' size='5x' />
            </ui-cell>
            <ui-cell cls='cell-md-6'>
              <h5>Use Font Awesome</h5>
              <ui-icon name='rocket' prefix='fas fa-' />
              <ui-icon name='rocket' prefix='fas fa-' cls='fg-red' size='2x' />
              <ui-icon name='rocket' prefix='fas fa-' cls='fg-green' size='3x' />
              <ui-icon name='rocket' prefix='fas fa-' cls='fg-blue' size='4x' />
              <ui-icon name='rocket' prefix='fas fa-' cls='fg-orange' size='5x' />
            </ui-cell>
          </ui-row>

          <h2 className='text-light'>&lt;ui-activity /&gt;</h2>
          <ui-row>
            <ui-cell cls='cell-md-4 bg-darkGray p-2'>
              <ui-activity type='ring' variant='light' cls='mx-auto' />
            </ui-cell>
            <ui-cell cls='cell-md-4 p-2'>
              <ui-activity type='ring' variant='dark' cls='mx-auto' />
            </ui-cell>
            <ui-cell cls='cell-md-4 p-2'>
              <ui-activity type='ring' variant='color' cls='mx-auto' />
            </ui-cell>
          </ui-row>

          <ui-row>
            <ui-cell cls='cell-md-4 bg-darkGray p-2'>
              <ui-activity type='metro' variant='light' cls='mx-auto' />
            </ui-cell>
            <ui-cell cls='cell-md-4 p-2'>
              <ui-activity type='metro' variant='dark' cls='mx-auto' />
            </ui-cell>
            <ui-cell cls='cell-md-4 p-2'>
              <ui-activity type='metro' variant='color' cls='mx-auto' />
            </ui-cell>
          </ui-row>

          <ui-row>
            <ui-cell cls='cell-md-4 bg-darkGray p-2'>
              <ui-activity type='square' variant='light' cls='mx-auto' />
            </ui-cell>
            <ui-cell cls='cell-md-4 p-2'>
              <ui-activity type='square' variant='dark' cls='mx-auto' />
            </ui-cell>
            <ui-cell cls='cell-md-4 p-2'>
              <ui-activity type='square' variant='color' cls='mx-auto' />
            </ui-cell>
          </ui-row>

          <ui-row>
            <ui-cell cls='cell-md-4 bg-darkGray p-2'>
              <ui-activity type='cycle' variant='light' cls='mx-auto' />
            </ui-cell>
            <ui-cell cls='cell-md-4 p-2'>
              <ui-activity type='cycle' variant='dark' cls='mx-auto' />
            </ui-cell>
            <ui-cell cls='cell-md-4 p-2'>
              <ui-activity type='cycle' variant='color' cls='mx-auto' />
            </ui-cell>
          </ui-row>

          <ui-row>
            <ui-cell cls='cell-md-4 bg-darkGray p-2'>
              <ui-activity type='simple' variant='light' cls='mx-auto' />
            </ui-cell>
            <ui-cell cls='cell-md-4 p-2'>
              <ui-activity type='simple' variant='dark' cls='mx-auto' />
            </ui-cell>
            <ui-cell cls='cell-md-4 p-2'>
              <ui-activity type='simple' variant='color' cls='mx-auto' />
            </ui-cell>
          </ui-row>

          <h2 className='text-light'>&lt;ui-accordion /&gt;</h2>
          <ui-row>
            <ui-cell cls='w-100'>
              <ui-accordion oneFrame={true} oneFrameOpen={false} clsFrameContent='p-4' onFrameBeforeClose={() => true}>
                <ui-accordionFrame title='Head 1' open>
                  Season eight tablespoons of blueberries in four pounds of fish sauce.
                  Season eight tablespoons of blueberries in four pounds of fish sauce.
                  Season eight tablespoons of blueberries in four pounds of fish sauce.
                                </ui-accordionFrame>
                <ui-accordionFrame title='Head 2'>
                  Dogma is the only samadhi, the only guarantee of fear.
                  Dogma is the only samadhi, the only guarantee of fear.
                  Dogma is the only samadhi, the only guarantee of fear.
                                </ui-accordionFrame>
                <ui-accordionFrame title='Head 3'>
                  None of these coordinates will be lost in voyages like devastations in mysteries
                  None of these coordinates will be lost in voyages like devastations in mysteries
                  None of these coordinates will be lost in voyages like devastations in mysteries

                                    <h2>Nested accordion</h2>
                  <ui-accordion variant={2} oneFrame={true} clsFrameContent='p-4'>
                    <ui-accordionFrame title='Head 1' open>
                      Season eight tablespoons of blueberries in four pounds of fish sauce.
                      Season eight tablespoons of blueberries in four pounds of fish sauce.
                      Season eight tablespoons of blueberries in four pounds of fish sauce.
                                        </ui-accordionFrame>
                    <ui-accordionFrame title='Head 2'>
                      Dogma is the only samadhi, the only guarantee of fear.
                      Dogma is the only samadhi, the only guarantee of fear.
                      Dogma is the only samadhi, the only guarantee of fear.
                                        </ui-accordionFrame>
                    <ui-accordionFrame title='Head 3'>
                      None of these coordinates will be lost in voyages like devastations in mysteries
                      None of these coordinates will be lost in voyages like devastations in mysteries
                      None of these coordinates will be lost in voyages like devastations in mysteries
                                        </ui-accordionFrame>
                  </ui-accordion>

                </ui-accordionFrame>
              </ui-accordion>
            </ui-cell>
          </ui-row>

          <h2 className='text-light'>&lt;ui-bottomnav /&gt;</h2>
          <ui-row>
            <ui-cell cls='cell-md-4 bg-light' style={{ height: 300 }}>
              <ui-bottomnav cls='pos-absolute'>
                <ui-bottomnav-item label='Button1' icon='rocket' />
                <ui-bottomnav-item label='Button2' icon='apps' />
                <ui-bottomnav-item label='Button3' icon='windows' />
              </ui-bottomnav>
            </ui-cell>
            <ui-cell cls='cell-md-4' />
            <ui-cell cls='cell-md-4' />
          </ui-row>

          <h2>&lt;Button/&gt;</h2>
          <ui-row>
            <ui-cell>
              <ui-button title='Button' />
                            &nbsp;<ui-button cls='alert' title='Button' />
                            &nbsp;<ui-button cls='info' title='Button' icon='rocket' />
                            &nbsp;<ui-button cls='warning' icon='bell' />
                            &nbsp;<ui-button as='a' cls='secondary' title='Link as Button' href='#' />
                            &nbsp;<ui-button as='span' cls='primary' title='Span as Button' />
                            &nbsp;<ui-button title='Flat Button' cls={'flat-button'} />
                            &nbsp;<ui-button icon='envelop' badge={10} clsBadge={'alert'} />
            </ui-cell>
          </ui-row>

          <h2>&lt;ui-commandbutton/&gt;</h2>
          <ui-row>
            <ui-cell>
              <ui-commandbutton icon='share' title='Yes, share and connect' subtitle='Use this option for home or work' />
                            &nbsp;<ui-commandbutton icon='share' title='Yes, share and connect' subtitle='Use this option for home or work' cls='icon-right info' />
                            &nbsp;<ui-commandbutton as='a' icon='share' title='Yes, share and connect' subtitle='Use this option for home or work' cls='icon-right info' />
            </ui-cell>
          </ui-row>

          <h2>&lt;ui-imagebutton/&gt;</h2>
          <ui-row>
            <ui-cell>
              <ui-imagebutton icon='share' title='Share your connect' />
                            &nbsp;<ui-imagebutton icon='share' title='Share your connect' cls='icon-right info' />
                            &nbsp;<ui-imagebutton as='a' icon='share' title='Share your connect' />
                            &nbsp;<ui-imagebutton as='a' icon='share' title='Share your connect' cls='icon-right' />
            </ui-cell>
          </ui-row>

          <h2>&lt;ui-shortcut/&gt;</h2>
          <ui-row>
            <ui-cell>
              <ui-shortcut icon='rocket' title='Rocket' />
                            &nbsp;<ui-shortcut icon='share' title='Share' cls='info' />
                            &nbsp;<ui-shortcut icon='share' cls='warning no-caption' />
                            &nbsp;<ui-shortcut icon='windows' cls='alert' title='Windows' tag={10} />
                            &nbsp;<ui-shortcut as='a' href='#' icon='windows' cls='success' title='Anchor' badge={10} />
            </ui-cell>
          </ui-row>

          <h2>&lt;ui-breadcrumbs/&gt;</h2>
          <ui-row>
            <ui-cell>
              <ui-breadcrumbs cls='mt-0'>
                <ui-breadcrumb-item>Home</ui-breadcrumb-item>
                <ui-breadcrumb-item>Products</ui-breadcrumb-item>
                <ui-breadcrumb-item>Download</ui-breadcrumb-item>
                <ui-breadcrumb-item cls='fg-red'>Windows 10</ui-breadcrumb-item>
              </ui-breadcrumbs>
            </ui-cell>
          </ui-row>

          <h2>&lt;ui-infobutton/&gt;</h2>
          <ui-row>
            <ui-cell>
              <ui-infobutton title='Star' subtitle='6,208' icon='star-full' />
                            &nbsp;<ui-infobutton title='Star' subtitle='6,208' icon='star-full' cls='alert' />
                            &nbsp;<ui-infobutton title='Star' subtitle='6,208' icon='star-full' cls='info rounded' />
                            &nbsp;<ui-infobutton as='a' title='This is a link' subtitle='6,208' icon='star-full' cls='warning rounded' href='https://metroui.org.ua' />
            </ui-cell>
          </ui-row>

          <h2>&lt;ui-actionbutton/&gt;</h2>
          <ui-row>
            <ui-cell>
              <ui-actionbutton icon='star-full' />
                            &nbsp;<ui-actionbutton icon='star-full' cls='second' />
                            &nbsp;<ui-actionbutton icon='star-full' cls='info' />
                            &nbsp;<ui-actionbutton icon='star-full' cls='warning second' />
                            &nbsp;<ui-actionbutton icon='star-full' cls='alert' />
            </ui-cell>
          </ui-row>

          <h2>&lt;MultiAction/&gt;</h2>
          <ui-row>
            <ui-cell>
              <ui-multiaction icon='star-full' cls='alert' drop={'right'}>
                <ui-multiAction-item icon='rocket' n-on-click={() => alert('rocket')} />
              </ui-multiaction>
            </ui-cell>
          </ui-row>


        </ui-grid>
      </ui-container>
    );
  }
}
