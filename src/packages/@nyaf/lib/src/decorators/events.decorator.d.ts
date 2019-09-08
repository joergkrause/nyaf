/**
 * The Events decorator.
 *
 * Allows a component to dispatch custom events. The argument is an array, so add any number of event names here.
 *
 * @example
 *   @CustomElement('app-button')
 *   @Properties<ButtonPropType>({ text: ''})
 *   @Events(['xxx'])
 *   export class ButtonComponent extends BaseComponent<ButtonPropType> {
 *     constructor() {
 *       super();
 *     }
 *
 *     clickMe(e) {
 *       console.log('Button Element Click ', e);
 *       const checkEvent = new CustomEvent('xxx', {
 *         bubbles: true,
 *         cancelable: false,
 *       });
 *       super.dispatchEvent(checkEvent);
 *     }
 *
 *     render() {
 *       return (
 *         <>
 *           <button type="button" n-on-click={e => this.clickMe(e)}>
 *             {super.data.text}
 *           </button>
 *         </>
 *       );
 *     }
 *   }
 *
 */
export declare function Events(names: string[]): (target: Object) => void;
export declare function eventInternalSetup(target: any, names: string[]): void;
