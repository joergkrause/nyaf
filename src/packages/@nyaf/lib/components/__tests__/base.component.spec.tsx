import JSX from '../jsx.classic';
import { BaseComponent } from "../base.component";
import { CustomElement } from "../../decorators/customelement.decorator";
import { ShadowDOM } from '../../decorators/shadowdom.decorator';
import { UseParentStyles } from '../../decorators/useparentstyles.decorator';
import { CustomElement_Symbol_Selector, ShadowDOM_Symbol_WithShadow } from "../../consts/decorator.props";

describe('Basecomponent', () => {

  @CustomElement('base-test')
  @ShadowDOM()
  class TestComponent extends BaseComponent<any> {

    private testValue: number;

    constructor() {
      super();
      this.testValue = 2;
    }

    render() {
      return <div>{2}</div>;
    }
  }

  beforeAll(() => {
    customElements.define('base-test', TestComponent);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('set as element', () => {
    document.body.innerHTML = '<base-test></base-test>';
    const element = document.querySelector('base-test').outerHTML;
    expect(element).toEqual('<base-test></base-test>');
  });

  it('correct node', () => {
    const testInstance = new TestComponent();
    document.body.appendChild(testInstance);
    expect(testInstance.nodeType).toBe(1);
  });

  it('renders', () => {
    const testInstance = new TestComponent();
    document.body.appendChild(testInstance);
    const content = document.querySelector('base-test').shadowRoot.innerHTML;
    expect(content).toEqual('<div>2</div>');
  });

  it('setup called exactly once', () => {
    const testInstance = new TestComponent();
    const spySetup = jest.spyOn(testInstance as any, 'setup');
    document.body.appendChild(testInstance);
    expect(spySetup).toBeCalledTimes(1);
  });

  it('full lifecycle, called 6 times', () => {
    const testInstance = new TestComponent();
    const spylifeCycleState = jest.spyOn(testInstance as any, 'lifeCycleState', 'set');
    document.body.appendChild(testInstance);
    expect(spylifeCycleState).toBeCalledTimes(4);
    document.body.innerHTML = '';
    expect(spylifeCycleState).toBeCalledTimes(6);
  });

  it('dispatchEvent called 6 times for lifecycle event', () => {
    const testInstance = new TestComponent();
    const spylifeCycleState = jest.spyOn(testInstance as any, 'dispatchEvent');
    document.body.appendChild(testInstance);
    expect(spylifeCycleState).toBeCalledTimes(4);
    document.body.innerHTML = '';
    expect(spylifeCycleState).toBeCalledTimes(6);
  });

  it('lifeCycleDetector', () => {
    const testInstance = new TestComponent();
    const spylifeCycleDetector = jest.spyOn(testInstance as any, 'lifeCycleDetector');
    document.body.appendChild(testInstance);
    expect(spylifeCycleDetector).toBeCalledTimes(1);
  });

  it('has selector', () => {
    document.body.innerHTML = '<base-test></base-test>';
    const element = document.querySelector('base-test') as BaseComponent;
    expect(element.constructor[CustomElement_Symbol_Selector]).toEqual('base-test');
  });

  it('has unique id', () => {
    document.body.innerHTML = '<base-test></base-test>';
    const element = document.querySelector('base-test') as BaseComponent;
    expect(element['__uniqueId__'].length).toEqual(36);
  });

  it('recognize attribute type number', () => {
    document.body.innerHTML = '<base-test param="2" n-type-param="number"></base-test>';
    const element = document.querySelector<TestComponent>('base-test');
    expect(element['data'].param).toEqual(2);
  });

  it('recognize attribute type boolean', () => {
    document.body.innerHTML = '<base-test param="true" n-type-param="boolean"></base-test>';
    const element = document.querySelector<TestComponent>('base-test');
    expect(element['data'].param).toEqual(true);
  });

  it('recognize attribute type array', () => {
    document.body.innerHTML = '<base-test param="[1, 2, 3]" n-type-param="array"></base-test>';
    const element = document.querySelector<TestComponent>('base-test');
    expect(element['data'].param).toEqual([1, 2, 3]);
  });



});
