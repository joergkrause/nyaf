import { Binding } from './binding.class';
import { IBindingHandler } from './ibindinghandler.interface';
import { CheckedBindingHandler } from './checkedbindinghandler.class';
import { ValueBindingHandler } from './valuebindinghandler.class';
import { TextBindingHandler } from './textbindinghandler.class';

export class ModelBinder {
  static scope: ProxyConstructor;
  static subscriptions: {
    key: string;
    cb: () => void;
  }[] = [];
  static handlers: {
    [property: string]: IBindingHandler;
  };
  static initialize(component: HTMLElement) {
    ModelBinder.handlers = {
      value: new ValueBindingHandler(),
      innerText: new TextBindingHandler(),
      checked: new CheckedBindingHandler()
    };
    // Look for @Viewmodel decorator
    const modelInstance = new component.constructor['__model__']();
    ModelBinder.setScope(modelInstance);
    const elements = component.querySelectorAll('[n-bind]');
    elements.forEach((el: HTMLElement) => {
      const expressionParts = el.getAttribute('n-bind').split(':');
      if (expressionParts.length < 2) {
        throw new Error('[n-bind] not properly formatted. Requires at least two parts: n-bind="targetProperty: sourceProperty".');
      }
      const bindingHandler = expressionParts[0].trim();
      const scopeKey = expressionParts[1].trim();
      if (modelInstance.hasOwnProperty(scopeKey)) {
        // TODO: Implement extensible validation
        // if (expressionParts.length === 3) {
        // 	const validator = expressionParts[2].trim();
        // 	if (bindingHandler === 'value') {
        // 		el.setAttribute(validator.toLowerCase(), validator.toLowerCase());
        // 	}
        // 	if (bindingHandler === 'innerText') {
        // 		el.textContent = `__${validator}__msg__${scopeKey}__`;
        // 	}
        // }
        const binding = new Binding(scopeKey, bindingHandler, el);
        binding.bind();
      }
    });
  }
  static setScope(scope: {}): void {
    const p = new Proxy(scope, {
      get: (target: any, key: string, receiver: ProxyConstructor) => {
        return target[key];
      },
      set: (target: any, key: string, newValue: any): boolean => {
        const value = target[key];
        const shouldNotify = value !== newValue;
        target[key] = newValue;
        if (shouldNotify) {
          ModelBinder.notify(key);
        }
        ;
        return shouldNotify;
      }
    });
    ModelBinder.scope = p;
    Object.keys(scope).forEach(prop => ModelBinder.notify(prop));
  }
  static subscribe(key: string, cb: () => void) {
    ModelBinder.subscriptions.push({
      key,
      cb
    });
  }
  static notify(key) {
    const subscriptions = ModelBinder.subscriptions.filter(subscription => subscription.key === key);
    subscriptions.forEach(subscription => {
      subscription.cb();
    });
  }
}
