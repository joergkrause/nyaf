import { Events_Symbol_Eventlist } from "../consts/decorator.props";

/**
 * The Events decorator.
 *
 * Allows a component to dispatch custom events. The argument is an array, so add any number of event names here.
 *
 * ```
 *   @CustomElement('app-button')
 *   @Properties<ButtonPropType>({ text: ''})
 *   @Events(['custom'])
 *   export class ButtonComponent extends BaseComponent<ButtonPropType> {
 *     constructor() {
 *       super();
 *     }
 *
 *     clickMe(e) {
 *       const checkEvent: CustomEventInit = {
 *         bubbles: true,
 *         cancelable: false,
 *       };
 *       super.dispatch('custom', checkEvent);
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
 * ```
 */
export function Events(names: string[]) {
  // the original decorator
  function eventInternal(target: Object): void {
    eventInternalSetup(target, names);
  }

  // return the decorator
  return eventInternal;
}

function eventInternalSetup(target: any, names: string[]) {
  names = names.map(name => `${name}_${target.name}`);
  Object.defineProperty(target, Events_Symbol_Eventlist, {
    get: function() {
      return names;
    },
    enumerable: false,
    configurable: false
  });
}
